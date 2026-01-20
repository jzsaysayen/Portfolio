// Theme toggle with persistence
const themeToggleBtn = document.getElementById("themeToggle");
const THEME_KEY = "resume-theme";

const applyTheme = (mode) => {
  document.body.classList.toggle("light", mode === "light");
  const icon = themeToggleBtn?.querySelector(".theme-toggle-icon");
  if (icon) {
    icon.textContent = mode === "light" ? "☀" : "☾";
  }
};

// Initialize from saved theme or system preference
const savedTheme = localStorage.getItem(THEME_KEY);
const prefersLight = window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches;
const initialTheme = savedTheme || (prefersLight ? "light" : "dark");
applyTheme(initialTheme);

themeToggleBtn?.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  const next = isLight ? "dark" : "light";
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});

// Smooth scroll for anchor links
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      closeNav();
    }
  });
});

// Active link highlight on scroll
const sections = document.querySelectorAll("section[id]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (navLink) {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("active"));
          navLink.classList.add("active");
        }
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach((section) => observer.observe(section));

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const closeNav = () => nav?.classList.remove("open");
navToggle?.addEventListener("click", () => {
  nav?.classList.toggle("open");
});

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn?.classList.add("visible");
  } else {
    scrollTopBtn?.classList.remove("visible");
  }
});
scrollTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Contact form basic validation feedback
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    statusEl.textContent = "Please fill in all required fields correctly.";
    statusEl.style.color = "#f3b05a";
    return;
  }
  statusEl.textContent = "Thanks! Your message is ready to be sent.";
  statusEl.style.color = "#7bffb0";
  form.reset();
});


