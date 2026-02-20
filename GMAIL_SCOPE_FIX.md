# Fix for Gmail Authentication Scope Error (Status 412)

## The Problem
You're getting this error:
```
EmailJS Error: EmailJSResponseStatus {status: 412, text: 'Gmail_API: Request had insufficient authentication scopes.'}
```

This happens because Gmail's API permissions need to be properly configured in EmailJS.

## Solution: Use SMTP Instead of Gmail API

The most reliable solution is to switch from Gmail API to Gmail SMTP, which doesn't have these scope issues.

### Step 1: Remove Current Gmail Service
1. Go to your EmailJS dashboard
2. Click on "Email Services"
3. Find your current Gmail service and click "Delete" or "Remove"

### Step 2: Add Gmail SMTP Service
1. In EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. **Instead of selecting "Gmail", select "Gmail SMTP"**
4. Fill in the configuration:

```
SMTP Server: smtp.gmail.com
Port: 587
Username: your-gmail-address@gmail.com
Password: [See App Password instructions below]
```

### Step 3: Create Gmail App Password
Since you're using Gmail SMTP, you need an "App Password":

1. **Enable 2-Factor Authentication** on your Gmail account (required for app passwords)
   - Go to https://myaccount.google.com/security
   - Turn on 2-Step Verification if not already enabled

2. **Generate App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Other" as the device and name it "EmailJS"
   - Click "Generate"
   - **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

3. **Use this App Password** in the EmailJS SMTP configuration (not your regular Gmail password)

### Step 4: Test the New Service
1. Save the SMTP service configuration
2. **Copy the new Service ID** (it will be different from your previous one)
3. Update your `.env` file with the new Service ID:
   ```env
   REACT_APP_EMAILJS_SERVICE_ID=your_new_smtp_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
   REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
   ```
4. Restart your development server: `npm start`
5. Test the contact form again

## Alternative Solution: Fix Gmail API Scopes

If you prefer to stick with Gmail API (not recommended), you need to:

1. **Delete and Recreate Gmail Service**:
   - Remove current Gmail service from EmailJS
   - Add a new Gmail service
   - When connecting, make sure to grant ALL requested permissions

2. **Check Gmail API Settings**:
   - Go to https://console.cloud.google.com/
   - Find your EmailJS project
   - Check that Gmail API has proper scopes enabled

## Why SMTP is Better

- ✅ **More Reliable**: No API scope issues
- ✅ **Easier Setup**: Just username and app password
- ✅ **Better Control**: Direct SMTP connection
- ✅ **No Quota Issues**: Gmail SMTP has higher limits
- ✅ **Works Everywhere**: Compatible with all email providers

## Testing Your Fix

After switching to SMTP:
1. Fill out the contact form
2. You should see "Sending..." on the button
3. You should get a success message
4. Check your email inbox for the commission request
5. No more 412 errors!

## If You Still Have Issues

1. **Double-check App Password**: Make sure you're using the 16-character app password, not your regular Gmail password
2. **Verify 2FA**: Gmail App Passwords require 2-factor authentication to be enabled
3. **Check SMTP Settings**: Ensure server is `smtp.gmail.com` and port is `587`
4. **Test with Different Email**: Try using a different Gmail account temporarily

## Security Note

App Passwords are secure and designed specifically for this use case. They:
- Only work with the specific app/service you created them for
- Can be revoked anytime from your Google Account settings
- Don't give access to your full Gmail account
- Are the recommended way to use Gmail with third-party services

Your commission request button should work perfectly after switching to Gmail SMTP!