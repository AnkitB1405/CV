import { useEffect, useRef, useState } from 'react';

const interactiveSelector = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'summary',
  '[role="button"]',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    if (!mediaQuery.matches) {
      return undefined;
    }

    const cursor = cursorRef.current;

    if (!cursor) {
      return undefined;
    }

    let animationFrame = 0;
    let pointerX = -100;
    let pointerY = -100;

    const updatePosition = () => {
      cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      animationFrame = 0;
    };

    const queuePositionUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updatePosition);
      }
    };

    const handlePointerMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      cursor.classList.remove('custom-cursor--hidden');
      queuePositionUpdate();
    };

    const handlePointerDown = () => cursor.classList.add('custom-cursor--active');
    const handlePointerUp = () => cursor.classList.remove('custom-cursor--active');
    const handlePointerLeave = () => cursor.classList.add('custom-cursor--hidden');
    const handlePointerEnter = () => cursor.classList.remove('custom-cursor--hidden');

    const handlePointerOver = (event) => {
      if (event.target.closest(interactiveSelector)) {
        cursor.classList.add('custom-cursor--interactive');
      }
    };

    const handlePointerOut = (event) => {
      if (event.target.closest(interactiveSelector)) {
        cursor.classList.remove('custom-cursor--interactive');
      }
    };

    setIsEnabled(true);
    document.documentElement.classList.add('custom-cursor-enabled');
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('pointerenter', handlePointerEnter);
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      document.documentElement.classList.remove('custom-cursor-enabled');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('pointerenter', handlePointerEnter);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isEnabled ? 'custom-cursor--ready' : ''}`}
      aria-hidden="true"
    >
      <svg className="custom-cursor__pointer" viewBox="-6 -6 48 48" focusable="false">
        <path
          className="custom-cursor__glow"
          d="M7 4 36 22 20 26 12 40 7 4Z"
        />
        <path
          className="custom-cursor__edge"
          d="M7 4 36 22 20 26 12 40 7 4Z"
        />
        <path
          className="custom-cursor__face"
          d="M12 12 29 21.5 18 24.5 13.8 32.2 12 12Z"
        />
      </svg>
    </div>
  );
};

export default CustomCursor;
