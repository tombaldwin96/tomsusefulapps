// Preloader functionality - Glitchy Logo
window.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    
    // Only run preloader on index.html
    if (preloader && mainContent) {
        const logoWrapper = preloader.querySelector('.preloader-logo-wrapper');
        const logo = preloader.querySelector('.preloader-logo');
        
        // Stop glitch animation after 1 second
        setTimeout(function() {
            logo.classList.add('glitch-stop');
            logoWrapper.classList.add('glitch-stop');
        }, 1000); // 1 second of glitching
        
        // Wait 2.5 seconds total (1s glitch + 1.5s normal), then fade out preloader and show main content
        setTimeout(function() {
            preloader.classList.add('fade-out');
            
            // Show main content after fade starts
            mainContent.style.display = 'block';
            
            // Remove preloader from DOM after fade completes
            setTimeout(function() {
                preloader.style.display = 'none';
                // Initialize scroll animations after preloader is gone
                initScrollAnimations();
                initScrollProgress();
            }, 500); // Match the transition duration
        }, 2500); // 2.5 seconds total (1s glitch + 1.5s normal)
    } else {
        // On other pages, initialize immediately
        initScrollAnimations();
        initScrollProgress();
    }
});

// Scroll Progress Indicator
function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// Scroll Reveal Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe all elements that should reveal on scroll
    const revealElements = document.querySelectorAll('.section-title, .projects-grid, .locked-panel, .about-content, .contact-intro, .form-wrapper');
    revealElements.forEach(el => observer.observe(el));
}

// Initialize on page load (for pages without preloader)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (!document.getElementById('preloader')) {
            initScrollAnimations();
            initScrollProgress();
        }
    });
} else {
    if (!document.getElementById('preloader')) {
        initScrollAnimations();
        initScrollProgress();
    }
}

// Navigation Scroll Behavior
window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        const links = navLinks.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navHeight = document.getElementById('mainNav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler - KEEP EXACTLY AS IS
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const messageDiv = document.getElementById('formMessage');
    
    // Get form data
    const formData = {
        appName: document.getElementById('appName').value.trim(),
        yourName: document.getElementById('yourName').value.trim(),
        email: document.getElementById('email').value.trim(),
        comments: document.getElementById('comments').value.trim()
    };
    
    // Disable button and show loading
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    messageDiv.style.display = 'none';
    
    try {
        // Send email via backend API endpoint
        // IMPORTANT: Update the API_URL to match your deployed backend service URL
        // For local development: 'http://localhost:3000'
        // For production: 'https://your-backend-service.onrender.com' (or your deployed URL)
        const API_URL = window.location.hostname === 'localhost' 
            ? 'http://localhost:3000' 
            : 'https://your-backend-service.onrender.com'; // UPDATE THIS with your actual backend URL
        
        const response = await fetch(`${API_URL}/api/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                appName: formData.appName,
                yourName: formData.yourName,
                email: formData.email,
                comments: formData.comments
            })
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            // Success
            messageDiv.className = 'form-message success';
            messageDiv.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you as soon as possible.';
            messageDiv.style.display = 'block';
            form.reset();
        } else {
            throw new Error(result.message || 'Failed to send message');
        }
    } catch (error) {
        // Fallback: Use mailto if Formspree fails or isn't configured
        console.error('Form submission error:', error);
        
        // Create mailto link as fallback
        const subject = encodeURIComponent(`Contact from ${formData.appName} - ${formData.yourName}`);
        const body = encodeURIComponent(
            `Application Name: ${formData.appName}\n\n` +
            `Your Name: ${formData.yourName}\n\n` +
            `Email: ${formData.email}\n\n` +
            `Comments/Requests:\n${formData.comments}`
        );
        const mailtoLink = `mailto:tombaldwin1996@hotmail.co.uk?subject=${subject}&body=${body}`;
        
        // Show message with mailto option
        messageDiv.className = 'form-message error';
        messageDiv.innerHTML = 'There was an issue sending your message. <a href="' + mailtoLink + '" style="color: inherit; text-decoration: underline;">Click here to send via email</a> instead.';
        messageDiv.style.display = 'block';
    } finally {
        // Re-enable button
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
});
