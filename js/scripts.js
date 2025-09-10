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

// Mobile menu: build a collapsible menu from desktop nav and toggle with hamburger
function initMobileMenu() {
    try {
        const header = document.querySelector('header');
        if (!header) return;

        const desktopNav = header.querySelector('nav');
        const menuButton = header.querySelector('button.md:hidden');

        if (!desktopNav || !menuButton) return;

        // Create mobile menu container just after header
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'md:hidden bg-[#e8f0ec] border-t border-gray-200 shadow-sm hidden';

        const menuInner = document.createElement('div');
        menuInner.className = 'container mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col';

        const links = desktopNav.querySelectorAll('a');
        links.forEach(function (link) {
            const a = document.createElement('a');
            a.href = link.getAttribute('href');
            a.textContent = link.textContent;
            // Style for mobile items
            a.className = 'block px-2 py-3 text-base font-medium text-[#1c1c0d] hover:text-[#166534]';
            menuInner.appendChild(a);
        });

        mobileMenu.appendChild(menuInner);

        // Insert after header
        if (header.parentNode) {
            header.parentNode.insertBefore(mobileMenu, header.nextSibling);
        }

        // Toggle handler
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.addEventListener('click', function () {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                menuButton.setAttribute('aria-expanded', 'true');
            } else {
                mobileMenu.classList.add('hidden');
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Close the menu when a link is clicked
        mobileMenu.addEventListener('click', function (e) {
            const target = e.target;
            if (target && target.tagName === 'A') {
                mobileMenu.classList.add('hidden');
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
    } catch (err) {
        // fail silently in production
    }
}
