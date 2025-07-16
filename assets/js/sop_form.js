// Custom form submission handler (modify based on your exact needs)
    function sopServiceFormSubmit() {
        const messageDiv = document.getElementById('sopServiceMessage');
        messageDiv.innerHTML = `
            <div class="sop-service-alert success">
                <div class="sop-service-alert-icon">✓</div>
                <div class="sop-service-alert-content">
                    <p>Thank you! We'll contact you soon for SOP assistance.</p>
                </div>
            </div>`;
        
        setTimeout(() => {
            messageDiv.innerHTML = "";
        }, 5000); // Clear message after 5 seconds
        
        return true; // Allow form to submit
    }

    // FAQ Accordion JavaScript
    document.addEventListener('DOMContentLoaded', function() {
        var faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(function(question) {
            question.addEventListener('click', function() {
                var answer = this.nextElementSibling; // Get the answer div
                var arrow = this.querySelector('.faq-arrow'); // Get the arrow span

                // Toggle visibility of the answer
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null; // Collapse
                    arrow.innerHTML = '&#43;'; // Change to plus
                } else {
                    answer.style.maxHeight = answer.scrollHeight + "px"; // Expand
                    arrow.innerHTML = '&minus;'; // Change to minus
                }
            });
        });
    });

    // Testimonial Slider Function
    function slideTestimonials(direction) {
        const container = document.querySelector('.testimonials-container');
        const scrollAmount = 320; // card width + gap
        
        if (direction === 1) {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    }

    // Initialize testimonials on page load
    document.addEventListener('DOMContentLoaded', function() {
        const container = document.querySelector('.testimonials-container');
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');

        // Show/hide navigation buttons based on scroll position
        container.addEventListener('scroll', function() {
            const scrollLeft = container.scrollLeft;
            const scrollWidth = container.scrollWidth;
            const clientWidth = container.clientWidth;

            prevBtn.style.display = scrollLeft > 0 ? 'flex' : 'none';
            nextBtn.style.display = scrollLeft < (scrollWidth - clientWidth - 10) ? 'flex' : 'none';
        });

        // Trigger initial scroll check
        container.dispatchEvent(new Event('scroll'));
    });