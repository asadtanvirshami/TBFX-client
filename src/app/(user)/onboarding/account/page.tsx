//app/auth/account-recovery/page.tsx
"use client";
import React from "react";

import Image from "next/image";
// import { useTheme } from "next-themes";

import mt4 from "../../../../../public/assets/mt4.png";
import mt5 from "../../../../../public/assets/mt5.png";
import SimpleForm from "@/components/form/trade-account/simple-form";
import { cn } from "@/lib/utils";
const AccountRecoveryPage = () => {
  // const { theme } = useTheme();
  return (
    <div className="relative flex items-center justify-center h-screen w-full overflow-hidden ">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x"></div>

      {/* Content */}
      <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-5 w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden">
        {/* Left Side (Logo) */}
        <div className="hidden md:flex flex-col items-center justify-center p-12 lg:col-span-3 bg-gray-100 dark:bg-gray-900">
          <div className="flex justify-center items-center gap-5">
            <Image
              src={mt4}
              alt="mt4"
              width={220} // Use fixed width and height for better performance
              height={220}
              className={cn("w-32 rounded-4xl")}
            />
            <Image
              src={mt5}
              alt="mt5"
              width={320} // Use fixed width and height for better performance
              height={320}
              className="w-32 rounded-4xl"
            />
          </div>
          <h1 className="text-3xl font-bold mt-4 text-center text-gray-800 dark:text-white">
            MetaTrader 4/5 Integration
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
            We support over 100+ MetaTrader 4/5 brokers to start from.
          </p>
        </div>

        {/* Right Side (Recovery Form) */}
        <div className="flex flex-col items-center justify-center p-8 md:p-12 lg:col-span-2 lg:p-24 w-full">
          <SimpleForm />
        </div>
      </div>
    </div>
  );
};

export default AccountRecoveryPage;
