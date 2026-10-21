"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

export function SiteHeader({ page = "home" }: { page?: "home" | "pricing" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const home = page === "home" ? "" : "/";

  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const currentY = window.scrollY;
      setScrolled(currentY > 64);
      if (currentY < 100 || menuOpen || document.activeElement?.closest(".siteHeader")) {
        setVisible(true);
        previousY = currentY;
        return;
      }
      if (Math.abs(currentY - previousY) >= 8) {
        setVisible(currentY < previousY);
        previousY = currentY;
      }
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [menuOpen]);

  return (
    <header className={`siteHeader ${visible ? "" : "siteHeaderHidden"} ${scrolled ? "siteHeaderScrolled" : ""}`}
      style={{ backdropFilter: "blur(22px) saturate(1.35)", WebkitBackdropFilter: "blur(22px) saturate(1.35)" }}
      onFocusCapture={() => setVisible(true)}
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
      }}>
      <div className="headerInner">
        <a className="brand brandFull" href={`${home}#top`} aria-label="Destination Management System home">
          <img className="brandFullLogo" src="/assets/dms-full-logo.png" alt="" aria-hidden="true" />
          <span className="srOnly">Destination Management System</span>
        </a>
        <nav id="primary-navigation" className={`mainNav ${menuOpen ? "mainNavOpen" : ""}`}
          aria-label="Primary navigation" style={{ backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)" }}
          onClick={() => setMenuOpen(false)}>
          <a href={`${home}#platform`}>Platform</a>
          <a href={`${home}#features`}>Features</a>
          <a href={`${home}#workflow`}>Workflow</a>
          <a href="/pricing" aria-current={page === "pricing" ? "page" : undefined}>Pricing</a>
          <a href={`${home}#resources`}>Resources</a>
        </nav>
        <div className="headerActions">
          <a className="textLink" href="/login">Sign in</a>
          <a className="primaryButton headerCta" href={`${home}#request-demo`}>Request a demo</a>
          <button ref={menuButton} className="menuButton" type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen} aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
