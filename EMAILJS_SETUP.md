# EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service
1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template structure:

### Template Subject:
```
New Commission Request from {{from_name}}
```

### Template Body:
```
New Commission Request

Client Information:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}

Project Details:
- Project Type: {{project_type}}
- Size: {{size}}
- Estimated Price: {{estimated_price}}

Message:
{{message}}

Submitted at: {{submission_date}}

---
This email was sent from the Ramsis Iconography website contact form.
```

4. Save the template and note down the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key
1. Go to "Account" in the EmailJS dashboard
2. Find your **Public Key** (e.g., `user_abcdef123456`)

## Step 5: Update Environment Variables
Update the `.env` file with your actual values:

```env
REACT_APP_EMAILJS_SERVICE_ID=service_abc123
REACT_APP_EMAILJS_TEMPLATE_ID=template_xyz789
REACT_APP_EMAILJS_PUBLIC_KEY=user_abcdef123456
```

## Step 6: Test Configuration
After updating the environment variables:
1. Restart your development server (`npm start`)
2. Fill out the contact form
3. Submit and check your email

## Troubleshooting

### Common Issues:
1. **Email not received**: Check spam folder, verify service configuration
2. **403 Forbidden**: Check public key and service ID
3. **Template not found**: Verify template ID is correct
4. **Rate limit exceeded**: EmailJS free tier allows 200 emails/month

### Testing Tips:
- Use your own email for initial testing
- Check EmailJS dashboard for delivery logs
- Verify all template variables are being passed correctly

## Security Notes:
- The public key is safe to expose in client-side code
- EmailJS handles rate limiting and spam protection
- No sensitive credentials are stored in the frontend