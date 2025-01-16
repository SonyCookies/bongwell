import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#001830] text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Image
              className="h-10"
              src="/bongwell-solutions-logo.svg"
              alt="BongWell Solutions"
              width={40} 
              height={40}
            />

            <p className="text-gray-400 text-base">
              Providing innovative water solutions for a sustainable future.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#00a5b5]">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00a5b5]">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00a5b5]">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00a5b5]">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-[#00a5b5] tracking-wider uppercase">
                  Solutions
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/services"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Well Drilling
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Water Treatment
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Pump Installation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Maintenance
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-[#00a5b5] tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/projects"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2024 BongWell Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
