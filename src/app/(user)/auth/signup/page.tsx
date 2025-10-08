// app/auth/signup/page.tsx
"use client";

import React from "react";
import SignUpForm from "./form/signup-form";
import ShootingStars from "@/components/ui/shooting-stars";
import OfferSection from "@/components/ui/landing-layout/offer-section";

const SignUpPage = () => {
  return (
    <div className="relative flex items-center justify-center h-screen w-full overflow-hidden">
      {/* Shooting Stars Background */}
      <div className="z-10">
        <ShootingStars />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x"></div>

      {/* Content */}
      <div className="relative z-10 grid md:grid-cols-1 lg:grid-cols-5 max-w-8xl mx-auto bg-blur overflow-hidden">
        {/* Left Side (Logo & Text) */}
        <div className="hidden rounded-lg md:flex flex-col items-center justify-center p-12 lg:col-span-3 bg-gray-100 bg-transparent">
          <OfferSection />
        </div>

        {/* Right Side (Form) */}
        <div className="flex flex-col items-center justify-center p-8 md:p-12 lg:col-span-2 lg:p-24 w-full">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
