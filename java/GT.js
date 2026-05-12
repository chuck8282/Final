document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // 1. Accessibility Feature: High Contrast Toggle
    const contrastBtn = document.getElementById('contrast-toggle');
    contrastBtn.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        
        // Update ARIA state for screen readers
        const isHighContrast = document.body.classList.contains('high-contrast');
        contrastBtn.setAttribute('aria-pressed', isHighContrast);
    });

    // 2. Interactive Feature: Product Filtering
    const filterSelect = document.getElementById('product-filter');
    const productCards = document.querySelectorAll('.product-card');

    filterSelect.addEventListener('change', (e) => {
        const selectedCategory = e.target.value;

        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });

    // 3. Interactive Feature: Form Handling & Validation
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        
        // Enhanced validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formFeedback.textContent = 'Please enter a valid email address.';
            formFeedback.style.color = '#d32f2f';
            return;
        }
        
        // Validate name length
        if (name.length < 2) {
            formFeedback.textContent = 'Please enter a valid name (at least 2 characters).';
            formFeedback.style.color = '#d32f2f';
            return;
        }
        
        // Display success feedback
        formFeedback.textContent = `Thank you, ${name}! Your eco-inquiry has been received. We'll contact you at ${email} soon.`;
        formFeedback.style.color = 'var(--primary-green)';
        contactForm.reset();
    });

    // 4. Mobile Responsiveness: Hamburger Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        mobileBtn.setAttribute('aria-expanded', isExpanded);
    });

    // 5. Newsletter Subscription
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterFeedback = document.getElementById('newsletter-feedback');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                newsletterFeedback.textContent = 'Please enter a valid email address.';
                newsletterFeedback.style.color = '#d32f2f';
                return;
            }
            
            newsletterFeedback.textContent = `✓ Thank you for subscribing! Check your email for our latest sustainability tips.`;
            newsletterFeedback.style.color = 'var(--primary-green)';
            newsletterForm.reset();
        });
    }

    // 6. Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 7. Animated Statistics Counter
    function animateCounter(element, target, duration = 2000) {
        let current = 0;
        const increment = target / (duration / 16); // ~60fps
        
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }
            
            // Format number with commas
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    // Trigger counter animation when stats section is visible
    const statsCards = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statsCards.forEach(card => {
                    const target = parseInt(card.getAttribute('data-target'));
                    animateCounter(card, target);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // 8. Enhanced Contact Form with Message Field
    const messageField = document.getElementById('message');
    if (messageField) {
        messageField.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    // 9. Auto-close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileBtn.setAttribute('aria-expanded', 'false');
        });
    });
});