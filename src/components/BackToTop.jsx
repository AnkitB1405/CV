import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';
import { smoothScrollTo } from '../utils/smoothScroll';

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
      onClick={() => smoothScrollTo('body')}
      className={`fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-pill border border-ember/35 bg-surface/85 text-emberBright shadow-card backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-ember/60 hover:shadow-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <FaArrowUp aria-hidden="true" />
    </button>
  );
};

export default BackToTop;
