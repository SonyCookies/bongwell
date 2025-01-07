"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { useFirebase } from "@/app/hooks/useFirebase";
import Loading  from "@/app/components/Loading";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { isInitialized, auth } = useFirebase();

  useEffect(() => {
    if (isInitialized) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setTimeout(() => setLoading(false), 1000);
      });

      return () => unsubscribe();
    }
  }, [isInitialized, auth]);

  useEffect(() => {
    if (!loading && isInitialized) {
      if (
        user &&
        (pathname === "/auth/login" || pathname === "/auth/register")
      ) {
        router.push("/admin/dashboard");
      } else if (
        !user &&
        pathname !== "/auth/login" &&
        pathname !== "/auth/register"
      ) {
        router.push("/auth/login");
      }
    }
  }, [user, loading, isInitialized, router, pathname]);

  if (loading || !isInitialized) {
    return <Loading />;
  }

  return <>{children}</>;
}
