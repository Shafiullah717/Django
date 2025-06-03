// src/components/NavBar.tsx
import Link from 'next/link';
import React from 'react';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-blue-700 p-4 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
            Loan Predictor
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-lg hover:text-blue-200 transition-colors">
              Apply for Loan
          </Link>
          <Link href="/dashboard" className="text-lg hover:text-blue-200 transition-colors">
              Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;