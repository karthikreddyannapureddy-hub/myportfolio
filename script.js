/* 
   Interactive Portfolio Elements
   By Karthik Reddy
   
   A collection of handcrafted animations and interactions
   that bring my portfolio to life while keeping it smooth
   and accessible.
*/

document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
});

function initializePortfolio() {
    // Core Functionality
    setupNavigation();
    setupAnimations();
    setupProjectCards();
    setupContactForm();
    
    // Enhanced Features
    setupTypewriter();
    setupSkillBars();
    setupScrollProgress();
}

// Smooth Navigation System
function setupNavigation() {
    const nav = {
        menu: document.querySelector('.nav-links'),
        button: document.querySelector('.menu-btn'),
        links: document.querySelectorAll('nav a')
    };

    // Mobile Menu Toggle
    nav.button?.addEventListener('click', () => {
        nav.button.classList.toggle('active');
        nav.menu.classList.toggle('active');
        document.body.style.overflow = nav.menu.classList.contains('active') ? 'hidden' : '';
    });

    // Enhanced Smooth Scrolling
    nav.links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            
            if (target) {
                // Close Mobile Menu
                nav.menu.classList.remove('active');
                nav.button.classList.remove('active');
                document.body.style.overflow = '';

                // Smooth Scroll with Offset
                const headerOffset = 60;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jump
                history.pushState(null, '', link.getAttribute('href'));
            }
        });
    });
}

// Scroll-based Animations
function setupAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.2 }
    );

    // Observe elements with animation classes
    document.querySelectorAll('.fade-up, .pop').forEach(el => observer.observe(el));
}

// Interactive Project Cards
function setupProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });
}

// Contact Form with Feedback
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = form.querySelector('button');
        
        try {
            button.innerHTML = '✉️ Sending...';
            button.disabled = true;

            // Simulate sending (replace with actual API call)
            await new Promise(r => setTimeout(r, 1000));
            
            button.innerHTML = '✅ Message Sent!';
            form.reset();
            
            setTimeout(() => {
                button.innerHTML = 'Send Message';
                button.disabled = false;
            }, 2000);
        } catch (err) {
            button.innerHTML = '❌ Please Try Again';
            button.disabled = false;
        }
    });
}

// Typewriter Effect
function setupTypewriter() {
    const elements = document.querySelectorAll('.animate-text');
    
    elements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, Math.random() * 100 + 50);
            }
        }

        // Start typing when visible
        new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                type();
                observer.disconnect();
            }
        }).observe(element);
    });
}

// Animated Skill Bars
function setupSkillBars() {
    const bars = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    bar.style.width = bar.dataset.level || '0%';
                }
            });
        },
        { threshold: 0.3 }
    );

    bars.forEach(bar => observer.observe(bar));
}

// Scroll Progress Indicator
function setupScrollProgress() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-progress';
    document.body.appendChild(indicator);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        indicator.style.width = scrolled + '%';
    });
});