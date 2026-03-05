"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

const SKILLS = [
  {
    title: "TypeScript & JavaScript",
    desc: "Strong typing and modern ES features for reliable, maintainable code.",
    icon: "TS",
  },
  {
    title: "React & Next.js",
    desc: "Building fast, scalable UIs and full-stack applications with the React ecosystem.",
    icon: "⚛",
  },
  {
    title: "Node.js & Backend",
    desc: "APIs, tooling, and server-side logic with Node and related frameworks.",
    icon: "⬢",
  },
  {
    title: "PHP, SCSS & More",
    desc: "Full-stack versatility: PHP for server logic and SCSS for polished styles.",
    icon: "◆",
  },
];

const PROJECTS = [
  {
    title: "JosCity - The Smart City Platform",
    description: "JosCity is a smart city platform that provides a comprehensive solution for the city of Jos. It is built with Typescript and Node.js and features a modern UI and a REST API. It is a full-stack application that includes a backend API and a frontend dashboard. Owned by cbrilliance.io",
    tags: ["React", "TypeScript", "Node"],
    href: "https://joscity.com",
  },
  {
    title: "Knowrious - Knowledge and reward driven learning platform",
    description: "Knowrious is a knowledge and reward driven learning platform that provides a comprehensive solution for smart learning. It is built with Typescript and Node.js and features a modern UI and a REST API. It is a full-stack application that includes a backend API and a frontend dashboard. Owned by cbrilliance.oi",
    tags: ["React", "TypeScript", "Node"],
    href: "https://knowrious.com",
  },
  {
    title: "Jobfinix - Job portal and recruitment platform",
    description: "Jobfinix is a job portal and recruitment platform that provides a comprehensive solution for job seekers and employers. It is built with Typescript and Node.js and features a modern UI and a REST API. It is a full-stack application that includes a backend API and a frontend dashboard. Owned by cbrilliance.io",
    tags: ["React", "TypeScript", "Node"],
    href: "https://jobfinix.com",
  },
  {
    title: "GateWav - Ticket booking platform",
    description: "GateWav is a ticket booking platform that provides a comprehensive solution for ticket booking. It is built with Typescript and Node.js and features a modern UI and a REST API. It is a full-stack application that includes a backend API and a frontend dashboard. Owned by Afresh Center",
    tags: ["React", "TypeScript", "Node"],
    href: "https://gatewav.com",
  },
  {
    title: "GeniusWav - Talent contest platform",
    description: "GeniusWav is a talent contest platform that provides a comprehensive solution for talent contest. It is built with Typescript and Node.js and features a modern UI and a REST API. It is a full-stack application that includes a backend API and a frontend dashboard. Owned by GeniusWav",
    tags: ["React", "TypeScript", "Node"],
    href: "https://geniuswav.com",
  },
  {
    title: "PopSwit - Food and Entertainment platform",
    description: "PopSwit is a food and entertainment platform that provides a comprehensive solution for food and entertainment. It is built with Typescript and Node.js and features a modern UI and a REST API. It is a full-stack application that includes a backend API and a frontend dashboard. Owned by PopSwit",
    tags: ["React", "TypeScript", "Node"],
    href: "https://popswit.com",
  },
];

export default function Home() {
  const [frontFolded, setFrontFolded] = useState(false);
  const [backVisible, setBackVisible] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [contactError, setContactError] = useState("");

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

  const openProjects = useCallback(() => {
    setFrontFolded(true);
    setTimeout(() => setBackVisible(true), 100);
  }, []);

  const closeProjects = useCallback(() => {
    setBackVisible(false);
    // After back page folds, unfold the front (book-close effect)
    setTimeout(() => setFrontFolded(false), 500);
  }, []);

  return (
    <div className="book-container">
      {/* Front page: hero + features + grid + CTA */}
      <div
        className={`book-page book-page--front${frontFolded ? " is-folded" : ""}`}
        aria-hidden={frontFolded}
      >
        <header className="hero">
          <div className="hero__content">
            <div className="hero__text">
              <h1 className="hero__title">William</h1>
              <p className="hero__subtitle">Fullstack Developer</p>
              <p className="hero__bio">
                I build web applications with TypeScript, JavaScript, React, Node.js, Next.js, PHP, and SCSS.
                I focus on clean architecture, performance, and great UX. Here’s a snapshot of what I do and some projects I’ve built.
              </p>
              <button
                type="button"
                className="hero__cta"
                onClick={openProjects}
                aria-label="View my projects"
              >
                View my projects
              </button>
            </div>
            <div className="hero__image-wrap">
              <Image
                src="/image/me.png"
                alt="William – Fullstack Developer"
                className="hero__image"
                width={600}
                height={800}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </header>

        <section className="features" aria-labelledby="skills-heading">
          <div className="features__inner">
            <h2 id="skills-heading" className="visually-hidden">Skills & expertise</h2>
            <div className="features__card">
              {SKILLS.map((skill) => (
                <div key={skill.title} className="feature">
                  <div className="feature__icon" aria-hidden>{skill.icon}</div>
                  <h3 className="feature__title">{skill.title}</h3>
                  <p className="feature__desc">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid-section" aria-labelledby="highlights-heading">
          <div className="grid-section__inner">
            <h2 id="highlights-heading" className="visually-hidden">Highlights</h2>
            <div className="cards-grid">
              <article className="card card--green">
                <div className="card__body">
                  <div className="card__icon" aria-hidden>✦</div>
                  <h3 className="card__title">Frontend</h3>
                  <p className="card__text">
                    React, Next.js, TypeScript, and SCSS for responsive, accessible interfaces.
                  </p>
                </div>
              </article>
              <article className="card card--brown">
                <div className="card__body">
                  <div className="card__icon" aria-hidden>◉</div>
                  <h3 className="card__title">Backend</h3>
                  <p className="card__text">
                    Node.js and PHP for APIs, server logic, and database integration.
                  </p>
                </div>
              </article>
              <article className="card card--tan">
                <div className="card__body">
                  <div className="card__icon" aria-hidden>❋</div>
                  <h3 className="card__title">Full stack</h3>
                  <p className="card__text">
                    End-to-end delivery from UI to API and deployment.
                  </p>
                </div>
              </article>
              <article className="card card--green">
                <div className="card__media">
                  <Image
                    src="/image/me.png"
                    alt="William"
                    width={400}
                    height={300}
                    style={{ position: "relative", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="card__body">
                  <h3 className="card__title">About me</h3>
                  <p className="card__text">
                    Fullstack developer focused on quality and maintainable code.
                  </p>
                </div>
              </article>
              <article className="card card--brown">
                <div className="card__body">
                  <div className="card__icon" aria-hidden>⬡</div>
                  <h3 className="card__title">Tools</h3>
                  <p className="card__text">
                    Git, modern bundlers, and cloud platforms for shipping and collaboration.
                    <br />
                    <br />
                    <span className="card__text">
                      <strong>Tools:</strong> React, Next.js, TypeScript, Node.js, PHP, SCSS, Git, , and cloud platforms for shipping and collaboration.
                    </span>
                  </p>
                </div>
              </article>
              <article className="card card--tan">
                <div className="card__body">
                  <div className="card__icon" aria-hidden>▣</div>
                  <h3 className="card__title">Projects</h3>
                  <p className="card__text">
                    A variety of apps and sites—see the full list on the next page.
                  </p>
                </div>
              </article>
            </div>
            <div className="cta-block">
              <button
                type="button"
                className="cta-block__btn"
                onClick={openProjects}
              >
                View my projects
              </button>
              <section className="contact-form" aria-labelledby="contact-heading">
                <h2 id="contact-heading" className="contact-form__title">Contact me</h2>
                <form onSubmit={handleContactSubmit} className="contact-form__form">
                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label htmlFor="contact-name" className="contact-form__label">Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="contact-form__input"
                        placeholder="Your name"
                        disabled={contactStatus === "sending"}
                      />
                    </div>
                    <div className="contact-form__field">
                      <label htmlFor="contact-email" className="contact-form__label">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="contact-form__input"
                        placeholder="your@email.com"
                        disabled={contactStatus === "sending"}
                      />
                    </div>
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="contact-message" className="contact-form__label">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="contact-form__input contact-form__textarea"
                      placeholder="Your message..."
                      disabled={contactStatus === "sending"}
                    />
                  </div>
                  {contactStatus === "error" && (
                    <p className="contact-form__error" role="alert">{contactError}</p>
                  )}
                  {contactStatus === "success" && (
                    <p className="contact-form__success">Message sent. I&apos;ll get back to you soon.</p>
                  )}
                  <button
                    type="submit"
                    className="cta-block__btn contact-form__submit"
                    disabled={contactStatus === "sending"}
                  >
                    {contactStatus === "sending" ? "Sending..." : "Send message"}
                  </button>
                </form>
              </section>
            </div>
          </div>
        </section>
      </div>

      {/* Back page: projects (revealed after fold) */}
      <div
        className={`book-page book-page--back${backVisible ? " is-visible" : ""}${backVisible && frontFolded ? "" : ""}`}
        aria-hidden={!backVisible}
      >
        <div className="projects-page">
          <div className="projects-page__inner">
            <a
              href="#"
              className="projects-page__back"
              onClick={(e) => {
                e.preventDefault();
                closeProjects();
              }}
              aria-label="Back to home"
            >
              ← Back
            </a>
            <header className="projects-page__header">
              <h2 className="projects-page__title">Projects</h2>
              <p className="projects-page__subtitle">
                A selection of applications and sites I’ve built.
              </p>
            </header>
            <div className="projects-grid">
              {PROJECTS.map((project) => (
                <article key={project.title} className="project-card">
                  <a href={project.href} className="project-card__link">
                    <div className="project-card__body">
                      <h3 className="project-card__title">{project.title}</h3>
                      <p className="project-card__desc">{project.description}</p>
                      <div className="project-card__tags">
                        {project.tags.map((tag) => (
                          <span key={tag} className="project-card__tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
