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
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
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

    navMenu.addEventListener('click', (e) => {
    if (e.target === navMenu) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
    });


    /* =========================
       Ultra Smooth Magnetic Cursor
    ========================= */

    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cursor = document.querySelector('.cursor');
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let velocityX = 0, velocityY = 0;

    let isHovering = false;
    let hoverTarget = null;

    // 🔧 Tuning values (these control smoothness)
    const ATTRACTION = 0.08;   // lower = smoother
    const MAGNETIC_BOOST = 0.18; // extra force on buttons
    const FRICTION = 0.78;     // closer to 1 = smoother
    const MAX_DISTANCE = 180;  // magnetic radius

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        let targetX = mouseX;
        let targetY = mouseY;
        let strength = ATTRACTION;

        if (isHovering && hoverTarget) {
            const rect = hoverTarget.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = centerX - cursorX;
            const dy = centerY - cursorY;
            const distance = Math.hypot(dx, dy);

            const force = Math.min(distance / MAX_DISTANCE, 1);
            strength += MAGNETIC_BOOST * force;

            targetX = centerX;
            targetY = centerY;
        }

        velocityX += (targetX - cursorX) * strength;
        velocityY += (targetY - cursorY) * strength;

        velocityX *= FRICTION;
        velocityY *= FRICTION;

        cursorX += velocityX;
        cursorY += velocityY;

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

    textTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor--text');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor--text');
        });
    });

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

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

});
