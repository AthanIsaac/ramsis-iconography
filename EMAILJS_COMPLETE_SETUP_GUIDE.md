# Complete EmailJS Setup Guide for Commission Request Button

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" in the top right corner
3. Create an account using your email address
4. Verify your email address when you receive the confirmation email
5. Log into your EmailJS dashboard

## Step 2: Add Email Service

1. In the EmailJS dashboard, click on **"Email Services"** in the left sidebar
2. Click the **"Add New Service"** button
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook/Hotmail**
   - **Yahoo**
   - Or any other SMTP service

### For Gmail Setup:
1. Select **"Gmail"**
2. Click **"Connect Account"**
3. Sign in with your Gmail account
4. Grant permissions to EmailJS
5. Your service will be created with a **Service ID** (e.g., `service_abc123`)
6. **Copy and save this Service ID** - you'll need it later

## Step 3: Create Email Template

1. In the EmailJS dashboard, click on **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. You'll see a template editor with two main sections:

### Template Settings:
- **Template Name**: `Commission Request Template` (or any name you prefer)

### Email Subject:
In the "Subject" field, enter:
```
New Commission Request from {{from_name}}
```

### Email Content:
In the "Content" field, copy and paste this exact template:

```
New Commission Request - Ramsis Iconography

==================================================
CLIENT INFORMATION
==================================================
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

==================================================
PROJECT DETAILS
==================================================
Project Type: {{project_type}}
Icon Size: {{size}}
Estimated Price: {{estimated_price}}

==================================================
PROJECT DESCRIPTION
==================================================
{{message}}

==================================================
SUBMISSION INFO
==================================================
Submitted: {{submission_date}}
Source: Website Contact Form

==================================================

Please respond to this commission request within 24-48 hours.

Best regards,
Ramsis Iconography Website
```

4. Click **"Save"** at the bottom of the page
5. **Copy and save the Template ID** (e.g., `template_xyz789`) - you'll need it later

## Step 4: Get Your Public Key

1. In the EmailJS dashboard, click on **"Account"** in the left sidebar
2. Look for the **"Public Key"** section
3. **Copy and save your Public Key** (e.g., `user_abcdef123456`) - you'll need it later

## Step 5: Update Environment Variables

Now you need to update your `.env` file with the three values you collected:

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual EmailJS credentials:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_actual_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_actual_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_actual_public_key_here
```

### Example:
```env
REACT_APP_EMAILJS_SERVICE_ID=service_abc123
REACT_APP_EMAILJS_TEMPLATE_ID=template_xyz789
REACT_APP_EMAILJS_PUBLIC_KEY=user_abcdef123456
```

## Step 6: Test Your Setup

1. **Restart your development server**:
   ```bash
   npm start
   ```

2. **Navigate to the Contact page** in your browser

3. **Fill out the form completely**:
   - Enter your name and email
   - Select a project type
   - If you select "Personal Icon" or "Family Icon", choose a size
   - Write a detailed message
   - Click "Send Commission Request"

4. **Verify the process**:
   - You should see a loading spinner
   - After a few seconds, you should see a green success message
   - The form should clear automatically
   - Check your email inbox for the commission request

## Step 7: Verify Email Template Variables

When you receive the test email, verify that all the template variables are populated correctly:

- ✅ `{{from_name}}` should show the name you entered
- ✅ `{{from_email}}` should show your email address
- ✅ `{{phone}}` should show the phone number (or "Not provided")
- ✅ `{{project_type}}` should show the formatted project type
- ✅ `{{size}}` should show the selected size (or "Not applicable")
- ✅ `{{estimated_price}}` should show the calculated price
- ✅ `{{message}}` should show your detailed message
- ✅ `{{submission_date}}` should show the current date/time

## Troubleshooting

### Common Issues:

**1. "Configuration error" message:**
- Double-check your Service ID, Template ID, and Public Key
- Make sure there are no extra spaces in the `.env` file
- Restart your development server after updating `.env`

**2. Email not received:**
- Check your spam/junk folder
- Verify your email service is properly connected in EmailJS
- Test with a different email address

**3. Template variables showing as `{{variable_name}}`:**
- Make sure the variable names in your template exactly match the ones in the code
- Check for typos in the template variables

**4. "Rate limit exceeded" error:**
- EmailJS free tier allows 200 emails per month
- Wait a few minutes between test submissions
- Consider upgrading to a paid plan if needed

### Debug Steps:

1. **Check browser console** for any error messages
2. **Verify environment variables** are loaded:
   ```javascript
   console.log(process.env.REACT_APP_EMAILJS_SERVICE_ID);
   ```
3. **Test with minimal template** first, then add complexity
4. **Check EmailJS dashboard** for delivery logs and error reports

## Security Notes

- ✅ Your Public Key is safe to expose in client-side code
- ✅ EmailJS handles rate limiting and spam protection
- ✅ No sensitive credentials are stored in your frontend code
- ✅ The `.env` file is excluded from version control

## Success Criteria

Your setup is complete when:
- ✅ Form submits without errors
- ✅ Loading state appears during submission
- ✅ Success message shows after submission
- ✅ Form clears automatically
- ✅ Email is received with all correct information
- ✅ All template variables are properly populated

## Next Steps After Setup

Once everything is working:
1. Test with different project types and sizes
2. Test error scenarios (invalid email, empty fields)
3. Test on mobile devices
4. Consider setting up email notifications for yourself
5. Monitor your EmailJS usage in the dashboard

Your commission request button is now fully functional and ready for production use!