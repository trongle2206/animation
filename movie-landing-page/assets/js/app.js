// DOM Elements
const body = document.body;
const modeToggle = document.getElementById('modeToggle');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const sections = document.querySelectorAll('section');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const scrollRevealElements = document.querySelectorAll('.scroll-reveal, .about-content');

// Dark/Light Mode Toggle
function initDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        body.classList.add('dark-mode');
        modeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Chế độ sáng</span>';
    } else {
        body.classList.remove('dark-mode');
        modeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Chế độ tối</span>';
    }
    
    modeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        
        if (isDark) {
            modeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Chế độ sáng</span>';
        } else {
            modeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Chế độ tối</span>';
        }
    });
}

// Navigation Scroll Spy
function initScrollSpy() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Mobile Navigation Toggle
function initMobileNav() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Custom Cursor
function initCustomCursor() {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    // Add active class on click
    document.addEventListener('mousedown', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });

    // Add active class on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .movie-card, .trending-card, .coming-soon-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
        });
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollRevealElements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize Hero Fade-in Animation
function initHeroAnimation() {
    // This is handled by CSS animations, but we can add additional JS if needed
    const heroHeading = document.querySelector('.hero h1');
    const heroParagraph = document.querySelector('.hero p');
    
    // Ensure elements are visible (CSS handles the animation)
    heroHeading.style.opacity = '1';
    heroParagraph.style.opacity = '1';
}

// Video Popup Functionality - SIMPLIFIED VERSION
function initVideoPopup() {
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('trailerVideo');
    const closeButton = document.querySelector('.video-modal-close');
    const overlay = document.querySelector('.video-modal-overlay');
    const watchButtons = document.querySelectorAll('.btn-watch');
    
    // Open video modal
    function openVideoModal() {
        // Show modal
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Play video immediately
        videoPlayer.play().catch(e => {
            console.log('Autoplay prevented:', e);
            // On some browsers, autoplay might be blocked
            // User will need to click the play button manually
        });
    }
    
    // Close video modal
    function closeVideoModal() {
        videoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }
    
    // Add event listeners to all watch buttons
    watchButtons.forEach((button) => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent any default behavior
            openVideoModal();
        });
    });
    
    // Close modal events
    closeButton.addEventListener('click', closeVideoModal);
    overlay.addEventListener('click', closeVideoModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initScrollSpy();
    initMobileNav();
    initCustomCursor();
    initScrollReveal();
    initSmoothScroll();
    initHeroAnimation();
    initVideoPopup(); // Initialize video popup functionality
    
    // Add active class to current section on page load
    const scrollPosition = window.scrollY;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});