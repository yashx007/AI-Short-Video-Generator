"use client";
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import Provider from './provider';

export default function Providers({ children }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    // Render children without Clerk during build or when key is absent
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <Provider>{children}</Provider>
    </ClerkProvider>
  );
}
