"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, Mail, Lock } from 'lucide-react';
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase-config";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get("registered") === "true";

  const MAX_LOGIN_ATTEMPTS = 3;
  const LOCKOUT_DURATION = 60; // in seconds

  useEffect(() => {
    const storedLockoutTime = localStorage.getItem("lockoutTime");
    const storedLoginAttempts = localStorage.getItem("loginAttempts");

    if (storedLockoutTime) {
      const parsedLockoutTime = parseInt(storedLockoutTime, 10);
      setLockoutTime(parsedLockoutTime);

      const currentTime = Math.floor(Date.now() / 1000);
      const timeLeft = Math.max(0, LOCKOUT_DURATION - (currentTime - parsedLockoutTime));
      setRemainingTime(timeLeft);
    }

    if (storedLoginAttempts) {
      setLoginAttempts(parseInt(storedLoginAttempts, 10));
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (lockoutTime > 0) {
      timer = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000);
        const timeLeft = Math.max(0, LOCKOUT_DURATION - (currentTime - lockoutTime));
        setRemainingTime(timeLeft);
        if (timeLeft === 0) {
          setLockoutTime(0);
          setLoginAttempts(0);
          setError("");
          localStorage.removeItem("lockoutTime");
          localStorage.removeItem("loginAttempts");
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [lockoutTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (lockoutTime > 0) {
      setError(
        `Account is locked. Please try again in ${remainingTime} seconds.`
      );
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Current User:", auth.currentUser); 
      const token = await user.getIdToken();
      
      securelyStoreToken(token); 
      setLoginAttempts(0);
      sessionStorage.removeItem("loginAttempts");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      sessionStorage.setItem("loginAttempts", newAttempts.toString());

      if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
        const currentTime = Math.floor(Date.now() / 1000);
        setLockoutTime(currentTime);
        sessionStorage.setItem("lockoutTime", currentTime.toString());
        setError(
          `Maximum login attempts reached. Account locked for ${LOCKOUT_DURATION} seconds.`
        );
      } else {
        setError("Invalid email or password.");
      }
    }
  };

  const securelyStoreToken = (token: string) => {
    // Implement secure token storage here (e.g., using cookies)
    console.log("Token:", token); // Replace with secure storage mechanism
  };


  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mt-8 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {justRegistered && (
        <motion.div
          className="text-green-500 text-sm flex items-center bg-green-100 p-3 rounded-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AlertCircle className="w-5 h-5 mr-2" />
          Registration successful! Please log in.
        </motion.div>
      )}

      <div className="space-y-4">
        <div className="relative">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00a5b5] focus:border-transparent transition duration-300 ease-in-out pl-10 bg-opacity-80 backdrop-filter backdrop-blur-md"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="relative">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00a5b5] focus:border-transparent transition duration-300 ease-in-out pl-10 bg-opacity-80 backdrop-filter backdrop-blur-md"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {error && (
        <motion.div
          className="text-red-500 text-sm flex items-center bg-red-100 p-3 rounded-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </motion.div>
      )}

      <div>
        <motion.button
          type="submit"
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#00a5b5] to-[#008999] hover:from-[#008999] hover:to-[#00a5b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00a5b5] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={lockoutTime > 0}
        >
          {lockoutTime > 0 ? `Locked (${remainingTime}s)` : "Sign in"}
        </motion.button>
        {loginAttempts > 0 && lockoutTime === 0 && (
          <p className="text-sm text-yellow-600 mt-2">
            Remaining attempts: {MAX_LOGIN_ATTEMPTS - loginAttempts}
          </p>
        )}
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <a
            href="/auth/register"
            className="font-medium text-[#00a5b5] hover:text-[#008999] transition duration-300 ease-in-out"
          >
            Register here
          </a>
        </p>
      </div>
    </motion.form>
  );
}

