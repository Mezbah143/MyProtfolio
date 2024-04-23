// script.js

// Smooth scrolling for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        const offset = 80; // Adjust this value according to your navbar height
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition - offset;
        const duration = 1000;
        let startTime = null;

        function scrollAnimation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const scrollAmount = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, scrollAmount);
            if (timeElapsed < duration) requestAnimationFrame(scrollAnimation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(scrollAnimation);
    });
});

// Toggle navbar collapse on click
const navbarList = document.querySelector('.navbar-list');
const navbarCollapse = document.getElementById('navbarCollapse');
navbarList.addEventListener('click', function() {
    navbarCollapse.classList.toggle('show');
});

// Toggle active class for navbar items on scroll
window.addEventListener('scroll', function() {
    const scrollDistance = window.scrollY;
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionId = section.getAttribute('id');
        const sectionOffset = section.offsetTop - 80; // Adjust this value according to your navbar height
        if (sectionOffset <= scrollDistance) {
            const activeLink = document.querySelector(`.navbar-list a[href="#${sectionId}"]`);
            document.querySelectorAll('.navbar-list a').forEach(a => {
                a.classList.remove('active');
            });
            activeLink.classList.add('active');
        }
    });
});

// Close navbar collapse menu when clicking outside
window.addEventListener('click', function(e) {
    if (!e.target.closest('.navbar-list')) {
        navbarCollapse.classList.remove('show');
    }
});
