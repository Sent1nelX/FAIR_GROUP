// FAIR GROUP - Process page functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if ('IntersectionObserver' in window) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 200);
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            timelineObserver.observe(item);
        });
    }

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        // Initialize FAQ items
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.maxHeight !== '0px';
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherToggle = otherItem.querySelector('.faq-toggle');
                
                if (otherItem !== item) {
                    otherAnswer.style.maxHeight = '0';
                    otherToggle.textContent = '+';
                }
            });
            
            // Toggle current item
            if (isOpen) {
                answer.style.maxHeight = '0';
                toggle.textContent = '+';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.textContent = '−';
            }
        });
    });

    // Add hover effects for timeline items
    timelineItems.forEach(item => {
        const number = item.querySelector('.timeline-number');
        
        item.addEventListener('mouseenter', () => {
            number.style.transform = 'scale(1.1)';
            number.style.boxShadow = '0 8px 25px rgba(242, 106, 27, 0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            number.style.transform = 'scale(1)';
            number.style.boxShadow = '0 4px 15px rgba(242, 106, 27, 0.2)';
        });
    });

    // Add CSS for timeline styles
    const timelineStyles = `
        <style>
            .process-timeline {
                padding: 4rem 0;
                background-color: var(--white);
            }
            
            .timeline {
                position: relative;
                max-width: 800px;
                margin: 0 auto;
            }
            
            .timeline::before {
                content: '';
                position: absolute;
                left: 30px;
                top: 0;
                bottom: 0;
                width: 2px;
                background: linear-gradient(to bottom, var(--primary-color), var(--primary-dark));
            }
            
            .timeline-item {
                position: relative;
                margin-bottom: 3rem;
                padding-left: 80px;
            }
            
            .timeline-number {
                position: absolute;
                left: 0;
                top: 0;
                width: 60px;
                height: 60px;
                background: var(--primary-color);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                font-weight: 700;
                box-shadow: 0 4px 15px rgba(242, 106, 27, 0.2);
                transition: all 0.3s ease;
                z-index: 2;
            }
            
            .timeline-content {
                background: var(--gray-light);
                padding: 2rem;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow);
            }
            
            .timeline-content h3 {
                color: var(--primary-color);
                margin-bottom: 1rem;
            }
            
            .timeline-details {
                margin-top: 1.5rem;
                padding-top: 1.5rem;
                border-top: 1px solid #E9ECEF;
            }
            
            .timeline-details ul {
                margin-top: 0.5rem;
                padding-left: 1.5rem;
            }
            
            .timeline-details li {
                margin-bottom: 0.5rem;
                color: var(--gray-medium);
            }
            
            .process-benefits {
                padding: 4rem 0;
                background-color: var(--gray-light);
            }
            
            .benefits-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 2rem;
            }
            
            .benefit-item {
                background: white;
                padding: 2rem;
                border-radius: var(--border-radius);
                text-align: center;
                box-shadow: var(--shadow);
                transition: transform 0.3s ease;
            }
            
            .benefit-item:hover {
                transform: translateY(-5px);
            }
            
            .benefit-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
            }
            
            .benefit-item h3 {
                color: var(--primary-color);
                margin-bottom: 1rem;
            }
            
            .timeline-info {
                padding: 4rem 0;
                background-color: var(--white);
            }
            
            .info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
            }
            
            .info-card {
                background: var(--gray-light);
                padding: 2rem;
                border-radius: var(--border-radius);
                text-align: center;
                box-shadow: var(--shadow);
            }
            
            .info-card h3 {
                color: var(--primary-color);
                margin-bottom: 1.5rem;
            }
            
            .timeline-stats {
                display: flex;
                justify-content: space-around;
                margin-bottom: 1rem;
            }
            
            .stat {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .stat-value {
                font-size: 2rem;
                font-weight: 700;
                color: var(--primary-color);
            }
            
            .stat-label {
                font-size: 0.9rem;
                color: var(--gray-medium);
            }
            
            .min-order {
                display: flex;
                align-items: baseline;
                justify-content: center;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            
            .order-value {
                font-size: 3rem;
                font-weight: 700;
                color: var(--primary-color);
            }
            
            .order-label {
                font-size: 1.2rem;
                color: var(--gray-medium);
            }
            
            .delivery-info p {
                margin-bottom: 0.5rem;
                text-align: left;
            }
            
            .faq {
                padding: 4rem 0;
                background-color: var(--gray-light);
            }
            
            .faq-list {
                max-width: 800px;
                margin: 0 auto;
            }
            
            .faq-item {
                background: white;
                margin-bottom: 1rem;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow);
                overflow: hidden;
            }
            
            .faq-question {
                padding: 1.5rem;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: background-color 0.3s ease;
            }
            
            .faq-question:hover {
                background-color: var(--gray-light);
            }
            
            .faq-question h4 {
                margin: 0;
                color: var(--gray-dark);
            }
            
            .faq-toggle {
                font-size: 1.5rem;
                color: var(--primary-color);
                font-weight: bold;
                transition: transform 0.3s ease;
            }
            
            .faq-answer {
                padding: 0 1.5rem;
            }
            
            .faq-answer p {
                margin: 0 0 1.5rem 0;
                color: var(--gray-medium);
                line-height: 1.6;
            }
            
            @media (max-width: 768px) {
                .timeline::before {
                    left: 20px;
                }
                
                .timeline-item {
                    padding-left: 60px;
                }
                
                .timeline-number {
                    width: 40px;
                    height: 40px;
                    font-size: 1.2rem;
                }
                
                .timeline-content {
                    padding: 1.5rem;
                }
                
                .timeline-stats {
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .faq-question {
                    padding: 1rem;
                }
                
                .faq-answer {
                    padding: 0 1rem;
                }
            }
        </style>
    `;
    
    // Add timeline styles
    if (!document.querySelector('#timeline-styles')) {
        const styleElement = document.createElement('div');
        styleElement.id = 'timeline-styles';
        styleElement.innerHTML = timelineStyles;
        document.head.appendChild(styleElement);
    }

    // Add progress indicator
    const addProgressIndicator = () => {
        const progressHTML = `
            <div class="progress-indicator">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <div class="progress-text">Прогресс изучения: <span id="progress-percent">0</span>%</div>
            </div>
        `;
        
        const progressStyles = `
            <style>
                .progress-indicator {
                    position: fixed;
                    top: 80px;
                    right: 20px;
                    background: white;
                    padding: 1rem;
                    border-radius: var(--border-radius);
                    box-shadow: var(--shadow);
                    z-index: 1000;
                    min-width: 200px;
                }
                
                .progress-bar {
                    width: 100%;
                    height: 8px;
                    background-color: #E9ECEF;
                    border-radius: 4px;
                    overflow: hidden;
                    margin-bottom: 0.5rem;
                }
                
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
                    width: 0%;
                    transition: width 0.3s ease;
                }
                
                .progress-text {
                    font-size: 0.9rem;
                    color: var(--gray-medium);
                    text-align: center;
                }
                
                @media (max-width: 768px) {
                    .progress-indicator {
                        position: relative;
                        top: auto;
                        right: auto;
                        margin: 1rem;
                        width: calc(100% - 2rem);
                    }
                }
            </style>
        `;
        
        const progressContainer = document.createElement('div');
        progressContainer.innerHTML = progressHTML;
        
        const progressStylesElement = document.createElement('div');
        progressStylesElement.innerHTML = progressStyles;
        
        document.body.appendChild(progressContainer);
        document.head.appendChild(progressStylesElement);
        
        // Update progress based on scroll
        const updateProgress = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            const progressFill = document.querySelector('.progress-fill');
            const progressPercent = document.querySelector('#progress-percent');
            
            if (progressFill && progressPercent) {
                progressFill.style.width = scrollPercent + '%';
                progressPercent.textContent = Math.round(scrollPercent);
            }
        };
        
        window.addEventListener('scroll', updateProgress);
        updateProgress(); // Initial call
    };

    // Uncomment to enable progress indicator
    // addProgressIndicator();

    // Add smooth scroll to FAQ when clicking from other pages
    const urlHash = window.location.hash;
    if (urlHash === '#faq') {
        setTimeout(() => {
            const faqSection = document.querySelector('.faq');
            if (faqSection) {
                faqSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }

    console.log('Process page functionality initialized successfully!');
});
