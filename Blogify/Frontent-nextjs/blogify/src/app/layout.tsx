import '../styles/globals.css';
// src/app/layout.tsx
import { AuthProvider } from '../context/AuthContext';

export const metadata = {
  title: 'Likho Express Freely - لکھو', // ✅ Update this to your desired title
  description: 'A description of my website for SEO and social sharing',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
