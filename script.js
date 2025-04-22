// Mobile Menu Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav.classList.contains('nav-active') && 
        !nav.contains(e.target) && 
        !burger.contains(e.target)) {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Here you would typically send the form data to a server
    // For now, we'll just show an alert
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    contactForm.reset();
});

// Add animation to elements when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Photo Gallery
document.addEventListener('DOMContentLoaded', function() {
    const photoContainer = document.querySelector('.photo-container');
    if (!photoContainer) return; // Only run on pages with photo gallery

    const photos = photoContainer.querySelectorAll('img');
    const prevBtn = document.querySelector('.prev-photo');
    const nextBtn = document.querySelector('.next-photo');
    const dotsContainer = document.querySelector('.photo-dots');

    let currentPhotoIndex = 0;

    // Create dots
    photos.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('photo-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showPhoto(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.photo-dot');

    function showPhoto(index) {
        photos.forEach(photo => photo.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        photos[index].classList.add('active');
        dots[index].classList.add('active');
        currentPhotoIndex = index;
    }

    function nextPhoto() {
        const nextIndex = (currentPhotoIndex + 1) % photos.length;
        showPhoto(nextIndex);
    }

    function prevPhoto() {
        const prevIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        showPhoto(prevIndex);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextPhoto);
    prevBtn.addEventListener('click', prevPhoto);

    // Auto advance every 5 seconds
    let autoAdvance = setInterval(nextPhoto, 5000);

    // Pause auto-advance on hover
    photoContainer.addEventListener('mouseenter', () => {
        clearInterval(autoAdvance);
    });

    photoContainer.addEventListener('mouseleave', () => {
        autoAdvance = setInterval(nextPhoto, 5000);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextPhoto();
        if (e.key === 'ArrowLeft') prevPhoto();
    });
}); 