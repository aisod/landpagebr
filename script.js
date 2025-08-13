// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .benefit-item, .testimonial-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Contact Form Handling
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Create WhatsApp message in Portuguese
    const whatsappMessage = `Olá! Gostaria de solicitar um orçamento para transfer na França.
    
*Nome:* ${name}
*Email:* ${email}
*Telefone:* ${phone || 'Não informado'}
*Serviço:* ${service}
*Detalhes da viagem:* ${message || 'Não informado'}
    
Aguardo seu retorno. Muito obrigado!`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/5511945669481?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show success message
    showNotification('Redirecionando para WhatsApp...', 'success');
    
    // Reset form
    this.reset();
});

// Notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Add notification styles to document
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .notification-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(notificationStyles);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter animation for stats (if you want to add later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Service selection highlighting
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        // Remove previous selections
        document.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
        
        // Add selection to clicked card
        card.classList.add('selected');
        
        // Scroll to contact form
        document.querySelector('#contato').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Pre-select service in form
        const serviceName = card.querySelector('h3').textContent;
        const serviceSelect = document.querySelector('#service');
        
        // Map service names to form options
        const serviceMap = {
            'Transfer Aeroporto': 'transfer-aeroporto',
            'Transfer Hotel': 'transfer-hotel',
            'City Tours': 'city-tour',
            'Excursões': 'excursao'
        };
        
        if (serviceMap[serviceName]) {
            serviceSelect.value = serviceMap[serviceName];
        }
    });
});

// Add selected service card styles
const serviceStyles = document.createElement('style');
serviceStyles.textContent = `
    .service-card.selected {
        border: 2px solid #0066cc;
        background: linear-gradient(135deg, #f8faff, #ffffff);
        transform: translateY(-10px);
    }
    .service-card {
        cursor: pointer;
    }
`;
document.head.appendChild(serviceStyles);

// Typing effect for hero title (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on load (uncomment if desired)
// document.addEventListener('DOMContentLoaded', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         typeWriter(heroTitle, originalText, 80);
//     }
// });

// Copy to clipboard functionality for contact info
document.querySelectorAll('.contact-method').forEach(method => {
    method.addEventListener('click', () => {
        const text = method.querySelector('p').textContent;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification(`${text} copiado para a área de transferência!`, 'success');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification(`${text} copiado para a área de transferência!`, 'success');
        }
    });
});

// Add cursor pointer to contact methods
const contactMethodStyles = document.createElement('style');
contactMethodStyles.textContent = `
    .contact-method {
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 10px;
        border-radius: 8px;
    }
    .contact-method:hover {
        background: rgba(255, 255, 255, 0.1);
    }
`;
document.head.appendChild(contactMethodStyles);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.removeEventListener('scroll', () => {}); // Remove previous listener
window.addEventListener('scroll', debouncedScrollHandler);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        './IMG/paris1.jpg',
        './IMG/paris2.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize AOS and preloading
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    preloadImages();

    // Auto-scroll benefits showcase in an infinite loop
    const showcase = document.querySelector('.benefits-showcase');
    if (showcase) {
        // Duplicate cards to enable seamless looping
        const cards = Array.from(showcase.children);
        const cloneFragment = document.createDocumentFragment();
        cards.forEach(card => cloneFragment.appendChild(card.cloneNode(true)));
        showcase.appendChild(cloneFragment);

        // Disable snap during auto-scroll for smoothness
        showcase.style.scrollSnapType = 'none';

        let isPaused = false;
        let scrollSpeedPxPerFrame = 0.6; // adjust speed

        // Pause on hover/touch
        showcase.addEventListener('mouseenter', () => (isPaused = true));
        showcase.addEventListener('mouseleave', () => (isPaused = false));
        showcase.addEventListener('touchstart', () => (isPaused = true), { passive: true });
        showcase.addEventListener('touchend', () => (isPaused = false));

        // Pause auto-scroll when the section is not visible
        const visibilityObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isPaused = !entry.isIntersecting;
            });
        }, { threshold: 0.1 });
        visibilityObserver.observe(showcase);

        function loopScroll() {
            if (!isPaused) {
                showcase.scrollLeft += scrollSpeedPxPerFrame;
                const halfWidth = showcase.scrollWidth / 2;
                if (showcase.scrollLeft >= halfWidth) {
                    showcase.scrollLeft = 0;
                }
            }
            requestAnimationFrame(loopScroll);
        }
        requestAnimationFrame(loopScroll);
    }
});

console.log('Ontourist Landing Page - Script loaded successfully!');
