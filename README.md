# 🍽️ Restaurant Voting App

A simple, responsive web application for voting on restaurants for company parties. Built with React 18, Tailwind CSS, and designed for easy deployment on GitHub Pages.

## ✨ Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Restaurant Cards**: Beautiful cards with images, descriptions, and details
- **Google Maps Integration**: Embedded maps for each restaurant location
- **Vote Tracking**: Local storage to track user votes
- **Google Forms Integration**: Direct voting through Google Forms
- **Modern UI**: Clean, professional interface using Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Voting_Res.git
   cd Voting_Res
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the app

## 📝 Customization

### Adding/Editing Restaurants

Edit the `src/data/restaurants.js` file to add or modify restaurant data:

```javascript
{
  id: 5,
  name: "Your Restaurant Name",
  cuisine: "Cuisine Type",
  address: "Full Address",
  description: "Description of the restaurant",
  image: "https://your-image-url.jpg",
  mapEmbedUrl: "https://google-maps-embed-url",
  priceRange: "$$",
  capacity: "50+ guests",
  specialties: ["Dish 1", "Dish 2", "Dish 3"],
  votingUrl: "https://forms.gle/your-google-form-id"
}
```

### Setting Up Google Forms

1. Create a Google Form for each restaurant
2. Add questions like "Restaurant Choice", "Name", "Email", etc.
3. Get the form's public URL
4. Update the `votingUrl` in the restaurant data

### Getting Google Maps Embed URL

1. Go to [Google Maps](https://maps.google.com)
2. Search for the restaurant
3. Click "Share" → "Embed a map"
4. Copy the iframe src URL
5. Use this URL as `mapEmbedUrl` in your restaurant data

## 🚀 Deployment

### Deploy to GitHub Pages

1. **Update repository name in `vite.config.js`**
   ```javascript
   base: '/your-repository-name/',
   ```

2. **Build and deploy**
   ```bash
   npm run build
   npm run deploy
   ```

3. **Enable GitHub Pages**
   - Go to your repository Settings
   - Navigate to Pages section
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch

### Alternative: Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder** to your hosting provider

## 🎨 Customization Options

- **Colors**: Modify Tailwind classes in components
- **Layout**: Adjust grid columns in `src/App.jsx`
- **Styling**: Update component styles in `src/components/`
- **Branding**: Add your company logo and colors

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server
- **Google Forms**: Vote collection
- **Google Maps**: Location embedding
- **GitHub Pages**: Free hosting

## 📱 Mobile Responsive

The app is fully responsive and works great on:
- 📱 Mobile phones (portrait & landscape)
- 📱 Tablets
- 💻 Laptops & desktops

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify all URLs in restaurant data are correct
3. Ensure Google Forms are publicly accessible
4. Check that images are accessible via HTTPS

---

**Happy voting! 🗳️✨**
