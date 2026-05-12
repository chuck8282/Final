document.addEventListener('DOMContentLoaded', () => {
    
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
        
        // Basic validation logic could go here
        const name = document.getElementById('name').value;
        
        // Display animated feedback
        formFeedback.textContent = `Thank you, ${name}! Your eco-inquiry has been received.`;
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
});