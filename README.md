# Retail Live Feedback Dashboard

## Project Overview and Goals

This is a full-stack retail feedback collection system designed to allow customers to quickly and anonymously share their shopping experience using a QR-based form. It supports real-time visualization and moderation of feedback, helping store managers and marketing teams act promptly and showcase positive experiences in-store.

The solution was developed during a technical test by:

- Bryam Alexander Barreto Leguizamo  
- Daniela Fuentes Bello  
- Juan Sebastián Rodríguez Rodríguez

**Core goals:**

- Provide a fast, frictionless feedback channel via mobile
- Enable real-time comment moderation by admins
- Display dynamic charts and animations for customer metrics
- Integrate the solution seamlessly with the Adidas brand experience

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [https://github.com/Fube1971/ignite-feedback-dashboard]
   cd [your-project-folder]
   ```

2. Install dependencies:
   ```bash
   npm install
   npm install react react-dom
   npm install styled-components
   npm install framer-motion
   npm install recharts
   npm install firebase
   ```

3. Start the development server (Vite setup):
    [Bash must run inside the root folder that us ADIDAS-RETAIL-FEEDBACK]
   ```bash
   cd client
   npm run dev
   ```

4. Firebase setup:

   - Firebase is used for authentication and database (Firestore)
   - An admin user is already configured:
     ```
     Email: proyectadiclas@gmail.com  
     Password: Contrasenia123*
     ```
   - Only Firebase-authenticated users can access the admin panel. Because of the protected routes.
   - To connect your own Firebase project, go to:
     ```
     /client/src/services/firebase.js
     ```
     and replace the existing configuration with your own Firebase project credentials.

Make sure your Firestore rules allow access only to authenticated users with admin privileges.

    It must have rules like 
    // Anyone can submit
      
      // Public read: only approved + consented
      // Admin read: if authenticated
      and macth the databse : feedbacks

## Technologies Used
Install Dependencies for each one!
- React 
- Styled-Components 
- Framer Motion 
- Recharts  
- Firebase Firestore 
- Firebase Authentication

## System Structure

**Main Modules:**

- `FeedbackForm`: QR-accessible public survey form (mobile-first)
- `AdminDashboard`: Admin panel to moderate comments and view stats
- `DisplayPage`: Auto-playing carousel of animated charts and feedback

**Charts include:**

- General Rating (Stacked shoebox bars)
- Product Availability (Animated bouncing balls)
- Staff Rating (Horizontal rating bar with logo)
- Wait Time (Shirts stacked on virtual racks)
- Experience Treemap (Treemap with shoebox images)
- Floating Comments
- Feedback QR slide

## Security and Access

- Only pre-authorized users can access moderation tools
- Feedback submissions are anonymized, and comment visibility is manually approved

## Known Issues / Limitations

- Users cannot create new accounts from the interface — this is intentional to ensure only verified admins access moderation tools
- The "Forgot Password" / reset feature is not yet implemented
- The system is currently designed for local development only (no SSL or domain configured)

## Design Assets Disclaimer
All logos, branding elements, and design graphics used in this project are proprietary resources of Adidas. They are included strictly for the purpose of the Adidas Ignite Selection Process and should not be reused or redistributed outside of this context.
