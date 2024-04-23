document.addEventListener('DOMContentLoaded', function () {
  
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarCollapse');

    navbarToggler.addEventListener('click', function () {
        navbarCollapse.classList.toggle('show');
    });

   



    document.addEventListener('click', function (event) {
        const isClickInsideNavbar = navbarCollapse.contains(event.target);
        const isClickInsideNavbarToggler = navbarToggler.contains(event.target);

        if (!isClickInsideNavbar && !isClickInsideNavbarToggler) {
            navbarCollapse.classList.remove('show');
        }
    });


    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const scrollToOptions = {
                    behavior: 'smooth',
                    block: 'start'
                };

                targetElement.scrollIntoView(scrollToOptions);
            }
        });
    });
});
