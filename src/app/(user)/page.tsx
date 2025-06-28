import Container from "@/components/ui/container";
import HeroSection from "@/components/ui/landing-layout/hero-section";
import React, { memo } from "react";

const Landing = () => {
  return <div className="flex justify-center">
    <Container className="justify-center space-y-5 mt-12  "><HeroSection /></Container>;
  </div>
};

export default memo(Landing);
