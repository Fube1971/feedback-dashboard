// client/src/reportWebVitals.js

/**
 * reportWebVitals
 * Optional utility to measure performance metrics using Google's Web Vitals API.
 * Only runs if a callback function is provided.
 * 
 * You can log results to the console or send them to an analytics endpoint.
 */

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import 'web-vitals' to avoid loading unless needed
    import('web-vitals').then(
      ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);   // Cumulative Layout Shift
        getFID(onPerfEntry);   // First Input Delay
        getFCP(onPerfEntry);   // First Contentful Paint
        getLCP(onPerfEntry);   // Largest Contentful Paint
        getTTFB(onPerfEntry);  // Time to First Byte
      }
    );
  }
};

export default reportWebVitals;
