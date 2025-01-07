"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading"; // Import the Loading component

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 1600); // Redirect after 1.6 seconds

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, [router]);

  return <Loading />; // Render the Loading component
}
