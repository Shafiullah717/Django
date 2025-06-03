// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css'; // Your global styles

// Import the new NavBar component
import NavBar from '../components/NavBar';

export const metadata: Metadata = {
  title: 'Loan Prediction App',
  description: 'Predict loan status and view past predictions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Render the NavBar at the top of every page */}
        <NavBar />
        {/* The children prop will render the content of your page.tsx or dashboard/page.tsx */}
        {children}
      </body>
    </html>
  );
}