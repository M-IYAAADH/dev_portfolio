// =========================
// Main JS
// =========================

document.addEventListener('DOMContentLoaded', function () {

    /* =========================
       Mobile Navigation
    ========================= */

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    /* =========================
       Smooth Scroll
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =========================
       Navbar Scroll Effect
    ========================= */

    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(13, 15, 22, 0.95)';
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
            } else {
                navbar.style.background = 'rgba(13, 15, 22, 0.9)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    /* =========================
       Section Reveal Animation
    ========================= */

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    /* =========================
       Sticky / Magnetic Cursor
    ========================= */

    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cursor = document.querySelector('.cursor');
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let isHovering = false;
    let hoverTarget = null;

    // Track real mouse
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        let targetX = mouseX;
        let targetY = mouseY;

        if (isHovering && hoverTarget) {
            const rect = hoverTarget.getBoundingClientRect();
            targetX = rect.left + rect.width / 2;
            targetY = rect.top + rect.height / 2;
        }

        cursorX += (targetX - cursorX) * 0.15;
        cursorY += (targetY - cursorY) * 0.15;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    /* =========================
       Cursor States
    ========================= */

    const textTargets = document.querySelectorAll(
        'p, h1, h2, h3, h4, h5, h6, span, li'
    );

    const actionTargets = document.querySelectorAll(
        'a, button'
    );

    // Text → ring cursor
    textTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor--text');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor--text');
        });
    });

    // Buttons / links → filled cursor + magnetic
    actionTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            isHovering = true;
            hoverTarget = el;
            cursor.classList.remove('cursor--text');
            cursor.classList.add('cursor--action');
        });

        el.addEventListener('mouseleave', () => {
            isHovering = false;
            hoverTarget = null;
            cursor.classList.remove('cursor--action');
        });
    });

    /* =========================
       Cursor Visibility
    ========================= */

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

});
