// FAIR GROUP - Catalog functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const catalogItems = document.querySelectorAll('.catalog-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            catalogItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Add hover effects for catalog items
    catalogItems.forEach(item => {
        const image = item.querySelector('.catalog-image img');
        const overlay = item.querySelector('.catalog-overlay');
        
        item.addEventListener('mouseenter', function() {
            if (image && overlay) {
                image.style.transform = 'scale(1.05)';
                overlay.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (image && overlay) {
                image.style.transform = 'scale(1)';
                overlay.style.opacity = '0';
            }
        });
    });

    // Add click handlers for "Подробнее" buttons
    const detailButtons = document.querySelectorAll('.catalog-overlay .btn-primary');
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get item information
            const catalogItem = this.closest('.catalog-item');
            const itemName = catalogItem.querySelector('h3').textContent;
            const itemCategory = catalogItem.querySelector('.catalog-category').textContent;
            const itemPrice = catalogItem.querySelector('.catalog-price').textContent;
            const itemDescription = catalogItem.querySelector('.catalog-description').textContent;
            
            // Show modal or redirect to contact form
            showItemModal({
                name: itemName,
                category: itemCategory,
                price: itemPrice,
                description: itemDescription
            });
        });
    });

    // Modal functionality
    function showItemModal(item) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'item-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3>${item.name}</h3>
                <p class="modal-category">${item.category}</p>
                <p class="modal-description">${item.description}</p>
                <div class="modal-price">${item.price}</div>
                <div class="modal-actions">
                    <button class="btn-secondary modal-close-btn">Закрыть</button>
                    <a href="index.html#contact-form" class="btn-primary">Заказать</a>
                </div>
            </div>
        `;
        
        // Add modal styles
        const modalStyles = `
            <style>
                .item-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                }
                
                .modal-backdrop {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(5px);
                }
                
                .modal-content {
                    position: relative;
                    background: white;
                    padding: 2rem;
                    border-radius: var(--border-radius);
                    max-width: 500px;
                    width: 100%;
                    box-shadow: var(--shadow-lg);
                    animation: modalSlideIn 0.3s ease;
                }
                
                .modal-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: var(--gray-medium);
                    transition: color 0.3s ease;
                }
                
                .modal-close:hover {
                    color: var(--primary-color);
                }
                
                .modal-category {
                    color: var(--primary-color);
                    font-weight: 500;
                    margin-bottom: 1rem;
                }
                
                .modal-description {
                    margin-bottom: 1.5rem;
                    color: var(--gray-medium);
                }
                
                .modal-price {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--primary-color);
                    margin-bottom: 2rem;
                }
                
                .modal-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: flex-end;
                }
                
                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @media (max-width: 768px) {
                    .modal-content {
                        margin: 1rem;
                        padding: 1.5rem;
                    }
                    
                    .modal-actions {
                        flex-direction: column;
                    }
                }
            </style>
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#modal-styles')) {
            const styleElement = document.createElement('div');
            styleElement.id = 'modal-styles';
            styleElement.innerHTML = modalStyles;
            document.head.appendChild(styleElement);
        }
        
        // Add modal to page
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Close modal handlers
        const closeModal = () => {
            modal.remove();
            document.body.style.overflow = '';
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
        modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
        
        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    // Add search functionality
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Поиск по каталогу...';
    searchInput.className = 'catalog-search';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        margin: 0 auto 2rem;
        padding: 0.75rem;
        border: 2px solid #E9ECEF;
        border-radius: var(--border-radius);
        font-size: 1rem;
        display: block;
    `;
    
    // Insert search input before catalog grid
    const catalogSection = document.querySelector('.catalog');
    const catalogGrid = document.querySelector('.catalog-grid');
    catalogSection.insertBefore(searchInput, catalogGrid);
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        catalogItems.forEach(item => {
            const itemName = item.querySelector('h3').textContent.toLowerCase();
            const itemDescription = item.querySelector('.catalog-description').textContent.toLowerCase();
            const itemCategory = item.querySelector('.catalog-category').textContent.toLowerCase();
            
            if (itemName.includes(searchTerm) || 
                itemDescription.includes(searchTerm) || 
                itemCategory.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Update filter buttons based on visible items
        const visibleItems = Array.from(catalogItems).filter(item => 
            item.style.display !== 'none'
        );
        
        const visibleCategories = new Set(
            visibleItems.map(item => item.getAttribute('data-category'))
        );
        
        filterButtons.forEach(button => {
            const category = button.getAttribute('data-category');
            if (category === 'all' || visibleCategories.has(category)) {
                button.style.opacity = '1';
                button.style.pointerEvents = 'auto';
            } else {
                button.style.opacity = '0.5';
                button.style.pointerEvents = 'none';
            }
        });
    });

    // Add loading animation for catalog items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const catalogObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                catalogObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    catalogItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        catalogObserver.observe(item);
    });

    // Add price range filter (optional enhancement)
    const addPriceFilter = () => {
        const priceFilterHTML = `
            <div class="price-filter">
                <label>Цена:</label>
                <select class="price-select">
                    <option value="all">Все цены</option>
                    <option value="0-1000">до 1000₽</option>
                    <option value="1000-2000">1000-2000₽</option>
                    <option value="2000-3000">2000-3000₽</option>
                    <option value="3000+">от 3000₽</option>
                </select>
            </div>
        `;
        
        const filtersContainer = document.querySelector('.catalog-filters .container');
        const priceFilterDiv = document.createElement('div');
        priceFilterDiv.innerHTML = priceFilterHTML;
        priceFilterDiv.className = 'price-filter-container';
        priceFilterDiv.style.cssText = `
            margin-top: 1rem;
            text-align: center;
        `;
        
        filtersContainer.appendChild(priceFilterDiv);
        
        const priceSelect = priceFilterDiv.querySelector('.price-select');
        priceSelect.addEventListener('change', function() {
            const priceRange = this.value;
            
            catalogItems.forEach(item => {
                const priceText = item.querySelector('.catalog-price').textContent;
                const price = parseInt(priceText.replace(/[^\d]/g, ''));
                
                let shouldShow = true;
                
                if (priceRange !== 'all') {
                    if (priceRange === '0-1000') {
                        shouldShow = price <= 1000;
                    } else if (priceRange === '1000-2000') {
                        shouldShow = price > 1000 && price <= 2000;
                    } else if (priceRange === '2000-3000') {
                        shouldShow = price > 2000 && price <= 3000;
                    } else if (priceRange === '3000+') {
                        shouldShow = price > 3000;
                    }
                }
                
                item.style.display = shouldShow ? 'block' : 'none';
            });
        });
    };

    // Uncomment to enable price filter
    // addPriceFilter();

    console.log('Catalog functionality initialized successfully!');
});
