"use client";

import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="fixed bottom-0 left-0 w-full py-4 px-8 flex items-center justify-between bg-white/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 text-sm z-30 shadow backdrop-blur-md">
      <span>© 2025 Hydrogen LCA. All rights reserved.</span>
      <div>
        <Link href="#" className="mr-6 hover:underline">
          Privacy Policy
        </Link>
        <Link href="#" className="hover:underline">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
