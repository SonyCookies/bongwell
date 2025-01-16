import { NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase-config";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Authenticate the user with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get the token from Firebase
    const token = await user.getIdToken();

    // Respond with the token (frontend can decide how to use it)
    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Invalid email or password." },
      { status: 401 }
    );
  }
}
