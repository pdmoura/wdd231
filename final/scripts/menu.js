// Menu Toggle
const hamburgerButton = document.getElementById('hamburgerButton');
const mainNav = document.getElementById('mainNav');

if (hamburgerButton && mainNav) {
    hamburgerButton.addEventListener('click', () => {
        hamburgerButton.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerButton.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburgerButton.contains(e.target) && !mainNav.contains(e.target)) {
            hamburgerButton.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });
}

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for same-page anchors
        if (href !== '#' && href.startsWith('#')) {
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});