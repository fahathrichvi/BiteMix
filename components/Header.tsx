"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks, siteConfig } from "@/config/site";
import { generalOrderMessage, whatsappLink } from "@/lib/whatsapp";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link of the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Mobile menu: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(panel.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (e.key === "Tab") {
        const items = focusables();
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    const onResize = () => window.innerWidth >= 1280 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const orderHref = whatsappLink(generalOrderMessage);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        open
          ? "bg-cream-50 shadow-[0_1px_0_rgb(59_36_22/0.08)]" // no backdrop-filter: it would trap the fixed menu panel
          : scrolled
            ? "bg-cream-50/90 shadow-[0_1px_0_rgb(59_36_22/0.08),0_10px_30px_-18px_rgb(59_36_22/0.35)] backdrop-blur-md"
            : "bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-forest-800 focus:px-4 focus:py-2 focus:text-cream-50"
      >
        முதன்மை உள்ளடக்கத்திற்குச் செல்லவும்
      </a>
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <a href="#home" className="shrink-0 rounded-lg" aria-label={`${siteConfig.name} — முகப்பு`}>
          <Logo />
        </a>

        <nav aria-label="முதன்மை வழிசெலுத்தல்" className="hidden xl:block">
          <ul className="flex items-center">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative whitespace-nowrap rounded-full px-3 py-2 text-[0.95rem] font-medium transition-colors ${
                      isActive ? "text-forest-800" : "text-brown-600 hover:text-brown-900"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-terracotta-500 transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hidden whitespace-nowrap !min-h-11 !px-5 sm:inline-flex"
          >
            <WhatsAppIcon size={20} />
            ஆர்டர் செய்யுங்கள்
          </a>
          <button
            ref={menuButton}
            type="button"
            className="inline-flex size-12 items-center justify-center rounded-full text-brown-900 transition-colors hover:bg-cream-200 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "மெனுவை மூடு" : "மெனுவைத் திற"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon size={26} /> : <MenuIcon size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        ref={panel}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto bg-cream-50 xl:hidden"
      >
        <nav aria-label="மொபைல் வழிசெலுத்தல்" className="container-page flex min-h-full flex-col py-6">
          <ul className="divide-y divide-cream-300">
            {navLinks.map((link, i) => (
              <li key={link.id} className="animate-fade-up" style={{ animationDelay: `${i * 45}ms` }}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? "location" : undefined}
                  className="flex items-center justify-between py-4 font-display text-xl font-semibold text-brown-900"
                >
                  {link.label}
                  <span aria-hidden="true" className={`size-2 rounded-full ${active === link.id ? "bg-terracotta-500" : "bg-transparent"}`} />
                </a>
              </li>
            ))}
          </ul>
          <a
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn btn-wa mt-8 w-full !min-h-14 text-lg"
          >
            <WhatsAppIcon size={22} />
            WhatsApp-ல் ஆர்டர் செய்யுங்கள்
          </a>
          <p className="mt-6 text-center text-brown-600">{siteConfig.tagline}</p>
        </nav>
      </div>
    </header>
  );
}
