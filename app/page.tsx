"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

type ProjectCategory = "all" | "platform" | "ai" | "tool";

interface Project {
  title: string;
  description: string;
  tags: string[];
  href: string;
  category: ProjectCategory;
  featured?: boolean;
}

const MARQUEE_ITEMS = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "AI Systems",
  "Prompt Engineering",
  "Full-Stack",
  "NAB",
  "Product Strategy",
  "System Design",
];

const EXPERTISE = [
  {
    title: "Full-Stack Engineering",
    desc: "End-to-end product delivery — from pixel-perfect interfaces to resilient APIs and deployment pipelines.",
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M8 9l3 3-3 3M13 15h3M4 4h16v16H4z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "AI & Prompt Engineering",
    desc: "Architecting intelligent systems with precision-crafted prompts, LLM workflows, and context-aware AI products.",
    tags: ["LLMs", "RAG", "Agents", "Fine-tuning"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M12 2a4 4 0 014 4v1a4 4 0 01-8 0V6a4 4 0 014-4zM6 10h12v2a6 6 0 01-12 0v-2zM8 20h8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Product Architecture",
    desc: "Designing scalable systems with clean separation of concerns, maintainable codebases, and long-term velocity.",
    tags: ["REST APIs", "SCSS", "PHP", "Cloud"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Technical Leadership",
    desc: "Leading engineering teams and AI initiatives — translating vision into shipped products that create real impact.",
    tags: ["Strategy", "Mentorship", "CAIO", "NAB"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 17l-6.3 4 2.3-7-6-4.6h7.6L12 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const PROJECTS: Project[] = [
  {
    title: "NAB — Nigerian AI Builders",
    description:
      "A nationwide movement of innovators building AI solutions for Nigeria's biggest challenges. As CAIO, I lead the technical vision — architecting platforms that understand local context, speak indigenous languages, and solve real problems at scale.",
    tags: ["AI", "Next.js", "TypeScript", "Leadership"],
    href: "https://aibuilders.ng",
    category: "ai",
    featured: true,
  },
  {
    title: "JosCity — Smart City Platform",
    description:
      "A comprehensive smart city platform for Jos with a modern dashboard and REST API. Full-stack TypeScript and Node.js architecture.",
    tags: ["React", "TypeScript", "Node", "SCSS"],
    href: "https://joscity.com",
    category: "platform",
  },
  {
    title: "Knowrist — Learning Platform",
    description:
      "Knowledge and reward-driven learning platform with gamified education flows, built for engagement and measurable outcomes.",
    tags: ["React", "TypeScript", "Node", "SCSS"],
    href: "https://knowrist.com",
    category: "platform",
  },
  {
    title: "Jobfinix — Recruitment Platform",
    description:
      "Job portal connecting seekers and employers with intelligent matching, application tracking, and employer dashboards.",
    tags: ["React", "TypeScript", "Node", "SCSS"],
    href: "https://jobfinix.com",
    category: "platform",
  },
  {
    title: "GateWav — Ticket Booking",
    description:
      "End-to-end ticket booking platform with real-time inventory, secure payments, and event management dashboards.",
    tags: ["React", "TypeScript", "Node", "SCSS"],
    href: "https://gatewav.com",
    category: "platform",
  },
  {
    title: "GeniusWav — Talent Contest",
    description:
      "Talent contest platform enabling discovery, voting, and showcase of emerging artists across Nigeria.",
    tags: ["React", "TypeScript", "Node", "SCSS"],
    href: "https://geniuswav.com",
    category: "platform",
  },
  {
    title: "PopSwit — Food & Entertainment",
    description:
      "Food and entertainment platform merging culinary experiences with social discovery and event curation.",
    tags: ["React", "TypeScript", "Node", "SCSS"],
    href: "https://popswit.com",
    category: "platform",
  },
  {
    title: "Afresh Center",
    description:
      "Tech and media center platform bridging innovation, healthcare media, and community-driven digital services.",
    tags: ["React", "TypeScript", "Node", "SCSS"],
    href: "https://afresh.center",
    category: "platform",
  },
  {
    title: "Afresh Fashion",
    description:
      "Exclusive online store for fashion and luxury wear — elegant commerce with a premium brand experience.",
    tags: ["Next.js", "TypeScript", "SCSS"],
    href: "https://afreshfashion.com",
    category: "platform",
  },
  {
    title: "AMA Privé — Modeling Agency",
    description:
      "Modeling agency platform for talent management, portfolio showcase, and client booking workflows.",
    tags: ["React", "TypeScript", "Node", "SCSS"],
    href: "https://afreshmodeling.com",
    category: "platform",
  },
  {
    title: "PixelForge Studio",
    description: "Free image and video conversion tool built for creators — fast, accessible, and open to the public.",
    tags: ["React", "TypeScript", "Node"],
    href: "https://pixelforge-7qau.onrender.com",
    category: "tool",
  },
  {
    title: "QR Code Generator",
    description: "Lightweight, free QR code generator — instant generation with customization and download support.",
    tags: ["React", "TypeScript", "Node"],
    href: "https://qr-code-ten-tau.vercel.app",
    category: "tool",
  },
];

const FILTERS: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "platform", label: "Platforms" },
  { id: "ai", label: "AI" },
  { id: "tool", label: "Tools" },
];

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

function useScrollReveal(deps: unknown[] = []) {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, deps);
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M7 17L17 7M17 7H9M17 7v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [contactError, setContactError] = useState("");
  const mainRef = useRef<HTMLElement>(null);

  useScrollReveal([activeFilter]);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const handleContactSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setContactError("");
      setContactStatus("sending");
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: contactName.trim(),
            email: contactEmail.trim(),
            message: contactMessage.trim(),
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setContactStatus("error");
          setContactError(data.error ?? "Something went wrong.");
          return;
        }
        setContactStatus("success");
        setContactName("");
        setContactEmail("");
        setContactMessage("");
      } catch {
        setContactStatus("error");
        setContactError("Failed to send. Please try again.");
      }
    },
    [contactName, contactEmail, contactMessage]
  );

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site">
      <nav className={`nav${navScrolled ? " is-scrolled" : ""}${menuOpen ? " nav--menu-open" : ""}`} aria-label="Main navigation">
        <div className="nav__inner">
          <a href="#" className="nav__brand" aria-label="William Bosworth — Home">
            <span className="nav__brand-mark">W</span>
            <span>William</span>
          </a>
          <ul className="nav__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav__link">{link.label}</a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="nav__cta">Get in touch</a>
          <button
            type="button"
            className={`nav__menu-btn${menuOpen ? " is-open" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="nav__menu-icon nav__menu-icon--open" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
            <svg className="nav__menu-icon nav__menu-icon--close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="mobile-menu__link" onClick={closeMenu}>
            {link.label}
          </a>
        ))}
      </div>

      <main ref={mainRef}>
        {/* Hero */}
        <section className="hero" id="hero" aria-labelledby="hero-title">
          <div className="hero__bg" aria-hidden>
            <div className="orb orb--1" />
            <div className="orb orb--2" />
            <div className="orb orb--3" />
            <div className="grid-lines" />
          </div>
          <div className="hero__inner">
            <div className="hero__content reveal">
              <div className="hero__badges">
                <span className="hero__badge hero__badge--accent">
                  <span className="hero__badge-dot" />
                  Available for projects
                </span>
                <span className="hero__badge">CAIO · Nigerian AI Builders</span>
              </div>
              <h1 id="hero-title" className="hero__title">
                William <span className="highlight">Bosworth</span>
              </h1>
              <p className="hero__roles">
                <span className="hero__role">Full-Stack Developer</span>
                <span className="hero__role">Prompt Engineer</span>
                <span className="hero__role">AI Strategist</span>
              </p>
              <p className="hero__bio">
                I architect intelligent digital products at the intersection of engineering,
                AI, and product strategy. From enterprise platforms to nationwide AI movements —
                I build technology that ships, scales, and creates lasting impact.
              </p>
              <div className="hero__actions">
                <a href="#work" className="hero__cta">
                  View selected work
                  <ArrowIcon />
                </a>
                <a href="#contact" className="hero__cta-secondary">Start a conversation</a>
              </div>
              <div className="hero__metrics">
                <div className="hero__metric">
                  <div className="hero__metric-value">12+</div>
                  <div className="hero__metric-label">Products shipped</div>
                </div>
                <div className="hero__metric">
                  <div className="hero__metric-value">CAIO</div>
                  <div className="hero__metric-label">Nigerian AI Builders</div>
                </div>
                <div className="hero__metric">
                  <div className="hero__metric-value">Full-Stack</div>
                  <div className="hero__metric-label">UI to infrastructure</div>
                </div>
              </div>
            </div>
            <div className="hero__visual reveal">
              <div className="hero__image-frame">
                <Image
                  src="/image/william-portrait.png"
                  alt="William Bosworth — Full-Stack Developer and CAIO"
                  className="hero__image"
                  width={600}
                  height={800}
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 320px, 420px"
                />
              </div>
              <div className="hero__floating-card hero__floating-card--top">
                <div className="hero__floating-card-label">Role</div>
                <div className="hero__floating-card-value">Chief AI Officer</div>
              </div>
              <div className="hero__floating-card hero__floating-card--bottom">
                <div className="hero__floating-card-label">Focus</div>
                <div className="hero__floating-card-value">AI · Full-Stack · Strategy</div>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="marquee" aria-hidden>
          <div className="marquee__track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={`${item}-${i}`} className="marquee__item">{item}</span>
            ))}
          </div>
        </div>

        {/* About */}
        <section className="about" id="about" aria-labelledby="about-heading">
          <div className="about__inner">
            <div className="about__content reveal">
              <span className="section-label">About</span>
              <h2 id="about-heading" className="section-heading">
                Engineering with intent.<br />Leading with vision.
              </h2>
              <p className="section-desc">
                I don&apos;t just write code — I architect systems, craft AI experiences,
                and lead teams toward products that matter.
              </p>
            </div>
            <div className="about__cards">
              <article className="about__card reveal">
                <div className="about__card-header">
                  <div className="about__card-icon about__card-icon--green">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="about__card-title">Clean Architecture</h3>
                </div>
                <p className="about__card-text">
                  Every codebase I touch is built for longevity — readable, maintainable,
                  and structured to evolve without accumulating debt.
                </p>
              </article>
              <article className="about__card reveal">
                <div className="about__card-header">
                  <div className="about__card-icon about__card-icon--indigo">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </div>
                  <h3 className="about__card-title">User-Centered Design</h3>
                </div>
                <p className="about__card-text">
                  Performance and usability aren&apos;t afterthoughts. I build interfaces
                  that feel fast, intuitive, and deliberately crafted.
                </p>
              </article>
              <article className="about__card reveal">
                <div className="about__card-header">
                  <div className="about__card-icon about__card-icon--warm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="about__card-title">Ship &amp; Iterate</h3>
                </div>
                <p className="about__card-text">
                  From MVP to production scale — I deliver end-to-end, owning the full
                  stack from database schema to deployment pipeline.
                </p>
              </article>
              <article className="about__nab reveal">
                <div className="about__nab-label">Leadership</div>
                <h3 className="about__nab-title">Chief AI Officer — Nigerian AI Builders</h3>
                <p className="about__nab-text">
                  Leading the technical vision for a nationwide movement of innovators
                  building AI that understands Nigerian context, speaks our languages,
                  and solves our most pressing challenges.
                </p>
                <a href="https://aibuilders.ng" className="about__nab-link" target="_blank" rel="noopener noreferrer">
                  Explore NAB
                  <ArrowIcon />
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section className="expertise" id="expertise" aria-labelledby="expertise-heading">
          <div className="expertise__inner">
            <div className="expertise__header reveal">
              <span className="section-label">Expertise</span>
              <h2 id="expertise-heading" className="section-heading">Where craft meets intelligence</h2>
              <p className="section-desc">
                A rare combination of deep engineering skill and strategic AI leadership —
                built to deliver at the highest level.
              </p>
            </div>
            <div className="expertise__grid">
              {EXPERTISE.map((item) => (
                <article key={item.title} className="expertise__card reveal">
                  <div className="expertise__card-icon">{item.icon}</div>
                  <h3 className="expertise__card-title">{item.title}</h3>
                  <p className="expertise__card-desc">{item.desc}</p>
                  <div className="expertise__card-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="expertise__card-tag">{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="expertise__highlight reveal">
              <div className="expertise__highlight-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M9.5 2A5.5 5.5 0 004 7.5v1A5.5 5.5 0 009.5 14H14a5.5 5.5 0 005.5-5.5v-1A5.5 5.5 0 0014 2H9.5z" strokeLinecap="round" />
                  <path d="M12 14v4M8 22h8M10 18h4" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="expertise__highlight-title">Professional Prompt Engineering</h3>
                <p className="expertise__highlight-text">
                  I design prompt systems the way engineers design APIs — with structure,
                  reliability, and measurable outputs. From chain-of-thought pipelines to
                  multi-agent orchestration, I turn LLMs into production-grade tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Work */}
        <section className="work" id="work" aria-labelledby="work-heading">
          <div className="work__inner">
            <div className="work__header reveal">
              <div className="work__header-text">
                <span className="section-label">Selected Work</span>
                <h2 id="work-heading" className="section-heading">Products that ship</h2>
                <p className="section-desc">
                  Enterprise platforms, AI initiatives, and public tools — each built
                  with the same standard of craft.
                </p>
              </div>
              <div className="work__filters" role="tablist" aria-label="Filter projects">
                {FILTERS.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    role="tab"
                    aria-selected={activeFilter === filter.id}
                    className={`work__filter${activeFilter === filter.id ? " is-active" : ""}`}
                    onClick={() => setActiveFilter(filter.id)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="work__grid">
              {filteredProjects.map((project) => (
                <a
                  key={project.title}
                  href={project.href}
                  className={`work__card reveal${project.featured ? " work__card--featured" : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="work__card-top">
                    <span className="work__card-category">
                      {project.category === "ai" ? "AI & Leadership" : project.category === "tool" ? "Public Tool" : "Platform"}
                    </span>
                    <span className="work__card-arrow"><ArrowIcon /></span>
                  </div>
                  <div className="work__card-body">
                    <h3 className="work__card-title">{project.title}</h3>
                    <p className="work__card-desc">{project.description}</p>
                    <div className="work__card-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="work__card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="contact" id="contact" aria-labelledby="contact-heading">
          <div className="contact__inner">
            <div className="contact__info reveal">
              <span className="section-label">Contact</span>
              <h2 id="contact-heading" className="contact__heading">
                Let&apos;s build something remarkable
              </h2>
              <p className="contact__desc">
                Whether it&apos;s a new product, an AI initiative, or a strategic partnership —
                I&apos;m always open to conversations that lead to real impact.
              </p>
              <div className="contact__channels">
                <a href="https://aibuilders.ng" className="contact__channel" target="_blank" rel="noopener noreferrer">
                  <div className="contact__channel-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact__channel-label">Organization</div>
                    <div className="contact__channel-value">Nigerian AI Builders</div>
                  </div>
                </a>
                <a href="#work" className="contact__channel">
                  <div className="contact__channel-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact__channel-label">Portfolio</div>
                    <div className="contact__channel-value">View all projects</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="contact__form-wrap reveal">
              <form onSubmit={handleContactSubmit} className="contact__form">
                <div className="contact__row">
                  <div className="contact__field">
                    <label htmlFor="contact-name" className="contact__label">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="contact__input"
                      placeholder="Your name"
                      disabled={contactStatus === "sending"}
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="contact-email" className="contact__label">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="contact__input"
                      placeholder="you@company.com"
                      disabled={contactStatus === "sending"}
                    />
                  </div>
                </div>
                <div className="contact__field">
                  <label htmlFor="contact-message" className="contact__label">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="contact__input contact__textarea"
                    placeholder="Tell me about your project or idea..."
                    disabled={contactStatus === "sending"}
                  />
                </div>
                {contactStatus === "error" && (
                  <p className="contact__error" role="alert">{contactError}</p>
                )}
                {contactStatus === "success" && (
                  <p className="contact__success">Message sent. I&apos;ll be in touch shortly.</p>
                )}
                <button
                  type="submit"
                  className="contact__submit"
                  disabled={contactStatus === "sending"}
                >
                  {contactStatus === "sending" ? "Sending..." : "Send message"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <div>
            <div className="footer__brand">
              <span className="footer__mark">W</span>
              <div>
                <div className="footer__name">William Bosworth</div>
                <div className="footer__tagline">Full-Stack Developer · CAIO · Prompt Engineer</div>
              </div>
            </div>
          </div>
          <div className="footer__links">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="footer__link">{link.label}</a>
            ))}
            <a href="https://aibuilders.ng" className="footer__link" target="_blank" rel="noopener noreferrer">NAB</a>
          </div>
          <p className="footer__copy">&copy; {new Date().getFullYear()} William Bosworth. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
