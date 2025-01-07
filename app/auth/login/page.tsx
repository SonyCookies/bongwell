import LoginForm from '@/app/auth/login/components/LoginForm'
import LoginHeader from '@/app/auth/login/components/LoginHeader'
import { BackgroundPattern } from '@/app/components/BackgroundPattern'

export default function AuthLoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <BackgroundPattern />
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#002040] p-8 rounded-lg shadow-2xl relative z-10 backdrop-filter backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80">
        <LoginHeader />
        <LoginForm />
      </div>
    </div>
  )
}

