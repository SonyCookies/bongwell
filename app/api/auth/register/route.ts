import { NextResponse } from 'next/server';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/app/lib/firebase-config";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ user: { uid: user.uid, email: user.email, name }}, { status: 200 });
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
