"use client";
import { useUser } from '@clerk/nextjs';
import React, { useEffect } from 'react';

function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    const checkUser = async () => {
      if (user) {
        const userEmail = user?.primaryEmailAddress?.emailAddress;
        const userFullName = user.fullName;  // Ensure this is passed as fullName
        const userImageUrl = user?.imageUrl;

        console.log('User data:', { email: userEmail, fullName: userFullName, imageUrl: userImageUrl });

        if (userEmail && userFullName) {
          try {
            const response = await fetch('/api/checkUser', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: userEmail,
                fullName: userFullName,  // Ensure you're sending fullName
                imageUrl: userImageUrl,
              }),
            });

            const result = await response.json();
            if (result.success) {
              console.log('User checked/added successfully');
            } else {
              console.error('Failed to check/add user:', result.error || 'No error message');
            }
          } catch (error) {
            console.error('Error during checkUser API call:', error);
          }
        }
      }
    };

    if (user) {
      checkUser();
    }

    return () => {
      // Cleanup logic if needed
    };
  }, [user]);

  return <div>{children}</div>;
}

export default Provider;
