'use client';

import { LoanProvider } from '@/context/LoanContext';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <LoanProvider>{children}</LoanProvider>;
}