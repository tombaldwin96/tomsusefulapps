# Deployment Instructions

This project consists of two parts:
1. **Frontend** (Static HTML/CSS/JS) - Deploy to Render Static Site
2. **Backend API** (Node.js/Express) - Deploy to Render Web Service

## Frontend Deployment (Static Site)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Static Site"**
3. Connect your Git repository
4. Configure:
   - **Name**: `tomsusefulapps-frontend`
   - **Build Command**: (leave empty)
   - **Publish Directory**: `.` (root)
5. Click **"Create Static Site"**

## Backend API Deployment (Web Service)

**Option 1: Using render.yaml (Recommended)**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your Git repository: `https://github.com/tombaldwin96/tomsusefulapps.git`
4. Render will automatically detect `render.yaml` and configure both services
5. Review and deploy

**Option 2: Manual Setup**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your Git repository: `https://github.com/tombaldwin96/tomsusefulapps.git`
4. Configure:
   - **Name**: `tomsusefulapps-api`
   - **Root Directory**: `.` (IMPORTANT: Must be a single dot, or leave completely empty)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node api/send-email.js`
   - **Plan**: Free (or choose a plan)
5. Add Environment Variable:
   - **Key**: `RESEND_API_KEY`
   - **Value**: `re_3H54EvYm_PNUDCaxGJSiGj7SB7opATXYo`
6. Click **"Create Web Service"**
7. Wait for deployment to complete
8. Copy the service URL (e.g., `https://tomsusefulapps-api.onrender.com`)

## Update Frontend with Backend URL

After deploying the backend, update `script.js`:

1. Open `script.js`
2. Find the line: `const API_URL = ...`
3. Replace `'https://your-backend-service.onrender.com'` with your actual backend URL
4. Commit and push the changes
5. The frontend will automatically redeploy

## Testing Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set environment variable:**
   - Create a `.env` file (copy from `.env.example`)
   - Add your Resend API key

3. **Start backend server:**
   ```bash
   npm start
   ```
   Backend will run on `http://localhost:3000`

4. **Test frontend:**
   - Open `index.html` in a browser
   - The form will automatically connect to `http://localhost:3000` when running locally

## Environment Variables

- `RESEND_API_KEY`: Your Resend API key (required)
- `PORT`: Server port (optional, defaults to 3000)

## Troubleshooting

- **CORS errors**: Make sure CORS is enabled in the backend (already configured)
- **Email not sending**: Check that your Resend API key is correct and the domain `hotelwakeupcall.app` is verified in Resend
- **Backend not responding**: Check Render logs for errors
