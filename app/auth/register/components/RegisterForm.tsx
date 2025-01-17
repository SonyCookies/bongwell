'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { AlertCircle, Mail, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import zxcvbn from 'zxcvbn';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    setError('');

    if (data.password !== data.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();

      if (response.ok) {
        router.push('/auth/login?registered=true');
      } else {
        setError(responseData.error || 'Registration failed. Please try again.');
      }
    } catch (_) {
      setError('An unexpected error occurred');
    }
  };

  const checkPasswordStrength = (password: string) => {
    const result = zxcvbn(password);
    setPasswordStrength(result.score);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit(onSubmit)} 
      className="mt-8 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4">
        <div className="relative">
          <label htmlFor="name" className="sr-only">
            Full Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Full name is required" })}
            type="text"
            className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00a5b5] focus:border-transparent transition duration-300 ease-in-out pl-10 bg-opacity-80 backdrop-filter backdrop-blur-md"
            placeholder="Full Name"
          />
          <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div className="relative">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            type="email"
            autoComplete="email"
            className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00a5b5] focus:border-transparent transition duration-300 ease-in-out pl-10 bg-opacity-80 backdrop-filter backdrop-blur-md"
            placeholder="Email address"
          />
          <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div className="relative">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            {...register("password", { 
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long"
              },
              validate: (value) => {
                const result = zxcvbn(value);
                return result.score >= 3 || "Password is too weak. Please choose a stronger password.";
              },
              onChange: (e) => checkPasswordStrength(e.target.value)
            })}
            type="password"
            autoComplete="new-password"
            className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00a5b5] focus:border-transparent transition duration-300 ease-in-out pl-10 bg-opacity-80 backdrop-filter backdrop-blur-md"
            placeholder="Password"
          />
          <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          {password && (
            <div className="mt-1">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">Password strength:</span>
                <span className={`text-xs font-semibold ${
                  passwordStrength === 0 ? "text-red-600" :
                  passwordStrength === 1 ? "text-orange-600" :
                  passwordStrength === 2 ? "text-yellow-600" :
                  passwordStrength === 3 ? "text-green-600" :
                  "text-emerald-600"
                }`}>
                  {passwordStrength === 0 && "Very Weak"}
                  {passwordStrength === 1 && "Weak"}
                  {passwordStrength === 2 && "Fair"}
                  {passwordStrength === 3 && "Good"}
                  {passwordStrength === 4 && "Strong"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    passwordStrength === 0 ? "bg-red-600" :
                    passwordStrength === 1 ? "bg-orange-600" :
                    passwordStrength === 2 ? "bg-yellow-600" :
                    passwordStrength === 3 ? "bg-green-600" :
                    "bg-emerald-600"
                  }`}
                  style={{ width: `${(passwordStrength / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <label htmlFor="confirm-password" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            {...register("confirmPassword", { 
              required: "Please confirm your password",
              validate: (value) => value === password || "Passwords do not match"
            })}
            type="password"
            autoComplete="new-password"
            className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00a5b5] focus:border-transparent transition duration-300 ease-in-out pl-10 bg-opacity-80 backdrop-filter backdrop-blur-md"
            placeholder="Confirm Password"
          />
          <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
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
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#00a5b5] to-[#008999] hover:from-[#008999] hover:to-[#00a5b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00a5b5] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register
        </motion.button>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <a href="/auth/login" className="font-medium text-[#00a5b5] hover:text-[#008999] transition duration-300 ease-in-out">
            Login here
          </a>
        </p>
      </div>
    </motion.form>
  );
}

