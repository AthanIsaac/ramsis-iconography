# Ramsis Iconography Website

A sleek React website for Coptic iconographer George Ramsis, showcasing sacred art and providing commission services.

## Features

- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Sacred Art Gallery**: Organized gallery with category filtering
- **About Page**: Detailed artist biography with photo section
- **Contact Form**: Professional contact form for commissions
- **Upload-Ready Structure**: Pre-configured folders for easy image management

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd ramsis-iconography
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the website

## Adding Images

### Iconographer Photo (About Page)

1. Navigate to `src/assets/images/`
2. Upload George Ramsis's photo (recommended: `george-ramsis.jpg`)
3. Update the About page component (`src/pages/About.js`) to reference the actual image:

```jsx
// Replace the image placeholder div with:
<img 
  src="/src/assets/images/george-ramsis.jpg" 
  alt="George Ramsis" 
  className="profile-photo"
/>
```

### Icon Samples (Gallery Page)

1. Navigate to `public/uploads/icons/`
2. Upload your icon images (JPG, PNG, or WEBP format recommended)
3. Update the `iconSamples` array in `src/pages/Gallery.js`:

```jsx
const iconSamples = [
  { 
    id: 1, 
    title: 'Christ Pantocrator', 
    category: 'christ', 
    description: 'Traditional Byzantine style icon of Christ the Ruler of All',
    image: '/uploads/icons/christ-pantocrator.jpg' // Add this line
  },
  // ... add image paths to other entries
];
```

4. Update the Gallery component to display actual images:

```jsx
// Replace image placeholder with:
<img 
  src={icon.image} 
  alt={icon.title}
  className="gallery-image"
/>
```

## Folder Structure

```
ramsis-iconography/
├── public/
│   ├── uploads/
│   │   └── icons/          # Upload icon samples here
│   └── ...
├── src/
│   ├── assets/
│   │   ├── images/         # Upload iconographer photo here
│   │   └── icons/          # Additional icon assets
│   ├── components/
│   │   ├── Header.js       # Navigation component
│   │   └── Footer.js       # Footer component
│   ├── pages/
│   │   ├── Home.js         # Homepage
│   │   ├── About.js        # About page with photo section
│   │   ├── Gallery.js      # Gallery with upload structure
│   │   └── Contact.js      # Contact form
│   └── ...
```

## Customization

### Colors and Branding
The website uses a gold and dark theme appropriate for sacred art. Main colors:
- Primary Gold: `#d4af37`
- Light Gold: `#f4e4bc`
- Dark Background: `#1a1a1a`

### Content Updates
- **Artist Information**: Update `src/pages/About.js`
- **Contact Details**: Update `src/pages/Contact.js`
- **Services**: Update `src/pages/Home.js`

### Adding New Gallery Categories
Update the `categories` array in `src/pages/Gallery.js`:

```jsx
const categories = [
  { id: 'all', name: 'All Works' },
  { id: 'new-category', name: 'New Category' },
  // ... existing categories
];
```

## Deployment

### Build for Production
```bash
npm run build
```

This creates a `build` folder with optimized files ready for deployment.

### Deployment Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **Traditional Hosting**: Upload `build` folder contents to your web server

## Technical Details

- **Framework**: React 18
- **Routing**: React Router DOM
- **Styling**: Pure CSS with modern features
- **Responsive**: Mobile-first design approach
- **Accessibility**: WCAG compliant with proper focus management

## Support

For technical support or customization requests, please refer to the React documentation or contact your web developer.

## License

This project is created specifically for Ramsis Iconography. All rights reserved.
