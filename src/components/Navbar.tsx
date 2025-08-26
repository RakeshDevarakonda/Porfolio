import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="font-mono text-xl font-bold text-primary">
            <button
              key="name"
              onClick={() => scrollToSection("home")}
              className="text-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              <span className="relative text-5xl font-bold text-secondary group">
                Rakesh
                <span className="absolute left-0 bottom-0 w-0 h-1 bg-secondary transition-all duration-500 group-hover:w-full"></span>
              </span>
            </button>
          </div>

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

          <a
            href="https://drive.google.com/file/d/1Dy3lx_Ts2feblhNE9SWO4QN-VpIj6SvW/view?usp=drive_link"
            
            target="_blank"
            download="Rakesh_Resume.pdf"
            rel="noopener noreferrer"
          >
            <Button variant="neon" size="sm" className="hidden md:inline-flex">
              Download Resume
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
