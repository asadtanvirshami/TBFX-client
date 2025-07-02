import { Button } from "@/components/ui/button";
import React from "react";

const Overview = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 mt-12">
      <span className="text-4xl space-x-3 flex-none md:flex lg:flex md:text-5xl  font-extrabold tracking-tight">
        <h1 className="t bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          One Platform.
        </h1>
        <h1>All Your Trading Tools.</h1>
      </span>
      <p className="text-lg md:text-xl mt-8 font-light">
        TradingBacktesting is the ultimate all-in-one solution for traders and
        investors. Backtest your strategies, get live news, calculate lot sizes,
        stay synced with MetaTrader, track calendars, and much more everything
        you need, in one powerful platform. TradingBacktesting equips you with
        every essential tool in one intuitive dashboard eliminating the need to
        juggle between multiple apps or services.
      </p>
      <div className="flex justify-center gap-4 pt-6 flex-wrap">
        <Button className="relative overflow-hidden px-6 py-3 text-rose-500 dark:hover:text-white cursor-pointer rounded-md font-semibold group">
          <span className="absolute inset-0  bg-gradient-to-tr from-pink-500 to-rose-500  transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
          <span className="relative z-10   group-hover:text-white transition-colors duration-300">
            Join
          </span>
        </Button>
        <Button className="border border-white px-6 py-3 rounded-lg cursor-pointer hover:bg-white hover:text-rose-600 transition">
          Explore Features
        </Button>
      </div>
    </div>
  );
};

export default Overview;
