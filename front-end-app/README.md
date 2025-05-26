# Clothes Finder Agent

A modern React web application for searching and browsing clothing items with an intuitive interface and visual color representation.

## 🚀 Features

- **Smart Search**: Full-width search input for finding clothes
- **Visual Color Display**: Color squares with tooltips instead of text
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS for beautiful styling
- **Product Table**: Comprehensive display of clothing items with details like:
  - Name, Type, Brand
  - Available Sizes and Colors
  - Product Description

## 🏗️ Architecture Overview

### Frontend-Backend Communication
```
[React App] ←→ [REST API] ←→ [Backend Server]
   (3000)       (8018)
```

### Process Flow
1. **User Input**: User types search query and clicks Search or presses Enter
2. **API Call**: Frontend sends POST request to `localhost:8018/api/search`
3. **Data Processing**: Backend searches for clothes and returns JSON array
4. **UI Update**: Frontend displays results in responsive table with color squares
5. **Reset**: User can clear input to return to initial state

### Key Components
- **App.js**: Main React component with search logic and UI
- **api.js**: Service layer for REST API communication
- **Tailwind CSS**: Utility-first styling framework
- **Color Mapping**: Dynamic color square generation

## 📋 Prerequisites

Before running this application, you need to have Node.js and npm installed on your system.

### Installing Node.js and npm

1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version
3. Run the installer and follow the setup wizard
4. Restart your computer after installation

#### Verify Installation

Open your terminal/command prompt and run:

```bash
node --version
npm --version
```

You should see version numbers for both commands.

## 🛠️ Installation & Setup

1. **Clone or download the project**

   ```bash
   git clone <repository-url>
   cd clothes-finder-front-end-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This will install all required packages including React, Tailwind CSS, and other dependencies.

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Access the application**
   - The app will automatically open in your default browser
   - If not, manually navigate to: [http://localhost:3000](http://localhost:3000)
   - The app will hot-reload when you make changes to the code

## 🛠️ Technologies Used

- **React 19.1.0** - Frontend framework
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **Create React App** - Development toolchain
- **JavaScript ES6+** - Programming language

## 📁 Project Structure

```
clothes-finder-front-end-app/
├── public/                    # Static assets
├── src/
│   ├── services/
│   │   └── api.js            # API service layer
│   ├── App.js                # Main React component
│   ├── App.css               # Component styles
│   ├── index.js              # React entry point
│   └── index.css             # Global styles with Tailwind
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind configuration
└── README.md                # This documentation
```

## 🔍 Code Structure Explained

### Main App Component (`src/App.js`)

```javascript
// State Management
- searchQuery: Current search input
- searchResults: Array of clothes from API
- isLoading: Loading state for UI feedback
- error: Error messages for user

// Key Functions
- handleSearch(): Calls API and updates results
- handleInputChange(): Manages input and clears results when empty
- handleKeyPress(): Enables Enter key search
```

### API Service (`src/services/api.js`)

```javascript
// Main Functions
- searchClothes(query): Makes POST request to backend
- getColorClass(colorName): Maps color names to CSS classes

// Request Format
POST /api/search
Body: { "request": "search query" }

// Response Format
[{
  "id": 1,
  "name": "Product name",
  "type": "clothing type",
  "sizes": ["S", "M", "L"],
  "colors": ["red", "blue"],
  "brand": "Brand name",
  "description": "Product description"
}]
```

## 🚨 Troubleshooting

### Backend Connection Issues

```bash
# Check if backend is running on port 8018
curl -X POST http://localhost:8018/api/search \
  -H "Content-Type: application/json" \
  -d '{"request":"test"}'
```

### Port 3000 is already in use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or start on different port
PORT=3001 npm start
```

### npm install fails

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Tailwind styles not working

Make sure the Tailwind directives are in `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### API Request Format Issues

Ensure your backend expects this format:

```json
{
  "request": "search query string"
}
```

**Happy Coding! 🎉**
