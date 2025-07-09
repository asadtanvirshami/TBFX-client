"use client";

import React from "react";
import SignInForm from "@/app/(user)/auth/signin/form/signin-form";
import Image from "next/image";
import { useTheme } from "next-themes";

import dark_logo from "../../../../../public/assets/dark.png";
import light_logo from "../../../../../public/assets/light.png";
import OfferSection from "@/components/ui/landing-layout/offer-section";

const SignInPage = () => {
  const { theme } = useTheme();

  return (
    <React.Fragment>
      <div className="relative flex items-center justify-center h-screen w-full overflow-hidden ">
        {/* Animated Background */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x"></div>

        {/* Content */}
        <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-5 w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden">
          {/* Left Side (Logo) */}
          <div className="hidden md:flex flex-col items-center justify-center p-12 lg:col-span-3 bg-gray-100 dark:bg-gray-900">
            <Image
              src={theme === "dark" ? dark_logo : light_logo}
              alt="Logo"
              width={320} // Use fixed width and height for better performance
              height={320}
              className="w-80"
            />
            <h1 className="text-3xl font-bold mt-4 text-center text-gray-800 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
              Sign in to access your account and continue your journey.
            </p>
          </div>

          {/* Right Side (Sign-In Form) */}
          <div className="flex flex-col items-center justify-center p-8 md:p-12 lg:col-span-2 lg:p-24 w-full">
            <SignInForm />
          </div>
        </div>
      </div>
      <OfferSection />
    </React.Fragment>
  );
};

export default SignInPage;
