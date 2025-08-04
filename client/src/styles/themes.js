/**
 * Defines the base theme settings for the application, 
 * including font families and font weights.
 * 
 * This file can be imported into styled-components' ThemeProvider 
 * to ensure design consistency across components.
 */

export const theme = {
  // 🅐 Font family configurations
  fonts: {
    primary:
      "'Adineue', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", // Main font stack
    fallback: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",    // Used as a backup if Adineue fails
  },

  // 🅑 Standardized font weight definitions
  fontWeights: {
    normal: 400, // Regular weight
    bold: 700,   // Bold weight
    black: 900,  // Extra bold / heavy weight
  },
};
