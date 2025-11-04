// Language System
let currentLang = localStorage.getItem('language') || 'ru';

// Function to get translation value by key path
function getTranslation(key, lang = currentLang) {
    const keys = key.split('.');
    let value = translations[lang];
    
    for (const k of keys) {
        if (value && typeof value === 'object') {
            value = value[k];
        } else {
            return key; // Return key if translation not found
        }
    }
    
    return value || key;
}

// Function to update page language
function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Update page title
    const pageTitle = getTranslation('pageTitle', lang);
    if (pageTitle) {
        document.title = pageTitle;
    }
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getTranslation(key, lang);
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else if (element.tagName === 'IMG') {
            element.alt = translation;
        } else {
            element.textContent = translation;
        }
    });
    
    // Update all elements with data-translate-aria attribute
    document.querySelectorAll('[data-translate-aria]').forEach(element => {
        const key = element.getAttribute('data-translate-aria');
        const translation = getTranslation(key, lang);
        if (translation) {
            element.setAttribute('aria-label', translation);
        }
    });
    
    // Update all elements with data-translate-alt attribute
    document.querySelectorAll('[data-translate-alt]').forEach(element => {
        const key = element.getAttribute('data-translate-alt');
        const translation = getTranslation(key, lang);
        if (translation) {
            element.setAttribute('alt', translation);
        }
    });
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
            btn.setAttribute('aria-current', 'page');
        } else {
            btn.classList.remove('active');
            btn.removeAttribute('aria-current');
        }
    });
    
    // Update document language attribute
    document.documentElement.lang = lang;
    
    // Update carousel pagination aria-labels if carousel exists
    const paginationDots = document.querySelectorAll('.swiper-pagination button');
    paginationDots.forEach((dot, index) => {
        const goToSlide = getTranslation('ariaLabels.goToSlide', lang);
        if (goToSlide) {
            dot.setAttribute('aria-label', `${goToSlide} ${index + 1}`);
        }
    });
}

// Initialize language on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateLanguage(currentLang);
    });
} else {
    updateLanguage(currentLang);
}

// Language switcher event listeners
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        updateLanguage(lang);
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const isExpanded = mainNav.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });
}

// Hero Carousel
class SimpleCarousel {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.swiper-slide');
        this.currentIndex = 0;
        this.prevButton = container.querySelector('.swiper-button-prev');
        this.nextButton = container.querySelector('.swiper-button-next');
        this.pagination = container.querySelector('.swiper-pagination');
        this.autoPlayInterval = null;
        
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        // Create pagination dots
        if (this.pagination) {
            this.slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = index === 0 ? 'active' : '';
                const goToSlide = getTranslation('ariaLabels.goToSlide', currentLang);
                dot.setAttribute('aria-label', `${goToSlide} ${index + 1}`);
                dot.addEventListener('click', () => this.goToSlide(index));
                this.pagination.appendChild(dot);
            });
        }

        // Event listeners
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.nextSlide());
        }

        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Auto-play
        this.startAutoPlay();

        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());

        // Touch/swipe support
        let startX = 0;
        let endX = 0;

        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            this.stopAutoPlay();
        });

        this.container.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
            this.startAutoPlay();
        });

        this.handleSwipe = () => {
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        };
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlides();
        this.updatePagination();
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlides();
        this.updatePagination();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlides();
        this.updatePagination();
    }

    updateSlides() {
        this.slides.forEach((slide, index) => {
            slide.style.display = index === this.currentIndex ? 'flex' : 'none';
        });
    }

    updatePagination() {
        if (this.pagination) {
            const dots = this.pagination.querySelectorAll('button');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        }
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize Carousel
const carouselContainer = document.querySelector('.swiper-container');
if (carouselContainer) {
    const carousel = new SimpleCarousel(carouselContainer);
}

// Accordion
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    if (header) {
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all accordion items
            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
                accItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            }
        });

        // Keyboard support
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
            }
        });
    }
});

// Tabs
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });

        tabPanels.forEach(panel => {
            panel.classList.remove('active');
        });

        // Add active class to clicked button and corresponding panel
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');

        const targetPanel = document.querySelector(`.tab-panel[data-tab="${targetTab}"]`);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });

    // Keyboard support
    button.addEventListener('keydown', (e) => {
        const currentIndex = Array.from(tabButtons).indexOf(button);
        let targetIndex = currentIndex;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            targetIndex = (currentIndex + 1) % tabButtons.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            targetIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
        } else if (e.key === 'Home') {
            targetIndex = 0;
        } else if (e.key === 'End') {
            targetIndex = tabButtons.length - 1;
        } else {
            return;
        }

        e.preventDefault();
        tabButtons[targetIndex].focus();
        tabButtons[targetIndex].click();
    });
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
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
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('active') && 
        !mainNav.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        mainNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

// Add active class to current nav link based on scroll position
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.main-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 100;

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
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Update carousel slides display
    if (carouselContainer) {
        const slides = carouselContainer.querySelectorAll('.swiper-slide');
        slides.forEach((slide, index) => {
            slide.style.display = index === 0 ? 'flex' : 'none';
        });
    }
});
