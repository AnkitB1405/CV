import { useEffect, useMemo, useRef, useState } from 'react';
import { ArcElement, Chart, Legend, PieController, Title, Tooltip } from 'chart.js';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';

const chartColors = ['#7be7ff', '#4ecbff', '#3f8cff', '#2f6dff', '#2ea8d7', '#6fd4ff'];
const FULL_ROTATION = Math.PI * 2;
const FRONT_ANGLE = Math.PI / 2;
const SLICE_OFFSET = 28;
const WHEEL_ROTATION_FACTOR = 0.0045;

const clampColor = (value) => Math.max(0, Math.min(255, value));

const hexToRgb = (hex) => {
  const normalized = hex.replace('#', '');
  const value = normalized.length === 3
    ? normalized
        .split('')
        .map((char) => `${char}${char}`)
        .join('')
    : normalized;

  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16)
  };
};

const darkenHex = (hex, amount = 0.25) => {
  const { r, g, b } = hexToRgb(hex);

  return `rgb(${clampColor(Math.round(r * (1 - amount)))}, ${clampColor(
    Math.round(g * (1 - amount))
  )}, ${clampColor(Math.round(b * (1 - amount)))})`;
};

const createSliceGradient = (ctx, color) => {
  const gradient = ctx.createLinearGradient(24, 20, 280, 320);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  gradient.addColorStop(0.14, color);
  gradient.addColorStop(0.62, darkenHex(color, 0.1));
  gradient.addColorStop(1, darkenHex(color, 0.3));
  return gradient;
};

const normalizeRotation = (angle) => {
  let normalized = angle % FULL_ROTATION;

  if (normalized < 0) {
    normalized += FULL_ROTATION;
  }

  return normalized;
};

const pieDepthPlugin = {
  id: 'pieDepthPlugin',
  beforeDatasetsDraw(chart, _args, pluginOptions) {
    const datasetMeta = chart.getDatasetMeta(0);
    const dataset = chart.data.datasets[0];

    if (!datasetMeta?.data?.length || !dataset) {
      return;
    }

    const { ctx } = chart;
    const depth = pluginOptions?.depth ?? 18;
    const layerStep = pluginOptions?.layerStep ?? 3;

    datasetMeta.data.forEach((arc, index) => {
      const properties = arc.getProps(
        ['x', 'y', 'startAngle', 'endAngle', 'outerRadius', 'innerRadius'],
        true
      );
      const baseColor = Array.isArray(dataset.backgroundColor)
        ? dataset.backgroundColor[index]
        : dataset.backgroundColor;
      const sideColor = Array.isArray(dataset.borderColor)
        ? dataset.borderColor[index]
        : darkenHex(chartColors[index % chartColors.length], 0.42);

      for (let offset = depth; offset > 0; offset -= layerStep) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = typeof sideColor === 'string' ? sideColor : darkenHex(chartColors[index % chartColors.length], 0.42);
        ctx.moveTo(properties.x, properties.y + offset);
        ctx.arc(
          properties.x,
          properties.y + offset,
          properties.outerRadius,
          properties.startAngle,
          properties.endAngle
        );
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(properties.x, properties.y + depth + 4);
      ctx.arc(
        properties.x,
        properties.y + depth + 4,
        properties.outerRadius,
        properties.startAngle,
        properties.endAngle
      );
      ctx.closePath();
      ctx.fillStyle = 'rgba(3, 8, 20, 0.24)';
      ctx.filter = 'blur(10px)';
      ctx.fill();
      ctx.restore();

      if (typeof baseColor === 'string') {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(properties.x, properties.y);
        ctx.arc(
          properties.x,
          properties.y,
          properties.outerRadius,
          properties.startAngle,
          properties.endAngle
        );
        ctx.closePath();
        const sheen = ctx.createRadialGradient(
          properties.x - properties.outerRadius * 0.24,
          properties.y - properties.outerRadius * 0.3,
          properties.outerRadius * 0.12,
          properties.x,
          properties.y,
          properties.outerRadius
        );
        sheen.addColorStop(0, 'rgba(255, 255, 255, 0.24)');
        sheen.addColorStop(0.28, 'rgba(255, 255, 255, 0.08)');
        sheen.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = sheen;
        ctx.fill();
        ctx.restore();
      }
    });
  }
};

Chart.register(PieController, ArcElement, Tooltip, Legend, Title, pieDepthPlugin);

const CTFActivity = () => {
  const [progress, setProgress] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [rotation, setRotation] = useState(-Math.PI / 2);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const interactionModeRef = useRef('initial');

  const entries = useMemo(
    () => (progress ? Object.entries(progress).filter(([, value]) => Number(value) > 0) : []),
    [progress]
  );

  useEffect(() => {
    const controller = new AbortController();

    const loadProgress = async () => {
      try {
        const response = await fetch('/data/ctf-progress.json', { signal: controller.signal });

        if (!response.ok) {
          throw new Error('Failed to load CTF progress data.');
        }

        const data = await response.json();
        setProgress(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setHasError(true);
        }
      }
    };

    loadProgress();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node || hasEnteredView) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasEnteredView]);

  useEffect(() => {
    if (!hasEnteredView || !entries.length || !canvasRef.current) {
      return undefined;
    }

    chartRef.current?.destroy();

    const context = canvasRef.current.getContext('2d');

    chartRef.current = new Chart(canvasRef.current, {
      type: 'pie',
      data: {
        labels: entries.map(([label]) => label),
        datasets: [
          {
            data: entries.map(([, value]) => Number(value)),
            backgroundColor: entries.map((_, index) =>
              createSliceGradient(context, chartColors[index % chartColors.length])
            ),
            borderColor: entries.map((_, index) => darkenHex(chartColors[index % chartColors.length], 0.42)),
            borderWidth: 2,
            hoverOffset: 14,
            spacing: 2,
            offset: entries.map((_, index) => (index === selectedIndex ? SLICE_OFFSET : 0))
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        rotation,
        layout: {
          padding: {
            top: 8,
            right: 18,
            bottom: 28,
            left: 18
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1400,
          easing: 'easeOutQuart'
        },
        plugins: {
          pieDepthPlugin: {
            depth: 20,
            layerStep: 2
          },
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(9, 17, 36, 0.95)',
            titleColor: '#f8fafc',
            bodyColor: '#d9ebff',
            borderColor: 'rgba(78, 244, 255, 0.25)',
            borderWidth: 1,
            padding: 12
          }
        }
      }
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [entries, hasEnteredView]);

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart || !entries.length) {
      return;
    }

    chart.options.rotation = rotation;
    chart.data.datasets[0].offset = entries.map((_, index) =>
      index === selectedIndex ? SLICE_OFFSET : 0
    );
    chart.update(interactionModeRef.current === 'wheel' ? 'none' : undefined);
    interactionModeRef.current = 'idle';
  }, [entries, rotation, selectedIndex]);

  const totalSolved = entries.reduce((sum, [, value]) => sum + Number(value || 0), 0);
  const topCategory = entries.length
    ? entries.reduce((best, current) => (Number(current[1]) > Number(best[1]) ? current : best))
    : null;

  const handleChartWheel = (event) => {
    if (!chartRef.current || !entries.length) {
      return;
    }

    event.preventDefault();
    interactionModeRef.current = 'wheel';
    setRotation((currentRotation) => normalizeRotation(currentRotation + event.deltaY * WHEEL_ROTATION_FACTOR));
  };

  const handleChartClick = (event) => {
    const chart = chartRef.current;

    if (!chart || !entries.length) {
      return;
    }

    const points = chart.getElementsAtEventForMode(
      event.nativeEvent,
      'nearest',
      { intersect: true },
      true
    );

    if (!points.length) {
      return;
    }

    const [{ index }] = points;
    const values = entries.map(([, value]) => Number(value));
    const total = values.reduce((sum, value) => sum + value, 0);
    const angleBefore = values
      .slice(0, index)
      .reduce((sum, value) => sum + (value / total) * FULL_ROTATION, 0);
    const sliceAngle = (values[index] / total) * FULL_ROTATION;
    const targetRotation = normalizeRotation(FRONT_ANGLE - (angleBefore + sliceAngle / 2));

    interactionModeRef.current = 'click';
    setSelectedIndex(index);
    setRotation(targetRotation);
  };

  return (
    <section id="ctf-activity" ref={sectionRef} className="section-shell">
      <Reveal>
        <SectionTitle
          eyebrow="CTF Activity"
          title="Hands-on progress across CTF challenge categories"
          description="I regularly solve Capture The Flag challenges to practice cybersecurity concepts such as cryptography, web security, and reverse engineering."
        />
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal delay={80}>
          <div className="ctf-shell flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-cyan/10 p-6 shadow-card">
            <div className="ctf-shell__grid" aria-hidden="true" />
            <div className="ctf-shell__glow ctf-shell__glow--one" aria-hidden="true" />
            <div className="ctf-shell__glow ctf-shell__glow--two" aria-hidden="true" />

            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                Continuous practice
              </p>
              <h3 className="mt-3 font-display text-2xl text-white">
                CTFs are where I sharpen problem-solving under real technical constraints.
              </h3>
              <p className="mt-4 max-w-xl text-slate-300">
                Working through category-based challenges helps me build practical intuition in
                attack paths, debugging, protocol analysis, and secure thinking across different
                layers of a system.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {progress
                  ? Object.keys(progress).map((category) => (
                      <span
                        key={category}
                        className="rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-cyan"
                      >
                        {category}
                      </span>
                    ))
                  : null}
              </div>
            </div>

            <div className="relative z-10 mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-cyan/20 bg-cyan/10 p-4 backdrop-blur-sm">
                <p className="text-sm text-cyan">Challenges solved</p>
                <p className="mt-2 font-display text-4xl text-white">{totalSolved}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 backdrop-blur-sm">
                <p className="text-sm text-slate-300">Top category</p>
                <p className="mt-2 font-display text-2xl text-white">
                  {topCategory ? topCategory[0] : '--'}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  {topCategory ? `${topCategory[1]} solved` : 'Waiting for data'}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="ctf-chart-card relative overflow-hidden rounded-[2rem] border border-white/10 p-5 shadow-card">
            <div className="ctf-chart-card__orb" aria-hidden="true" />
            <div className="ctf-chart-card__ring ctf-chart-card__ring--one" aria-hidden="true" />
            <div className="ctf-chart-card__ring ctf-chart-card__ring--two" aria-hidden="true" />
            <div className="relative z-10 mb-4 px-2">
              <h3 className="font-display text-xl text-white">CTF Challenge Categories</h3>
            </div>
            <div
              className="ctf-chart-zone relative mx-auto h-[360px] w-full max-w-[460px]"
              onWheel={handleChartWheel}
            >
              {hasError ? (
                <div className="flex h-full items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-400/10 p-6 text-center text-sm text-rose-200">
                  Unable to load the CTF progress data right now.
                </div>
              ) : null}

              {!hasError && !progress ? (
                <div className="flex h-full items-center justify-center rounded-2xl border border-white/10 bg-slate-950/60 p-6 text-center text-sm text-slate-300">
                  Loading challenge progress...
                </div>
              ) : null}

              {!hasError && progress ? (
                <canvas
                  ref={canvasRef}
                  aria-label="CTF challenge category pie chart"
                  role="img"
                  onClick={handleChartClick}
                  className="ctf-chart-canvas relative z-10 h-full w-full cursor-pointer"
                />
              ) : null}
            </div>
            {entries.length ? (
              <ul className="relative z-10 mt-5 flex flex-wrap justify-center gap-x-5 gap-y-3 px-2 text-sm text-slate-300">
                {entries.map(([label], index) => (
                  <li key={label} className="inline-flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: chartColors[index % chartColors.length] }}
                      aria-hidden="true"
                    />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CTFActivity;
