# Environment Variables Debugging Guide

## The Problem
Your contact form is showing "EmailJS Error: The public key is required" which means the environment variables aren't being loaded in production.

## Debugging Steps

### Step 1: Test Locally First
1. Run your app locally: `npm start`
2. Open browser console and try to submit the contact form
3. Check the console for the debug output showing your environment variables

### Step 2: Check Your .env File
Make sure your `.env` file contains:
```
REACT_APP_EMAILJS_SERVICE_ID=service_1pazkqa
REACT_APP_EMAILJS_TEMPLATE_ID=template_jr8tm6p
REACT_APP_EMAILJS_PUBLIC_KEY=LgFDBjwNqV8c65u6t
```

### Step 3: Test the Build Process
Run these commands to test if environment variables are being included in the build:

```bash
# Set environment variables and build
export REACT_APP_EMAILJS_SERVICE_ID=service_1pazkqa
export REACT_APP_EMAILJS_TEMPLATE_ID=template_jr8tm6p
export REACT_APP_EMAILJS_PUBLIC_KEY=LgFDBjwNqV8c65u6t
npm run build

# Check if variables are in the built files
grep -r "service_1pazkqa" build/static/js/
```

### Step 4: Deploy with Debug Info
1. Use the updated `deploy.sh` script which includes environment variables
2. After deployment, check the browser console on your live site
3. Look for the "=== EmailJS Debug Info ===" output

## Common Issues and Solutions

### Issue 1: Environment Variables Not Loading
**Symptoms:** Console shows `undefined` for all environment variables

**Solutions:**
1. **Check .env file location**: Must be in root directory (same level as package.json)
2. **Restart development server**: After changing .env, restart with `npm start`
3. **Check variable names**: Must start with `REACT_APP_`

### Issue 2: Variables Work Locally But Not in Production
**Symptoms:** Works with `npm start` but fails on deployed site

**Solutions:**
1. **Use the updated deploy.sh**: The script now exports variables before building
2. **Check build process**: Environment variables must be available during `npm run build`
3. **Verify deployment**: Check browser console on live site for debug output

### Issue 3: GitHub Pages Deployment Issues
**Symptoms:** GitHub Actions fails or variables still not working

**Solutions:**
1. **Use GitHub Secrets**: Add variables as repository secrets
2. **Fix environment protection**: Settings → Environments → github-pages → Allow main branch
3. **Use deploy.sh instead**: Simpler approach that works immediately

## Quick Fix Options

### Option A: Use Updated deploy.sh (Recommended)
Your `deploy.sh` script has been updated to include environment variables. Just run:
```bash
./deploy.sh "Fix environment variables"
```

### Option B: Manual Environment Setup
If deploy.sh doesn't work, manually set variables before building:
```bash
export REACT_APP_EMAILJS_SERVICE_ID=service_1pazkqa
export REACT_APP_EMAILJS_TEMPLATE_ID=template_jr8tm6p
export REACT_APP_EMAILJS_PUBLIC_KEY=LgFDBjwNqV8c65u6t
npm run build
npm run deploy
```

### Option C: Create .env.production
Create a `.env.production` file (will be gitignored) with your variables:
```
REACT_APP_EMAILJS_SERVICE_ID=service_1pazkqa
REACT_APP_EMAILJS_TEMPLATE_ID=template_jr8tm6p
REACT_APP_EMAILJS_PUBLIC_KEY=LgFDBjwNqV8c65u6t
```

## Verification Steps

After deployment:
1. Visit your live site: https://AthanIsaac.github.io/ramsis-iconography
2. Open browser console (F12)
3. Go to Contact page and try to submit the form
4. Look for "=== EmailJS Debug Info ===" in console
5. Verify all three variables show actual values (not undefined)

## Remove Debug Code Later
Once everything works, remove the debug console.log statements from Contact.js for cleaner production code.

## Still Not Working?
If none of these solutions work:
1. Check that your EmailJS account is still active
2. Verify the service ID, template ID, and public key are correct in your EmailJS dashboard
3. Try creating new EmailJS credentials and updating your .env file
4. Contact me with the exact console error messages