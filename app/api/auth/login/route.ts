import { NextResponse } from 'next/server';
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth } from '@/app/lib/firebase-config';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await setPersistence(auth, browserSessionPersistence);

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();

    return NextResponse.json({ token, uid: user.uid }, { status: 200 });
  } catch (error) {

    if (error && typeof error === 'object' && 'code' in error) {
      const authError = error as { code: string };
      switch (authError.code) {
        case 'auth/user-not-found':
          return NextResponse.json({ error: 'Email does not exist' }, { status: 404 });
        case 'auth/wrong-password':
          return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
        case 'auth/too-many-requests':
          return NextResponse.json({ error: 'Too many login attempts. Please try again later' }, { status: 429 });
        case 'auth/invalid-credential':
          return NextResponse.json({error: 'Incorrect credentials. Please try again'}, {status: 400});
        default:
          return NextResponse.json({ error: 'Login failed: ' + authError.code }, { status: 400 });
      }
    }

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
