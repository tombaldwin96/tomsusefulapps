// Preloader functionality - Airplane Landing
window.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    
    // Wait for airplane to land (3s) and logo to appear (0.6s) = 3.6 seconds total animation
    // Then wait 1 second more before fading out
    setTimeout(function() {
        preloader.classList.add('fade-out');
        
        // Show main content after fade starts
        mainContent.style.display = 'block';
        
        // Remove preloader from DOM after fade completes
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500); // Match the transition duration
    }, 4600); // 3s landing + 0.6s logo + 1s pause = 4.6 seconds total
});

// Form submission handler
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

// Add smooth scroll behavior
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
