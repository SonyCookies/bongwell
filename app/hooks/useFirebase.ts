import { useEffect, useState } from 'react';
import { app, auth, db } from '@/app/lib/firebase-config';

export function useFirebase() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        await app;
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize Firebase:', error);
      }
    };

    initializeFirebase();
  }, []);

  return { isInitialized, auth, db };
}

