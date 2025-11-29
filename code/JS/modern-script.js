// ========================================
// MODERN EBOOK LANDING PAGE - JAVASCRIPT
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // NAVIGATION
    // ========================================
    
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky navbar on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // ========================================
    // SMOOTH SCROLLING
    // ========================================
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ========================================
    
    const sections = document.querySelectorAll('.section, .hero');
    
    function highlightNavigation() {
        let current = '';
        const scrollPosition = window.pageYOffset + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Call on page load
    
    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animations
    const animatedElements = document.querySelectorAll('.feature-card, .chapter-card, .testimonial-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // ========================================
    // FORM HANDLING
    // ========================================
    
    const downloadForm = document.querySelector('.download-form');
    
    if (downloadForm) {
        downloadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formInputs = this.querySelectorAll('.form-input');
            const submitButton = this.querySelector('.btn-submit');
            const btnText = submitButton.querySelector('.btn-text');
            const btnLoading = submitButton.querySelector('.btn-loading');
            const btnIcon = submitButton.querySelector('.btn-icon');
            let isValid = true;
            
            // Simple validation
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                    
                    // Remove error on input
                    input.addEventListener('input', function() {
                        this.style.borderColor = 'transparent';
                    }, { once: true });
                } else if (input.type === 'email' && !isValidEmail(input.value)) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                    showNotification('Please enter a valid email address.', 'error');
                    
                    input.addEventListener('input', function() {
                        this.style.borderColor = 'transparent';
                    }, { once: true });
                } else {
                    input.style.borderColor = 'transparent';
                }
            });
            
            if (isValid) {
                // Show loading state
                submitButton.disabled = true;
                btnText.style.display = 'none';
                btnIcon.style.display = 'none';
                btnLoading.style.display = 'flex';
                
                // Simulate API call
                setTimeout(() => {
                    // Hide loading state
                    submitButton.disabled = false;
                    btnText.style.display = 'block';
                    btnIcon.style.display = 'block';
                    btnLoading.style.display = 'none';
                    
                    // Show success message
                    showNotification('Success! Check your email for the download link.', 'success');
                    
                    // Reset form
                    this.reset();
                }, 2000);
            } else {
                if (formInputs[0].value.trim() && formInputs[1].value.trim()) {
                    // Only show this if both fields have values but email is invalid
                    // Already shown above
                } else {
                    showNotification('Please fill in all fields.', 'error');
                }
            }
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ========================================
    // NOTIFICATION SYSTEM
    // ========================================
    
    function showNotification(message, type = 'success') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    ${type === 'success' 
                        ? '<path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="currentColor"/>'
                        : '<path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="currentColor"/>'
                    }
                </svg>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
    
    // ========================================
    // PARALLAX EFFECT FOR FLOATING ICONS
    // ========================================
    
    const floatingIcons = document.querySelectorAll('.float-icon');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        floatingIcons.forEach((icon, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            icon.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // ========================================
    // GRADIENT ORB MOUSE MOVEMENT
    // ========================================
    
    const gradientOrbs = document.querySelectorAll('.gradient-orb');
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        gradientOrbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // ========================================
    // STATS COUNTER ANIMATION
    // ========================================
    
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(current));
            }
        }, 16);
    }
    
    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K+';
        }
        return num.toString();
    }
    
    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach((stat, index) => {
                        const values = [15000, 4.9, 250];
                        setTimeout(() => {
                            if (index === 1) {
                                stat.textContent = '4.9/5';
                            } else {
                                animateCounter(stat, values[index]);
                            }
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // ========================================
    // BOOK 3D TILT EFFECT
    // ========================================
    
    const book3d = document.querySelector('.book-3d');
    
    if (book3d) {
        book3d.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            const bookCover = this.querySelector('.book-cover');
            bookCover.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        book3d.addEventListener('mouseleave', function() {
            const bookCover = this.querySelector('.book-cover');
            bookCover.style.transform = 'rotateX(0) rotateY(-15deg)';
        });
    }
    
    // ========================================
    // LAZY LOADING IMAGES
    // ========================================
    
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ========================================
    // PERFORMANCE OPTIMIZATION
    // ========================================
    
    // Debounce function for scroll events
    function debounce(func, wait = 20) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
    
    // Apply debounce to scroll-heavy operations
    window.addEventListener('scroll', debounce(highlightNavigation));
    
    // ========================================
    // ACCESSIBILITY ENHANCEMENTS
    // ========================================
    
    // Add keyboard navigation for mobile menu
    if (mobileToggle) {
        mobileToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Focus management for modal/menu
    navLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                mobileToggle.click();
                mobileToggle.focus();
            }
        });
    });
    
    // ========================================
    // CONSOLE EASTER EGG
    // ========================================
    
    console.log('%c🎨 Modern Ebook Landing Page', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with modern web standards and best practices', 'color: #475569; font-size: 14px;');
    console.log('%cInterested in the code? Check out the repository!', 'color: #10b981; font-size: 12px;');
    
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Get element position
function getElementOffset(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Export functions for external use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToTop,
        getElementOffset,
        isInViewport
    };
}
