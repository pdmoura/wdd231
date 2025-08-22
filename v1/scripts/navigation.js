// scripts/navigation.js

// Get all the necessary DOM elements
const menuButton = document.getElementById('menu-button');
const mainNav = document.getElementById('main-nav');
const hamburgerIcon = document.getElementById('hamburger-icon');
const closeIcon = document.getElementById('close-icon');
const navLinks = document.querySelectorAll('#main-nav a');

// Function to open the mobile menu
function openMenu() {
    mainNav.classList.add('open');
    hamburgerIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
    menuButton.setAttribute('aria-expanded', 'true');
}

// Function to close the mobile menu
function closeMenu() {
    mainNav.classList.remove('open');
    hamburgerIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
}

// Add a click event listener to the menu button to toggle the menu
if (menuButton) {
    menuButton.addEventListener('click', () => {
        const isMenuOpen = mainNav.classList.contains('open');
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });
}

// Add click event listeners to each navigation link
// This will close the menu when a link is clicked on mobile
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
            closeMenu();
        }
    });
});

// Add a click event listener to the whole document
// This allows us to close the menu by clicking anywhere outside of it
document.addEventListener('click', (event) => {
    // Check if the menu is open AND if the click happened outside the navigation and outside the menu button
    const isClickInsideNav = mainNav.contains(event.target);
    const isClickOnButton = menuButton.contains(event.target);
    
    if (mainNav.classList.contains('open') && !isClickInsideNav && !isClickOnButton) {
        closeMenu();
    }
});

// Add a resize event listener to the window
// This ensures the menu closes automatically if the user makes their browser window wider
window.addEventListener('resize', () => {
    // The breakpoint from larger.css is 640px
    if (window.innerWidth >= 640 && mainNav.classList.contains('open')) {
        closeMenu();
    }
});
