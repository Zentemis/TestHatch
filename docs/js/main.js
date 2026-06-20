/**
 * Aethra AI — Main JS
 * Scroll animations, intersection observers, and polish.
 */

(function() {
    'use strict';

    // --- Intersection Observer for feature cards ---
    const cards = document.querySelectorAll('.feature-card, .model-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // --- Navbar scroll effect ---
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 80) {
            navbar.style.background = 'rgba(3, 5, 14, 0.95)';
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
        } else {
            navbar.style.background = 'rgba(3, 5, 14, 0.8)';
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
        }

        lastScroll = currentScroll;
    });

    // --- Smooth scroll for nav links ---
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    console.log('[Aethra] Site initialized.');
})();