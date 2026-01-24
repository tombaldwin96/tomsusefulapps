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
        // Using Formspree (free tier available)
        // IMPORTANT: Replace 'YOUR_FORMSPREE_ID' with your actual Formspree form ID
        // Get it from: https://formspree.io/forms after creating a form
        // Set the recipient email to: tombaldwin1996@hotmail.co.uk in Formspree settings
        const response = await fetch('https://formspree.io/f/mrepvpzy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                _subject: `Contact from ${formData.appName} - ${formData.yourName}`,
                _replyto: formData.email,
                'Application Name': formData.appName,
                'Your Name': formData.yourName,
                'Email': formData.email,
                'Comments/Requests': formData.comments
            })
        });
        
        if (response.ok) {
            // Success
            messageDiv.className = 'form-message success';
            messageDiv.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you as soon as possible.';
            messageDiv.style.display = 'block';
            form.reset();
        } else {
            throw new Error('Failed to send message');
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
