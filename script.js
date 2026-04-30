// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const slideElements = document.querySelectorAll('.slide-down');
const scrollTopBtn = document.getElementById('scrollTop');
const contactForm = document.getElementById('contactForm');
const skillProgress = document.querySelectorAll('.progress');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect & active link
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// Slide down animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

slideElements.forEach(el => observer.observe(el));

// Skill progress bars
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target;
            const width = progress.getAttribute('data-width');
            progress.style.width = width;
        }
    });
}, { threshold: 0.5 });

skillProgress.forEach(progress => skillObserver.observe(progress));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Scroll top
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
        btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
        
        contactForm.reset();
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.background = '';
        }, 2500);
    }, 2000);
});

// Hero mouse parallax
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    
    hero.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

document.addEventListener('mouseleave', () => {
    document.querySelector('.hero').style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
});

// Typing effect
function typeWriter(element, text, speed = 80) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    const fullText = heroTitle.textContent;
    setTimeout(() => typeWriter(heroTitle, fullText), 800);
});

// Card hover effects
document.querySelectorAll('.hobby-card, .contact-item, .info-item').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
