import { useEffect, useRef, useState } from 'react';

const Reveal = ({ as: Tag = 'div', className = '', children, delay = 0, threshold = 0.16, ...props }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
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
