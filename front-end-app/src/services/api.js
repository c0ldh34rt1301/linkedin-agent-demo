/**
 * API Service for Clothes Finder Application
 * 
 * This file handles all communication with the backend REST API.
 * It provides functions to search for clothes and handle color visualization.
 * 
 * Backend API Details:
 * - Endpoint: POST http://localhost:8018/api/search
 * - Request Body: { "request": "search query string" }
 * - Response: Array of clothing items with id, name, type, sizes, colors, brand, description
 */

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Search for clothes using the REST API
 * 
 * Process:
 * 1. Sends POST request to /api/search endpoint
 * 2. Includes search query in request body as "request" field
 * 3. Handles HTTP errors and network issues
 * 4. Returns array of clothing items or empty array
 * 
 * @param {string} query - The search query entered by user
 * @returns {Promise<Array>} - Promise that resolves to array of clothing items
 * @throws {Error} - Throws error if API call fails
 */
export const searchClothes = async (query) => {
    // Base URL for the backend API server
    const API_BASE_URL = 'http://localhost:8018';

    try {
        // Make HTTP POST request to search endpoint
        const response = await fetch(`${API_BASE_URL}/api/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Tell server we're sending JSON
        },
            // Send search query in request body
            body: JSON.stringify({ request: query }),
        });

        // Check if request was successful (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse JSON response from server
        const data = await response.json();
        
        // Ensure the result always returns an array, even if server returns something else
        return Array.isArray(data) ? data : [];
    } catch (error) {
        // Re-throw error with descriptive message for UI to display
        throw new Error(`Search failed: ${error.message}`);
    }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get Tailwind CSS background class for color visualization
 * 
 * This function maps color names to Tailwind CSS classes to create
 * colored squares in the UI. Each color name gets a specific background class.
 * 
 * Process:
 * 1. Convert color name to lowercase for consistent matching
 * 2. Look up color in predefined mapping
 * 3. Return Tailwind CSS class or default gray if not found
 * 
 * @param {string} colorName - The color name from API response (e.g., "blue", "red")
 * @returns {string} - Tailwind CSS class name (e.g., "bg-blue-500")
 */
export const getColorClass = (colorName) => {
  // Color mapping: color name -> Tailwind CSS background class
  const colorMap = {
    // Basic colors
    'black': 'bg-black',
    'white': 'bg-white',
    'blue': 'bg-blue-500',
    'red': 'bg-red-500',
    'green': 'bg-green-500',
    'yellow': 'bg-yellow-400',
    'gray': 'bg-gray-500',
    'grey': 'bg-gray-500',      // Alternative spelling
    
    // Extended colors
    'navy': 'bg-blue-900',      // Dark blue
    'beige': 'bg-amber-100',    // Light brown/tan
    'brown': 'bg-amber-800',    // Medium brown
    'pink': 'bg-pink-400',      // Light red
    'purple': 'bg-purple-500',  // Blue-red mix
    'orange': 'bg-orange-500',  // Red-yellow mix
    
    // Fashion-specific colors
    'khaki': 'bg-yellow-600',   // Military green-brown
    'olive': 'bg-green-700',    // Dark green
    'burgundy': 'bg-red-800',   // Dark red
    'cream': 'bg-yellow-50',    // Off-white
    'charcoal': 'bg-gray-700',  // Dark gray
    'denim': 'bg-blue-600',     // Jean blue
    
    // Special patterns (using gradients for visual interest)
    'plaid': 'bg-gradient-to-r from-red-500 to-blue-500',     // Checkered pattern approximation
    'floral': 'bg-gradient-to-r from-pink-300 to-purple-300', // Flower pattern approximation
  };
  
  // Return mapped class or default gray if color not found
  // toLowerCase() ensures case-insensitive matching
  return colorMap[colorName.toLowerCase()] || 'bg-gray-300';
}; 