// ═══════════════════════════════════════════
// NAVBAR — scroll effect + hamburger
// ═══════════════════════════════════════════
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

// Fecha menu ao clicar em link
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ═══════════════════════════════════════════
// ACTIVE LINK — highlight da seção atual
// ═══════════════════════════════════════════
const sections = document.querySelectorAll('section[id]');
const allLinks = document.querySelectorAll('.nav-link');

const observerNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            allLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.5 });

sections.forEach(s => observerNav.observe(s));

// ═══════════════════════════════════════════
// PARTICLES — geração dinâmica
// ═══════════════════════════════════════════
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = window.innerWidth < 768 ? 18 : 35;

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = `${Math.random() * 100}%`;
        p.style.width = `${Math.random() * 2 + 1}px`;
        p.style.height = p.style.width;
        p.style.opacity = Math.random() * 0.6 + 0.1;

        const dur = Math.random() * 12 + 8;
        const del = Math.random() * 10;
        p.style.animationDuration = `${dur}s`;
        p.style.animationDelay = `${del}s`;

        // Cores variadas: roxo ou âmbar
        p.style.background = Math.random() > 0.7
            ? 'rgba(245,158,11,0.8)'
            : 'rgba(157,92,246,0.8)';

        container.appendChild(p);
    }
}
createParticles();

// ═══════════════════════════════════════════
// SCROLL ANIMATIONS — Intersection Observer
// ═══════════════════════════════════════════
const animObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100);
        }
    });
}, { threshold: 0.12 });

// Aplica a elementos relevantes
document.querySelectorAll(
    '.stat-card, .game-card, .about-text p, .contact-info, .contact-form'
).forEach(el => {
    el.classList.add('animate-in');
    animObserver.observe(el);
});

// ═══════════════════════════════════════════
// FORMULÁRIO — abre mailto
// ═══════════════════════════════════════════
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = encodeURIComponent(form.name.value.trim());
        const message = encodeURIComponent(form.message.value.trim());
        const subject = encodeURIComponent(`Contato via site — ${form.name.value.trim()}`);
        const body = encodeURIComponent(
            `Olá, Shivary!\n\nMeu nome é ${form.name.value.trim()}.\n\n${form.message.value.trim()}\n\nE-mail de resposta: ${form.email.value.trim()}`
        );
        window.location.href = `mailto:contact@shivarygamestudio.com?subject=${subject}&body=${body}`;
    });
}

// ═══════════════════════════════════════════
// FOOTER — ano atual
// ═══════════════════════════════════════════
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ═══════════════════════════════════════════
// SMOOTH SCROLL — garante compatibilidade
// ═══════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});