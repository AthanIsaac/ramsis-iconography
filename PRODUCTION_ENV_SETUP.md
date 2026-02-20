# Production Environment Variables Setup Guide

## Current Setup
You're deploying to GitHub Pages with environment variables that need to be configured for production.

## Option 1: GitHub Actions + Secrets (Recommended)

### Step 1: Add GitHub Secrets
1. Go to your GitHub repository: `https://github.com/AthanIsaac/ramsis-iconography`
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add each variable:
   - Name: `REACT_APP_EMAILJS_SERVICE_ID`, Value: `service_1pazkqa`
   - Name: `REACT_APP_EMAILJS_TEMPLATE_ID`, Value: `template_jr8tm6p`
   - Name: `REACT_APP_EMAILJS_PUBLIC_KEY`, Value: `LgFDBjwNqV8c65u6t`

### Step 2: Update Your Deployment Process
The GitHub Actions workflow (`.github/workflows/deploy.yml`) is already created and will:
- Build your app with the environment variables from GitHub Secrets
- Deploy to GitHub Pages automatically when you push to main

### Step 3: Stop Using deploy.sh
Your current `deploy.sh` script won't include environment variables. Instead:
- Just push to main: `git add . && git commit -m "message" && git push origin main`
- GitHub Actions will handle the build and deployment automatically

## Option 2: Manual Build with Environment Variables

If you prefer to keep using your current deployment method:

### Create a production environment file:
```bash
# Create .env.production (this will be gitignored)
cp .env .env.production
```

### Update deploy.sh to use production env:
```bash
# Before npm run deploy, add:
export REACT_APP_EMAILJS_SERVICE_ID=service_1pazkqa
export REACT_APP_EMAILJS_TEMPLATE_ID=template_jr8tm6p
export REACT_APP_EMAILJS_PUBLIC_KEY=LgFDBjwNqV8c65u6t
npm run build
npm run deploy
```

## Option 3: Alternative Hosting Platforms

If you want easier environment variable management, consider:

### Vercel
1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Automatic deployments on push

### Netlify
1. Connect your GitHub repo to Netlify
2. Add environment variables in Netlify dashboard
3. Automatic deployments on push

## Security Notes

✅ **Good practices:**
- Keep `.env` in `.gitignore` (already done)
- Use GitHub Secrets for sensitive data
- Environment variables starting with `REACT_APP_` are safe for client-side

⚠️ **Important:**
- React environment variables are embedded in the build and visible to users
- EmailJS public keys are meant to be public, so this is safe
- Never put private API keys in React environment variables

## Testing Your Setup

1. After setting up GitHub Secrets, push a change to main
2. Check the Actions tab in your GitHub repo to see the deployment
3. Verify your contact form still works on the live site

## Troubleshooting

If environment variables aren't working:
1. Check that variable names start with `REACT_APP_`
2. Verify GitHub Secrets are spelled correctly
3. Check the Actions log for build errors
4. Ensure you're pushing to the `main` branch