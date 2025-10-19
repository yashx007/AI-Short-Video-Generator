"use client";
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import Provider from './provider';

export default function ClerkProviderClient({ children }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // If the publishable key is not set (e.g., during static build), avoid
  // mounting ClerkProvider so build-time doesn't throw. In that case we
  // simply render children without Clerk context. The consumer components
  // that rely on Clerk should handle absence of user gracefully.
  if (!publishableKey) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <Provider>{children}</Provider>
    </ClerkProvider>
  );
}
