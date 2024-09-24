function animateNumber(element, start, end, duration) {
    let current = start;
    const increment = end > start ? Math.ceil((end - start) / (duration / 10)) : 0;

    const updateCounter = () => {
        current += increment;

        if (current >= end) {
            element.textContent = end + '+'; // Add the "+" at the end
        } else {
            element.textContent = current + '+';
            setTimeout(updateCounter, 30); // Updates every 30ms
        }
    };

    updateCounter();
}

// Function to handle when elements come into view
function startCounting() {
    const counters = document.querySelectorAll('.update');
    counters.forEach((counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            animateNumber(counter, 0, target, 2000); // Animates over 2 seconds
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(counter); // Stops observing after animating
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// Initialize counting when DOM is fully loaded
window.addEventListener('DOMContentLoaded', startCounting);


function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}