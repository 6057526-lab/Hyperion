"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navigationItems = [
  { href: "#top", label: "Home" },
  { href: "#market-segments", label: "Market Segments" },
  { href: "#lifecycle", label: "Lifecycle" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#wheels", label: "Wheels" },
  { href: "#company", label: "Company" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="headerContainer">
        <Link href="/" className="logo">
          <span className="logoText">REEMS</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktopNav">
          {navigationItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className={`navLink ${activeSection === item.href.substring(1) ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobileMenuButton"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburgerLine"></span>
          <span className="hamburgerLine"></span>
          <span className="hamburgerLine"></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="mobileNav">
          {navigationItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className={`mobileNavLink ${activeSection === item.href.substring(1) ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
