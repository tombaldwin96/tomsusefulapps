# Tom's Useful Apps - Homepage

Professional tech-focused homepage with contact form for tomsusefulapps.com

## Setup Instructions

### 1. Add Your Logo

Place your `logo.png` file in the `assets` folder:
```
D:\tomsusefulapps\assets\logo.png
```

### 2. Configure Form Submission

You have two options for form submission:

#### Option A: Formspree (Recommended - Free)

1. Go to [Formspree.io](https://formspree.io) and sign up (free tier available)
2. Create a new form
3. Set the email to: `tombaldwin1996@hotmail.co.uk`
4. Copy your Formspree form ID (looks like: `xvgkqyzw`)
5. Open `script.js` and replace `YOUR_FORMSPREE_ID` with your actual form ID:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
   ```
   Change to:
   ```javascript
   const response = await fetch('https://formspree.io/f/xvgkqyzw', {
   ```

#### Option B: Backend Endpoint (Advanced)

If you prefer to use your own backend:
1. Create an endpoint that accepts POST requests
2. Update the fetch URL in `script.js` to point to your endpoint
3. Configure your backend to send emails using a service like SendGrid, Mailgun, or Nodemailer

### 3. Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Static Site"**
3. Connect your Git repository (or upload the folder)
4. Configure:
   - **Name**: `tomsusefulapps`
   - **Build Command**: (leave empty)
   - **Publish Directory**: `.` (root)
5. Click **"Create Static Site"**

### 4. Add Custom Domain

1. After deployment, go to **Settings** → **Custom Domain**
2. Add `tomsusefulapps.com` and `www.tomsusefulapps.com`
3. Follow Render's DNS instructions to update your domain records

## File Structure

```
D:\tomsusefulapps\
├── index.html          # Main HTML file
├── styles.css          # Styling
├── script.js           # Form handling JavaScript
├── README.md           # This file
└── assets/
    └── logo.png        # Your logo (add this)
```

## Features

- ✅ Professional tech-focused design
- ✅ Responsive (mobile-friendly)
- ✅ Contact form with validation
- ✅ Email notifications via Formspree
- ✅ Fallback mailto option
- ✅ Smooth animations and transitions
- ✅ Dark theme with modern UI

## Customization

- **Colors**: Edit CSS variables in `styles.css` (`:root` section)
- **Text**: Edit content in `index.html`
- **Form fields**: Add/remove fields in `index.html` and update `script.js`

## Support

For issues or questions, contact: tombaldwin1996@hotmail.co.uk
