import Container from "@/components/ui/container";
import HeroSection from "@/components/ui/landing-layout/hero-section";
import TabsSection from "@/components/ui/landing-layout/tabs-section";
import React, { memo } from "react";

const Landing = () => {
  return (
    <div className="flex justify-center mt-12">
      <Container className="justify-center">
        <div className="space-y-12">
          <HeroSection />
          <TabsSection />
        </div>
      </Container>
    </div>
  )
};

export default memo(Landing);
