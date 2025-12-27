import React from "react";
import dark_logo from "../../../public/assets/dark.png";
import light_logo from "../../../public/assets/light.png";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className="font-[font(family-name:var(--font-redhat))] w-full  border">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
        <ul className="p-12 flex items-center">
          <Image
            src={theme === "dark" ? dark_logo : light_logo}
            alt="Logo"
            width={100}
            height={100}
          />
          <div className="grid flex-1 w-full text-left leading-tight font-[family-name:var(--font-poppins)]">
            <span className="text-lg white">Trading BackTesting</span>
            <span className="font-semibold text-xl bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent">
              Platform
            </span>
          </div>
        </ul>
        <ul className="p-12">
          <li className="font-semibold text-lg">Other</li>
          <Link href={"/"}>Home</Link>
          <ul>
            <Link href={"/landing/terms-conditions"}>Terms & Conditions</Link>
          </ul>
          <ul></ul>
        </ul>
        <ul className="p-12">
          <ul className="font-semibold text-lg">Support</ul>
          <ul>tradingbacktestingappsoporte@gmail.com</ul>
        </ul>
      </div>
      <div className="border flex justify-center p-2 font-[font(family-name:var(--font-redhat))] w-ful">
        <h1>
          © {new Date().getFullYear()} TradingBacktesting Pvt. Ltd. All rights
          reserved.
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
