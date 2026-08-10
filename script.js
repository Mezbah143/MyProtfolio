const navLinks = document.querySelectorAll('.navbar-list a[href^="#"]');
const navbarList = document.querySelector('.navbar-list');
const navbarToggle = document.querySelector('.nav-toggle');
const navbarCollapse = document.getElementById('navbarCollapse');

function setMenuOpen(isOpen) {
    if (!navbarCollapse || !navbarToggle) return;
    navbarCollapse.classList.toggle('show', isOpen);
    navbarToggle.setAttribute('aria-expanded', String(isOpen));
}

navLinks.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;

        event.preventDefault();
        const offset = 82;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
            top: Math.max(targetPosition, 0),
            behavior: 'smooth'
        });

        setMenuOpen(false);
    });
});

if (navbarToggle) {
    navbarToggle.addEventListener('click', () => {
        const isOpen = navbarToggle.getAttribute('aria-expanded') === 'true';
        setMenuOpen(!isOpen);
    });
}

window.addEventListener('scroll', () => {
    const scrollDistance = window.scrollY + 120;
    const sections = document.querySelectorAll('section[id]');
    let currentSectionId = '';

    sections.forEach((section) => {
        if (section.offsetTop <= scrollDistance) {
            currentSectionId = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
    });
});

window.addEventListener('click', (event) => {
    if (!navbarList || !navbarToggle) return;
    if (!event.target.closest('.navbar-list') && !event.target.closest('.nav-toggle')) {
        setMenuOpen(false);
    }
});
