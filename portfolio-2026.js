const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const navItems = [...document.querySelectorAll(".nav-links a")];
const sections = navItems
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

const closeMenu = () => {
    navLinks?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    if (navToggle) navToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
};

navToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
});

navItems.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
});

const setActiveLink = () => {
    const headerOffset = (header?.offsetHeight || 0) + 24;
    let activeId = sections[0]?.id;

    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - headerOffset) {
            activeId = section.id;
        }
    });

    navItems.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
    });
};

setActiveLink();
window.addEventListener("scroll", setActiveLink, { passive: true });

const revealCards = [...document.querySelectorAll(".project-card")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
    revealCards.forEach((card) => card.classList.add("is-visible"));
} else {
    revealCards.forEach((card, index) => {
        card.classList.add("is-reveal");
        card.style.transitionDelay = `${Math.min(index * 90, 180)}ms`;
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.14 });

    revealCards.forEach((card) => revealObserver.observe(card));
}
