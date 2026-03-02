/**
 * Spring Chicken Recipes - Interactive functionality
 */

// Toggle recipe details
function toggleRecipe(recipeId) {
    const detailsElement = document.getElementById(`recipe-${recipeId}`);
    const button = event.target;

    if (detailsElement.classList.contains('active')) {
        // Collapse
        detailsElement.classList.remove('active');
        button.textContent = 'View Recipe';
    } else {
        // Expand
        detailsElement.classList.add('active');
        button.textContent = 'Hide Recipe';

        // Smooth scroll to show expanded content
        setTimeout(() => {
            detailsElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 100);
    }
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all recipe cards on load
document.addEventListener('DOMContentLoaded', () => {
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        observer.observe(card);
    });

    // Add subtle parallax effect to hero decoration
    const heroDecoration = document.querySelector('.hero-decoration');
    if (heroDecoration && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroDecoration.style.transform = `translate(${rate}px, ${rate}px)`;
        });
    }
});

// Smooth scroll for any anchor links (future-proofing)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add touch feedback for mobile
if ('ontouchstart' in window) {
    document.querySelectorAll('.recipe-btn').forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        btn.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}
