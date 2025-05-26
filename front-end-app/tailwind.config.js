/**
 * Tailwind CSS Configuration File
 * 
 * This file configures Tailwind CSS for the Clothes Finder application.
 * Tailwind CSS is a utility-first CSS framework that provides low-level
 * utility classes to build custom designs directly in HTML/JSX.
 * 
 * Configuration details:
 * - Content: Tells Tailwind which files to scan for class names
 * - Theme: Customizes the default Tailwind design system
 * - Plugins: Extends Tailwind with additional functionality
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ============================================================================
  // CONTENT CONFIGURATION
  // ============================================================================
  
  // Tell Tailwind which files to scan for class names
  // This enables "purging" - removing unused CSS in production builds
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/JSX/TS/TSX files in src directory
  ],
  
  // ============================================================================
  // THEME CONFIGURATION
  // ============================================================================
  
  // Customize the default Tailwind design system
  theme: {
    extend: {
      // Custom extensions to the default theme go here
      // Currently using default Tailwind theme without modifications
      
      // Examples of what could be added:
      // colors: { 'custom-blue': '#1e40af' }
      // fontFamily: { 'custom': ['Roboto', 'sans-serif'] }
      // spacing: { '72': '18rem' }
    },
  },
  
  // ============================================================================
  // PLUGINS CONFIGURATION
  // ============================================================================
  
  // Additional Tailwind plugins for extended functionality
  plugins: [
    // No plugins currently installed
    // Popular plugins include:
    // - @tailwindcss/forms (for better form styling)
    // - @tailwindcss/typography (for rich text content)
    // - @tailwindcss/aspect-ratio (for responsive aspect ratios)
  ],
} 