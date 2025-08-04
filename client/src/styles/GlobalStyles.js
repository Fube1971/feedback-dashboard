import { createGlobalStyle } from "styled-components";

/**
 * GlobalStyles defines the global CSS rules for the entire application.
 * - Sets up custom font faces ("Adineue" in various weights).
 * - Applies global resets for consistent spacing and layout.
 * - Defines default base styles for elements like body, headings, inputs, buttons, etc.
 * - Ensures a clean, modern visual baseline across all components.
 */

const GlobalStyles = createGlobalStyle`
  /*  Font Face Declarations */
  @font-face {
    font-family: 'Adineue';
    src: url('/fonts/adineue-regular.truetype') format('truetype'),
         url('/fonts/adineue-regular.truetype'), format('truetype'),;
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Adineue';
    src: url('/fonts/adineue-bold.truetype'), format('truetype'),
         url('/fonts/adineue-bold.truetype') format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Adineue';
    src: url('/fonts/adineue-black.truetype') format('truetype'),
         url('/fonts/adineue-black.truetype') format('truetype');
    font-weight: 900;
    font-style: normal;
  }

  /*  Global Reset and Base Box Model */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 10px; /* Base size to make rem scaling easier */
  }

  /*  Global Body Typography */
  body {
    font-family: 'Adineue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
    color: #000;
    background-color: #fff;
  }

  /* Headings and Text Defaults */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 900;
    line-height: 1.2;
  }

  /*  Form Elements Inheritance */
  button {
    font-family: inherit;
    cursor: pointer;
  }

  input, textarea, select {
    font-family: inherit;
  }

  /*  Anchor Style Reset */
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyles;
