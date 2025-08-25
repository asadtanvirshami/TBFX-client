import { Button } from "@/components/ui/button";
import React, { memo } from "react";

import premium from "../../../../../../../public/assets/premium_badge/badge.svg";
import Image from "next/image";

const PremiumStrip = () => {
  return (
    <div>
      <div className="bg-gradient-to-r text-white from-pink-500 to-rose-500 flex justify-between items-center max-w-2xl border p-3 rounded-md gap-8">
        <div className="flex flex-col w-full p-2 space-y-4">
          <span className="font-bold text-3xl flex ">
            <h1>Upgrade to Premium</h1>
            <Image src={premium} alt="premium_badge" className="w-22" />
          </span>
          <p className="text-sm">
            Unlock exclusive features and benefits with our premium plan. Enjoy
            an enhanced user experience, priority support, and more.
          </p>
          <span className="flex gap-4 justify-end">
            <Button className="relative border w-fit overflow-hidden px-6 py-5 text-rose-500 dark:hover:text-white cursor-pointer rounded-md font-semibold group">
              <span className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-rose-500  transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 text-lg">
                Upgrade Now!
              </span>
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(PremiumStrip);
