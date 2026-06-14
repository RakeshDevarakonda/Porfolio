import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button (full block on left) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-12 flex items-center justify-center rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo (only visible on md and above, right side) */}
          <div className="font-mono text-xl font-bold text-primary hidden md:block">
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              <span className="relative text-5xl font-bold text-secondary group">
                Rakesh
                <span className="absolute left-0 bottom-0 w-0 h-1 bg-secondary transition-all duration-500 group-hover:w-full"></span>
              </span>
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-foreground hover:text-primary transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Desktop Resume Button */}
          <a
            href="https://drive.google.com/file/d/1nS-vHeGPcXep7HTfzL_CJSu5EreEms3L/view?usp=sharing"
            target="_blank"
            download="Rakesh_Resume.pdf"
            rel="noopener noreferrer"
          >
            <Button variant="neon" size="sm" className="hidden md:inline-flex">
              View Resume
            </Button>
          </a>
        </div>
      </div>

      {/* Mobile Sidebar Menu (solid background, slides from left) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-background border-r border-border transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-border">
          <span className="text-xl font-bold text-primary">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col space-y-6 px-6 py-6">
          {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-foreground hover:text-primary transition-colors duration-300 text-lg text-left"
            >
              {item}
            </button>
          ))}

          <a
            href="https://drive.google.com/file/d/1Dy3lx_Ts2feblhNE9SWO4QN-VpIj6SvW/view?usp=sharing"
            target="_blank"
            download="Rakesh_Resume.pdf"
            rel="noopener noreferrer"
          >
            <Button variant="neon" size="sm" className="w-full">
              View Resume
            </Button>
          </a>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
