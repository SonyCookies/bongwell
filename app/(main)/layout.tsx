import "../globals.css";
import { Inter } from "next/font/google";
import { Navigation } from "../components/Navigation";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BongWell Solutions",
  description: "Expert well drilling and water pump installation services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f0f8ff] dark:bg-[#001830]`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
