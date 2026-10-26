export default function Footer() {
  const links = [
    { href: "#about",      label: "About" },
    { href: "#experience", label: "Skills" },
    { href: "#projects",   label: "Projects" },
    { href: "#contact",    label: "Contact" },
  ]

  return (
    <footer className="border-t border-[rgba(255,255,255,0.07)] py-10 px-8 text-center bg-[#0f1220]">
      <nav aria-label="Footer navigation" className="mb-4">
        <ul className="flex justify-center flex-wrap gap-8 list-none m-0 p-0">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-[0.8rem] font-medium text-[#6b7a99] hover:text-[#00d4ff] transition-colors no-underline"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="text-[0.72rem] text-[#2e3650]">
        Copyright &copy; 2025 Zohaib Hassan. All Rights Reserved.
      </p>
    </footer>
  )
}
