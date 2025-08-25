"use client";

import Script from "next/script";

export default function FxVerifyWidget() {
  return (
    <div id="position-size-calculator-624228" className="h-screen">
      <Script
        src="https://fxverify.com/Content/remote/remote-widgets.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && window.RemoteCalc) {
            window.RemoteCalc({
              Url: "https://fxverify.com",
              Calculator: "position-size-calculator",
              ContainerId: "position-size-calculator-624228",
            });
          }
        }}
      />
    </div>
  );
}
