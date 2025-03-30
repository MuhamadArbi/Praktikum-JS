document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const closeMenu = document.getElementById('close-menu');
    const mainNav = document.getElementById('main-nav');
    const body = document.body;
    const navLinks = mainNav.querySelectorAll('a'); 

    function toggleSidebar() {
        mainNav.classList.toggle('active'); 
        body.classList.toggle('sidebar-open'); 

        const isActive = mainNav.classList.contains('active');
        hamburgerMenu.setAttribute('aria-expanded', isActive);
    }

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', toggleSidebar);
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', toggleSidebar); 
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            
            if (mainNav.classList.contains('active')) {
                toggleSidebar();
            }
        });
    });

    document.addEventListener('click', (event) => {
        
        if (mainNav.classList.contains('active') &&
            !mainNav.contains(event.target) &&
            !hamburgerMenu.contains(event.target)) {
            toggleSidebar();
        }
    });

     
     let previousScrollY = 0;
     const sidebarOpenObserver = new MutationObserver((mutations) => {
         mutations.forEach((mutation) => {
             if (mutation.attributeName === 'class') {
                 const targetElement = mutation.target;
                 if (targetElement.classList.contains('sidebar-open')) {
                     
                     previousScrollY = window.scrollY;
                     body.style.position = 'fixed';
                     body.style.top = `-${previousScrollY}px`;
                     body.style.width = '100%'; 
                 } else {
                     
                     body.style.position = '';
                     body.style.top = '';
                     body.style.width = '';
                     window.scrollTo(0, previousScrollY);
                 }
             }
         });
     });

     sidebarOpenObserver.observe(body, { attributes: true });

}); 