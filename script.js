// FAIR GROUP - JavaScript functionality

(function(){
    function init() {
        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolled
        if (scrollTop > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            // Добавляем класс уменьшённой шторки
            header.classList.add('header--small');
        } else {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            header.classList.remove('header--small');
        }
        
        lastScrollTop = scrollTop;
    });

    // Fix placeholder image URLs that might be malformed in some browsers
    // (например: "FFFFFF?text=..." без полного домена или с некорректной кодировкой)
    const fixPlaceholderSrc = (img) => {
        try {
            if (!img || !img.src) return;
            const src = img.getAttribute('src');
            if (!src) return;

            // Если src содержит 'FFFFFF?text=' или выглядит как относительный путь без протокола,
            // заменим на корректный URL через via.placeholder.com
            if (/FFFFFF\?text=/.test(src) && !/^https?:\/\//i.test(src)) {
                // Заменим на безопасный абсолютный url, сохраняя размеры/цвета/текст, если возможно
                const parts = src.split('/');
                // Попробуем извлечь размеры и текст (если есть)
                const match = src.match(/(\d+x\d+)\/([A-Fa-f0-9]{6})\/FFFFFF\?text=(.*)$/);
                if (match) {
                    const size = match[1];
                    const color = match[2];
                    const text = encodeURIComponent(match[3]);
                    img.src = `https://via.placeholder.com/${size}/${color}/FFFFFF?text=${text}`;
                } else {
                    // fallback — используем 400x500 с основным цветом
                    const filenameText = encodeURIComponent(img.alt || 'Изображение');
                    img.src = `https://via.placeholder.com/400x500/F26A1B/FFFFFF?text=${filenameText}`;
                }
            }
        } catch (e) {
            // ignore
            console.warn('Ошибка при исправлении src изображения', e);
        }
    };

    document.querySelectorAll('img').forEach(img => fixPlaceholderSrc(img));

    // Contact form handling
    const contactForm = document.getElementById('contact-form-element');
    const successMessage = document.getElementById('success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const comment = formData.get('comment');

            // Basic validation
            if (!name.trim() || !phone.trim()) {
                alert('Пожалуйста, заполните обязательные поля: Имя и Телефон');
                return;
            }

            // Phone validation (basic)
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
                alert('Пожалуйста, введите корректный номер телефона');
                return;
            }

            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Отправляется...';
            submitButton.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Show success message
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    successMessage.style.display = 'none';
                }, 5000);
                
            }, 1500);
        });
    }

    // Gallery image lazy loading
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.animationDelay = '0.1s';
                    observer.unobserve(img);
                }
            });
        });

        galleryImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Animate process steps on scroll
    const processSteps = document.querySelectorAll('.process-step');
    
    if ('IntersectionObserver' in window) {
        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });

        processSteps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(30px)';
            step.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            stepObserver.observe(step);
        });
    }

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            console.log('mobile menu toggle clicked');
            mobileMenu.classList.toggle('mobile-menu-open');
            mobileMenuToggle.innerHTML = mobileMenu.classList.contains('mobile-menu-open') ? '✕' : '☰';
        });
        
        // Close mobile menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('mobile-menu-open');
                mobileMenuToggle.innerHTML = '☰';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('mobile-menu-open');
                mobileMenuToggle.innerHTML = '☰';
            }
        });
    }

    // Add CSS for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .header nav ul:last-child {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                box-shadow: var(--shadow);
                padding: 1rem;
                z-index: 1000;
            }
            
            .header nav ul:last-child.mobile-menu-open {
                display: flex;
            }
            
            .mobile-menu-toggle {
                display: block !important;
            }
        }
        
        @media (min-width: 769px) {
            .mobile-menu-toggle {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);

    // Add loading animation for page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            sectionObserver.observe(section);
        });
    }

    // Add CSS for section animations
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(animationStyle);

    // Add click tracking for analytics (placeholder)
    const trackClick = (element, event) => {
        // Placeholder for analytics tracking
        console.log(`Clicked: ${event} on ${element}`);
    };

    // Track button clicks
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', () => {
            trackClick(button.textContent, 'button_click');
        });
    });

    // Track navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            trackClick(link.textContent, 'navigation_click');
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            const mobileMenu = document.querySelector('.mobile-menu-open');
            if (mobileMenu) {
                mobileMenu.classList.remove('mobile-menu-open');
                const toggleButton = document.querySelector('.mobile-menu-toggle');
                if (toggleButton) {
                    toggleButton.innerHTML = '☰';
                }
            }
        }
    });

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="tel"], input[type="email"], select'
    );

    focusableElements.forEach((element, index) => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                // Handle tab navigation within sections
                const currentSection = element.closest('section');
                const sectionFocusables = currentSection ? 
                    currentSection.querySelectorAll('a[href], button, textarea, input, select') : 
                    focusableElements;
                
                if (e.shiftKey && index === 0) {
                    e.preventDefault();
                    sectionFocusables[sectionFocusables.length - 1].focus();
                } else if (!e.shiftKey && index === sectionFocusables.length - 1) {
                    e.preventDefault();
                    sectionFocusables[0].focus();
                }
            }
        });
    });

    console.log('FAIR GROUP website initialized successfully!');
    }

    // Запуск init: если документ ещё не готов — дождаться DOMContentLoaded, иначе запустить сразу
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
