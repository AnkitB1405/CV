const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'awards', label: 'Certificates' },
  { id: 'contact', label: 'Contact' }
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-bg/80 backdrop-blur-xl">
      <nav className="mx-auto flex w-[min(1100px,92%)] items-center justify-between py-4">
        <a href="#home" className="font-display text-lg font-bold text-white">
          AB<span className="text-cyan">.</span>
        </a>
        <ul className="hidden gap-6 text-sm text-slate-200 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="transition hover:text-cyan focus-visible:text-cyan focus-visible:outline-none"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
