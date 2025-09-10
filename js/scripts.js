// Future Resilient Communities - JavaScript

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation for contact form
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            e.preventDefault();
            alert('Please fill in all required fields.');
            return;
        }

        if (!isValidEmail(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return;
        }

        // Form is valid, allow submission
        alert('Thank you for your message! We will get back to you soon.');
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add active class to current page in navigation
function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', function () {
    setActiveNavLink();
    initMobileMenu();
});

// Simple image lazy loading (if needed)
const images = document.querySelectorAll('img[data-src]');
if (images.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Accessibility: Add focus styles for keyboard navigation
document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function () {
    document.body.classList.remove('keyboard-navigation');
});

// Mobile menu: toggle the static mobile menu with hamburger button
function initMobileMenu() {
    console.log('initMobileMenu called');
    try {
        const menuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        console.log('Menu button found:', menuButton);
        console.log('Mobile menu found:', mobileMenu);

        if (!menuButton || !mobileMenu) {
            console.log('Missing menu button or mobile menu');
            return;
        }

        // Toggle handler
        menuButton.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu button clicked');
            const isHidden = mobileMenu.classList.contains('hidden');
            console.log('Menu is hidden:', isHidden);
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                menuButton.setAttribute('aria-expanded', 'true');
                console.log('Menu shown');
            } else {
                mobileMenu.classList.add('hidden');
                menuButton.setAttribute('aria-expanded', 'false');
                console.log('Menu hidden');
            }
        });

        // Close the menu when a link is clicked
        mobileMenu.addEventListener('click', function (e) {
            const target = e.target;
            if (target && target.tagName === 'A') {
                mobileMenu.classList.add('hidden');
                menuButton.setAttribute('aria-expanded', 'false');
                console.log('Menu closed after link click');
            }
        });

        console.log('Mobile menu initialized successfully');
    } catch (err) {
        console.error('Error initializing mobile menu:', err);
    }
}
