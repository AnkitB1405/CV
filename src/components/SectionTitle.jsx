const SectionTitle = ({ eyebrow, title, description }) => {
  return (
    <header className="mb-8 md:mb-10">
      <p className="mb-3 inline-flex rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{title}</h2>
      {description ? <p className="mt-3 max-w-2xl text-slate-300">{description}</p> : null}
    </header>
  );
};

export default SectionTitle;
