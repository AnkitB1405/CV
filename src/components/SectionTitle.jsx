// ponytail: `eyebrow` accepted but intentionally not rendered — the spec bans the
// per-section uppercase eyebrow tell. Kept in the signature so call sites don't churn.
const SectionTitle = ({ title, description }) => {
  return (
    <header className="mb-9 max-w-2xl">
      <div className="mb-5 h-px w-16 bg-gradient-to-r from-ember to-transparent" aria-hidden="true" />
      <h2
        className="font-display text-3xl font-bold leading-[1.05] text-ink md:text-[2.6rem]"
        style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}
      >
        {title}
      </h2>
      {description ? <p className="mt-4 text-lg leading-[1.6] text-muted">{description}</p> : null}
    </header>
  );
};

export default SectionTitle;
