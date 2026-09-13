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
