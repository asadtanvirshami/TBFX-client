"use client";

import React from "react";
import { useTheme } from "next-themes";

import ShootingStars from "@/components/ui/shooting-stars";
import ResetForm from "./form/reset-from";

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
        <div className="relative z-10 max-w-8xl mx-auto bg-blur overflow-hidden">
          {/* Right Side (Form) */}
          <div className="flex flex-col items-center justify-center p-8 md:p-12 lg:col-span-2 lg:p-24 w-full">
            <ResetForm />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignInPage;
