// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const body = document.body;

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", function() {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            
            // Prevent scrolling when menu is open
            if (navMenu.classList.contains("active")) {
                body.style.overflow = "hidden";
                
                // Transform hamburger into X
                document.querySelectorAll(".bar").forEach((bar, index) => {
                    if (index === 0) {
                        bar.style.transform = "rotate(-45deg) translate(-5px, 6px)";
                    } else if (index === 1) {
                        bar.style.opacity = "0";
                    } else {
                        bar.style.transform = "rotate(45deg) translate(-5px, -6px)";
                    }
                });
            } else {
                body.style.overflow = "";
                
                // Reset hamburger
                document.querySelectorAll(".bar").forEach(bar => {
                    bar.style.transform = "";
                    bar.style.opacity = "";
                });
            }
        });

        // Close menu when clicking on a nav link
        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                body.style.overflow = "";
                
                // Reset hamburger
                document.querySelectorAll(".bar").forEach(bar => {
                    bar.style.transform = "";
                    bar.style.opacity = "";
                });
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip link if it's a tab or doesn't have valid href
            if (this.getAttribute('onclick') || this.getAttribute('href') === '#') {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('.header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    if (testimonials.length && prevBtn && nextBtn) {
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Previous button click event
        prevBtn.addEventListener('click', function() {
            testimonials[currentIndex].style.display = 'none';
            currentIndex = (currentIndex === 0) ? testimonials.length - 1 : currentIndex - 1;
            testimonials[currentIndex].style.display = 'block';
        });
        
        // Next button click event
        nextBtn.addEventListener('click', function() {
            testimonials[currentIndex].style.display = 'none';
            currentIndex = (currentIndex === testimonials.length - 1) ? 0 : currentIndex + 1;
            testimonials[currentIndex].style.display = 'block';
        });
        
        // Auto rotate testimonials every 5 seconds
        setInterval(function() {
            if (testimonials.length > 1) {
                testimonials[currentIndex].style.display = 'none';
                currentIndex = (currentIndex === testimonials.length - 1) ? 0 : currentIndex + 1;
                testimonials[currentIndex].style.display = 'block';
            }
        }, 5000);
    }

    // Form Submission Handling
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // In a real application, you would send this data to your server
            // For demo purposes, we'll just log it and show a success message
            console.log('Form submission:', formObject);
            
            // Show success message based on form type
            if (this.classList.contains('newsletter-form')) {
                showNotification('Thank you for subscribing to our newsletter!');
            } else if (this.classList.contains('demo-form')) {
                showNotification('Thank you for requesting a demo. Our team will contact you shortly!');
            } else if (this.id === 'contactForm') {
                showNotification('Your message has been sent. We will get back to you soon!');
            } else {
                showNotification('Form submitted successfully!');
            }
            
            // Reset form
            this.reset();
        });
    });

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .solution-card, .process-step, .case-study, .testimonial, .section-header');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animations
    document.querySelectorAll('.service-card, .solution-card, .process-step, .case-study, .testimonial, .section-header').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.8s ease';
    });
    
    // Run on scroll and on page load
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Notification system
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <p>${message}</p>
                <span class="notification-close">&times;</span>
            </div>
        `;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            backgroundColor: type === 'success' ? '#2ecc71' : '#e74c3c',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '5px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
            zIndex: '9999',
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'all 0.3s ease'
        });
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            closeNotification(notification);
        });
        
        // Auto close after 5 seconds
        setTimeout(() => {
            closeNotification(notification);
        }, 5000);
    }
    
    function closeNotification(notification) {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }

    // Add a scroll-to-top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    
    // Style the button
    Object.assign(scrollTopBtn.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        border: 'none',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: '99',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect for scroll-to-top button
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    });

    // Initialize any custom functionalities for specific pages
    if (window.location.pathname.includes('login.html')) {
        // Login page specific JS is handled in the login.html file
    }
});