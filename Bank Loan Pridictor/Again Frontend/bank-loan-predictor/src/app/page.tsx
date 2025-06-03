// src/app/page.tsx
'use client'; // Keep this line as LoanForm and context are client-side

import LoanForm from '../components/LoanForm';
import { LoanApplicationProvider } from '../context/LoanApplicationContext';

export default function Home() {
  return (
    <LoanApplicationProvider>
      {/*
        Removed restrictive flex, justify-between, items-center.
        Adjusted padding to be more flexible or removed it if the form itself handles it.
        Using a simpler container that allows the form to dictate its own layout within.
        You might want to add a top padding (e.g., pt-8 or pt-16) to push content down from the very top.
      */}
      <main className="min-h-screen py-8"> {/* Adjusted padding to be vertical only and less aggressive */}
        <LoanForm />
      </main>
    </LoanApplicationProvider>
  );
}