# Beautiful EmailJS Template - Copy & Paste Ready

## Instructions
1. Go to your EmailJS dashboard
2. Edit your existing template or create a new one
3. Copy the HTML below and paste it into the "Content" field
4. Make sure to set the template to "HTML" format (not plain text)

## Subject Line
```
✦ New Commission Request from {{from_name}} ✦
```

## HTML Template Content
Copy everything below this line and paste it into EmailJS:

```html
<div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, #8b1538 0%, #a91d42 100%); padding: 30px; text-align: center; color: white;">
    <h1 style="margin: 0; font-size: 28px; font-weight: 400; letter-spacing: 1px;">✦ New Commission Request ✦</h1>
    <p style="margin: 8px 0 0 0; font-size: 16px; font-style: italic; opacity: 0.9;">Ramsis Iconography</p>
  </div>

  <!-- Content -->
  <div style="padding: 40px;">
    
    <!-- Client Information -->
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #8b1538; margin-bottom: 25px;">
      <h2 style="margin: 0 0 15px 0; color: #8b1538; font-size: 20px; font-weight: 600;">👤 Client Information</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 5px 0; width: 80px; color: #6c757d; font-weight: 600;">Name:</td>
          <td style="padding: 5px 0; color: #2c3e50; font-weight: 500;">{{from_name}}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #6c757d; font-weight: 600;">Email:</td>
          <td style="padding: 5px 0;"><a href="mailto:{{from_email}}" style="color: #8b1538; text-decoration: none; font-weight: 500;">{{from_email}}</a></td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #6c757d; font-weight: 600;">Phone:</td>
          <td style="padding: 5px 0; color: #2c3e50; font-weight: 500;">{{phone}}</td>
        </tr>
      </table>
    </div>
    
    <!-- Project Details -->
    <div style="background-color: #fff8e1; padding: 20px; border-radius: 8px; border-left: 4px solid #d4a574; margin-bottom: 25px;">
      <h2 style="margin: 0 0 15px 0; color: #8b6914; font-size: 20px; font-weight: 600;">🎨 Project Details</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 5px 0; width: 120px; color: #8b6914; font-weight: 600;">Project Type:</td>
          <td style="padding: 5px 0; color: #2c3e50; font-weight: 500;">{{project_type}}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #8b6914; font-weight: 600;">Icon Size:</td>
          <td style="padding: 5px 0; color: #2c3e50; font-weight: 500;">{{size}}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #8b6914; font-weight: 600;">Estimated Price:</td>
          <td style="padding: 5px 0;">
            <span style="background-color: #d4a574; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 14px;">{{estimated_price}}</span>
          </td>
        </tr>
      </table>
    </div>
    
    <!-- Project Description -->
    <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; border-left: 4px solid #4a90e2; margin-bottom: 25px;">
      <h2 style="margin: 0 0 15px 0; color: #2c5aa0; font-size: 20px; font-weight: 600;">📝 Project Description</h2>
      <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e3f2fd; line-height: 1.6; color: #2c3e50; white-space: pre-wrap;">{{message}}</div>
    </div>
    
    <!-- Submission Info -->
    <div style="background-color: #f5f5f5; padding: 15px 20px; border-radius: 8px; text-align: center; border: 1px dashed #cccccc; margin-bottom: 25px;">
      <p style="margin: 0; color: #6c757d; font-size: 14px;"><strong>Submitted:</strong> {{submission_date}} • <strong>Source:</strong> Website Contact Form</p>
    </div>
    
    <!-- Call to Action -->
    <div style="text-align: center; padding: 20px 0;">
      <div style="background: linear-gradient(135deg, #8b1538 0%, #a91d42 100%); padding: 15px 30px; border-radius: 25px; display: inline-block;">
        <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600;">⏰ Please respond within 24-48 hours</p>
      </div>
    </div>
    
  </div>

  <!-- Footer -->
  <div style="background-color: #2c3e50; padding: 25px; text-align: center; color: white;">
    <p style="margin: 0 0 10px 0; font-size: 18px; font-weight: 500;">Ramsis Iconography</p>
    <p style="margin: 0 0 15px 0; color: #bdc3c7; font-size: 14px; line-height: 1.5;">Sacred Art • Traditional Iconography • Custom Commissions</p>
    <div style="text-align: center;">
      <a href="mailto:ramsis.icons@gmail.com" style="color: #f39c12; text-decoration: none; margin: 0 10px; font-size: 14px;">📧 ramsis.icons@gmail.com</a>
      <span style="color: #7f8c8d; margin: 0 5px;">•</span>
      <a href="tel:+14253456483" style="color: #f39c12; text-decoration: none; margin: 0 10px; font-size: 14px;">📞 (425) 345-6483</a>
    </div>
  </div>

</div>
```

## Template Features

✨ **Professional Design**
- Beautiful gradient header with your brand colors
- Clean, organized sections with color-coded backgrounds
- Responsive design that works on all devices

🎨 **Visual Elements**
- Icons for each section (👤 📧 🎨 📝 ⏰)
- Color-coded sections for easy scanning
- Highlighted estimated price badge
- Professional footer with contact information

📱 **Mobile Friendly**
- Responsive design
- Readable fonts and spacing
- Optimized for email clients

## Setup Steps

1. **Copy the Subject Line** above and paste it into the "Subject" field
2. **Copy the HTML Template** above and paste it into the "Content" field
3. **Set Format to HTML** (not plain text)
4. **Save the template**
5. **Test with a sample submission**

Your commission request emails will now look professional and beautiful! 🎨✨