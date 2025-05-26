import React, { useState } from 'react';
import { searchClothes, getColorClass } from './services/api';
import './App.css';

/**
 * Main Application Component - Clothes Finder Agent
 * 
 * This component provides a search interface for finding clothing items.
 * Process Flow:
 * 1. User types search query in input field
 * 2. User clicks Search button or presses Enter
 * 3. API call is made to backend server
 * 4. Results are displayed in a responsive table
 * 5. Color squares show available colors with tooltips
 * 
 * Features:
 * - Real-time search with loading states
 * - Error handling and user feedback
 * - Responsive design with Tailwind CSS
 * - Color visualization with squares
 * - Empty state guidance for users
 */
function App() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  // Search query entered by user
  const [searchQuery, setSearchQuery] = useState('');
  
  // Array of clothing items returned from API
  const [searchResults, setSearchResults] = useState([]);
  
  // Loading state to show spinner/disable controls during API call
  const [isLoading, setIsLoading] = useState(false);
  
  // Error message to display if API call fails
  const [error, setError] = useState(null);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handles the search action when user clicks Search button
   * Process:
   * 1. Validates that search query is not empty
   * 2. Sets loading state to true
   * 3. Calls API service to search for clothes
   * 4. Updates results or error state based on response
   * 5. Sets loading state to false
   */
  const handleSearch = async () => {
    // Validate input - ensure user entered something
    if (!searchQuery.trim()) {
      alert('Please enter a search term');
      return;
    }

    // Start loading state - disable controls and show loading message
    setIsLoading(true);
    setError(null);

    try {
      // Call API service to search for clothes
      // This makes POST request to localhost:8018/api/search
      const data = await searchClothes(searchQuery);
      
      // Update results with data from server
      setSearchResults(data);
    } catch (err) {
      // Handle any errors (network, server, parsing, etc.)
      setError(err.message);
      setSearchResults([]); // Clear any previous results
    } finally {
      // Always stop loading, regardless of success or failure
      setIsLoading(false);
    }
  };

  /**
   * Handles input field changes
   * - Updates the search query state
   * - Clears results and errors when input is cleared (for better UX)
   */
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Clear results and error when input is cleared
    // This shows the helpful guidance text again
    if (value.trim() === '') {
      setSearchResults([]);
      setError(null);
    }
  };

  /**
   * Handles Enter key press in search input
   * Allows users to search by pressing Enter instead of clicking button
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // ============================================================================
  // RENDER COMPONENT
  // ============================================================================
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-6">
          
          {/* ============================================================
              HEADER SECTION
              ============================================================ */}
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Clothes Finder Agent
          </h1>
          
          {/* ============================================================
              SEARCH INPUT SECTION
              Input and button are on the same line using flexbox
              ============================================================ */}
          <div className="flex gap-4">
            {/* Search Input Field */}
            <input
              type="text"
              placeholder="Just type anything"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading} // Disable during loading
            />
            
            {/* Search Button */}
            <button 
              onClick={handleSearch}
              disabled={isLoading} // Disable during loading
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              {/* Show different text based on loading state */}
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {/* ============================================================
              ERROR MESSAGE SECTION
              Shows red alert box if API call fails
              ============================================================ */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* ============================================================
              LOADING MESSAGE SECTION
              Shows spinner/loading text while API call is in progress
              ============================================================ */}
          {isLoading && (
            <div className="text-center py-8">
              <div className="text-gray-600">Searching for clothes...</div>
            </div>
          )}

          {/* ============================================================
              NO RESULTS MESSAGE SECTION
              Shows when search returns empty results
              ============================================================ */}
          {!isLoading && searchResults.length === 0 && searchQuery && !error && (
            <div className="text-center py-8">
              <div className="text-gray-600">No results found. Try a different search term.</div>
            </div>
          )}

          {/* ============================================================
              RESULTS TABLE SECTION
              Shows clothing items in a responsive table
              Only visible when we have search results
              ============================================================ */}
          {!isLoading && searchResults.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm mt-4">
                
                {/* Table Header */}
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Brand</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Available Sizes</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Available Colors</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Description</th>
                  </tr>
                </thead>
                
                {/* Table Body - Dynamic rows based on search results */}
                <tbody className="divide-y divide-gray-200">
                  {searchResults.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      
                      {/* Product Name */}
                      <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                      
                      {/* Product Type (e.g., t-shirt, jeans, shoes) */}
                      <td className="px-4 py-3 text-sm text-gray-900">{item.type}</td>
                      
                      {/* Brand Name */}
                      <td className="px-4 py-3 text-sm text-gray-900">{item.brand}</td>
                      
                      {/* Available Sizes - Join array with commas */}
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {Array.isArray(item.sizes) ? item.sizes.join(', ') : item.sizes}
                      </td>
                      
                      {/* Available Colors - Show as colored squares with tooltips */}
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div className="flex gap-2 flex-wrap">
                          {Array.isArray(item.colors) ? (
                            // Multiple colors - create a square for each
                            item.colors.map((color, colorIndex) => (
                              <div
                                key={colorIndex}
                                className={`w-6 h-6 border-2 border-gray-300 rounded ${getColorClass(color)}`}
                                title={color} // Tooltip shows color name on hover
                              ></div>
                            ))
                          ) : (
                            // Single color - create one square
                            <div
                              className={`w-6 h-6 border-2 border-gray-300 rounded ${getColorClass(item.colors)}`}
                              title={item.colors}
                            ></div>
                          )}
                        </div>
                      </td>
                      
                      {/* Product Description */}
                      <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ============================================================
              INITIAL EMPTY STATE SECTION
              Shows helpful guidance when app first loads
              Only visible when no search has been performed
              ============================================================ */}
          {!isLoading && searchResults.length === 0 && !searchQuery && !error && (
            <div className="text-center py-16">
              <div className="text-gray-500 text-lg">
                👕 Start by searching for clothes above! 👗
              </div>
              <div className="text-gray-400 mt-2">
                Try searching for "shirt", "jeans", "shoes", or any clothing item
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
