import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 280);
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan/35 bg-panel/85 text-cyan shadow-card backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan/60 hover:shadow-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <FaArrowUp aria-hidden="true" />
    </button>
  );
};

export default BackToTop;
