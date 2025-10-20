// FAIR GROUP - Contact page functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced contact form handling
    const contactForm = document.getElementById('contact-form-element');
    const successMessage = document.getElementById('success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            const privacy = formData.get('privacy');

            // Enhanced validation
            if (!validateForm(name, phone, message, privacy)) {
                return;
            }

            // Simulate form submission with loading state
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

    // Form validation function
    function validateForm(name, phone, message, privacy) {
        let isValid = true;
        
        // Clear previous errors
        clearFormErrors();
        
        // Name validation
        if (!name.trim()) {
            showFieldError('name', 'Пожалуйста, введите ваше имя');
            isValid = false;
        }
        
        // Phone validation
        if (!phone.trim()) {
            showFieldError('phone', 'Пожалуйста, введите номер телефона');
            isValid = false;
        } else {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
                showFieldError('phone', 'Пожалуйста, введите корректный номер телефона');
                isValid = false;
            }
        }
        
        // Message validation
        if (!message.trim()) {
            showFieldError('message', 'Пожалуйста, введите сообщение');
            isValid = false;
        } else if (message.trim().length < 10) {
            showFieldError('message', 'Сообщение должно содержать минимум 10 символов');
            isValid = false;
        }
        
        // Privacy agreement validation
        if (!privacy) {
            showFieldError('privacy', 'Необходимо согласие с обработкой персональных данных');
            isValid = false;
        }
        
        return isValid;
    }

    // Show field error
    function showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        if (field) {
            field.style.borderColor = '#dc3545';
            
            // Remove existing error message
            const existingError = field.parentNode.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
            
            // Add new error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = message;
            errorDiv.style.cssText = `
                color: #dc3545;
                font-size: 0.875rem;
                margin-top: 0.25rem;
            `;
            field.parentNode.appendChild(errorDiv);
        }
    }

    // Clear form errors
    function clearFormErrors() {
        const fields = contactForm.querySelectorAll('input, textarea, select');
        fields.forEach(field => {
            field.style.borderColor = '#E9ECEF';
            const error = field.parentNode.querySelector('.field-error');
            if (error) {
                error.remove();
            }
        });
    }

    // Real-time field validation
    const formFields = contactForm.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            // Clear error styling on input
            this.style.borderColor = '#E9ECEF';
            const error = this.parentNode.querySelector('.field-error');
            if (error) {
                error.remove();
            }
        });
    });

    // Validate individual field
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        switch (fieldName) {
            case 'name':
                if (!value) {
                    showFieldError(fieldName, 'Пожалуйста, введите ваше имя');
                }
                break;
            case 'phone':
                if (!value) {
                    showFieldError(fieldName, 'Пожалуйста, введите номер телефона');
                } else {
                    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                    if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                        showFieldError(fieldName, 'Пожалуйста, введите корректный номер телефона');
                    }
                }
                break;
            case 'message':
                if (!value) {
                    showFieldError(fieldName, 'Пожалуйста, введите сообщение');
                } else if (value.length < 10) {
                    showFieldError(fieldName, 'Сообщение должно содержать минимум 10 символов');
                }
                break;
        }
    }

    // Map functionality (placeholder)
    function openMap() {
        // In real implementation, this would open Google Maps or Yandex Maps
        alert('Открываем карты...\nАдрес: г. Москва, ул. Примерная, д. 1');
    }

    function getDirections() {
        // In real implementation, this would open navigation
        alert('Построение маршрута...\nОт вашего местоположения до: г. Москва, ул. Примерная, д. 1');
    }

    // Make functions globally available
    window.openMap = openMap;
    window.getDirections = getDirections;

    // Add contact card hover effects
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(242, 106, 27, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add social card animations
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });

    // Add FAQ hover effects
    const faqItems = document.querySelectorAll('.contact-faq .faq-item');
    faqItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.backgroundColor = 'rgba(242, 106, 27, 0.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.backgroundColor = 'transparent';
        });
    });

    // Add click-to-call functionality
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track phone clicks for analytics
            console.log('Phone number clicked:', this.textContent);
        });
    });

    // Add click-to-email functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track email clicks for analytics
            console.log('Email address clicked:', this.textContent);
        });
    });

    // Add form field focus effects
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color)';
            this.style.boxShadow = '0 0 0 3px rgba(242, 106, 27, 0.1)';
        });
        
        field.addEventListener('blur', function() {
            this.style.borderColor = '#E9ECEF';
            this.style.boxShadow = 'none';
        });
    });

    // Add character counter for textarea
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.875rem;
            color: var(--gray-medium);
            margin-top: 0.25rem;
        `;
        messageTextarea.parentNode.appendChild(counter);
        
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            const maxLength = 1000;
            counter.textContent = `${length}/${maxLength} символов`;
            
            if (length > maxLength) {
                counter.style.color = '#dc3545';
            } else if (length > maxLength * 0.9) {
                counter.style.color = '#ffc107';
            } else {
                counter.style.color = 'var(--gray-medium)';
            }
        });
    }

    // Add auto-save functionality (localStorage)
    const autoSaveForm = () => {
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            if (key !== 'privacy') { // Don't save privacy checkbox
                data[key] = value;
            }
        });
        localStorage.setItem('contactFormData', JSON.stringify(data));
    };

    const restoreFormData = () => {
        const savedData = localStorage.getItem('contactFormData');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                Object.keys(data).forEach(key => {
                    const field = document.getElementById(key);
                    if (field && field.type !== 'checkbox') {
                        field.value = data[key];
                    }
                });
            } catch (e) {
                console.log('Could not restore form data');
            }
        }
    };

    // Auto-save on input
    formFields.forEach(field => {
        field.addEventListener('input', autoSaveForm);
    });

    // Restore data on page load
    restoreFormData();

    // Clear saved data on successful submit
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            localStorage.removeItem('contactFormData');
        });
    }

    // Add smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
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

    console.log('Contact page functionality initialized successfully!');
});
