"use client";

import React from "react";
import SignInForm from "@/app/(user)/auth/signin/form/signin-form";
import Image from "next/image";
import { useTheme } from "next-themes";

import dark_logo from "../../../../../public/assets/dark.png";
import light_logo from "../../../../../public/assets/light.png";
import OfferSection from "@/components/ui/landing-layout/offer-section";
import ShootingStars from "@/components/ui/shooting-stars";

const SignInPage = () => {
  const { theme } = useTheme();

  return (
    <React.Fragment>
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
            {/* <Image
              src={theme === "dark" ? dark_logo : light_logo}
              alt="Logo"
              width={320}
              height={320}
              className="w-80"
            /> */}
            <OfferSection />
          </div>

          {/* Right Side (Form) */}
          <div className="flex flex-col items-center justify-center p-8 md:p-12 lg:col-span-2 lg:p-24 w-full">
            <SignInForm />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignInPage;
