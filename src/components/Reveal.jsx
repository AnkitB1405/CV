import { useEffect, useRef, useState } from 'react';

const Reveal = ({ as: Tag = 'div', className = '', children, delay = 0, threshold = 0, ...props }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    // Bidirectional: reveal on scroll into view, hide again on scroll out (both directions).
    // threshold 0 (+ rootMargin) so any sliver counts as visible — the ember-wipe animation
    // clips the element down to ~10%, which must NOT read as "out of view" and untoggle us.
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? 'reveal-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
