// Backend API endpoint for sending emails via Resend
// This should be deployed as a serverless function or backend service

const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY || 're_3H54EvYm_PNUDCaxGJSiGj7SB7opATXYo');

// Middleware
app.use(cors());
app.use(express.json());

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
    try {
        const { appName, yourName, email, comments } = req.body;

        // Validate required fields
        if (!appName || !yourName || !email || !comments) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                message: 'Please fill in all fields'
            });
        }

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: 'Toms Usefull Apps Notification <noreply@hotelwakeupcall.app>',
            to: ['tombaldwin1996@hotmail.co.uk'],
            replyTo: email,
            subject: `Contact from ${appName} - ${yourName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 20px;">
                        <p><strong style="color: #00d4ff;">Application Name:</strong> ${appName}</p>
                        <p><strong style="color: #00d4ff;">Name:</strong> ${yourName}</p>
                        <p><strong style="color: #00d4ff;">Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        <p><strong style="color: #00d4ff;">Comments/Requests:</strong></p>
                        <div style="background-color: white; padding: 15px; border-left: 4px solid #7c3aed; margin-top: 10px; white-space: pre-wrap;">${comments.replace(/\n/g, '<br>')}</div>
                    </div>
                    <p style="margin-top: 20px; color: #666; font-size: 12px;">
                        This email was sent from the Tom's Useful Apps contact form.
                    </p>
                </div>
            `,
            text: `
New Contact Form Submission

Application Name: ${appName}
Name: ${yourName}
Email: ${email}

Comments/Requests:
${comments}

---
This email was sent from the Tom's Useful Apps contact form.
            `
        });

        if (error) {
            console.error('Resend error:', error);
            return res.status(500).json({ 
                error: 'Failed to send email',
                message: error.message || 'An error occurred while sending the email'
            });
        }

        res.json({ 
            success: true, 
            message: 'Email sent successfully',
            id: data?.id 
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message || 'An unexpected error occurred'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'email-api' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Email API server running on port ${PORT}`);
});

module.exports = app;
