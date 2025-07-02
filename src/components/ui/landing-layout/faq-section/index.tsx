import React from "react";
import { Separator } from "../../separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
function FAQCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-4 fade-up">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>{description}</p>
          </AccordionContent>
        </AccordionItem>
        <Separator />
      </Accordion>
    </div>
  );
}

const FAQsSection = () => {
  const faqs = [
    {
      title: "What is TradingBacktesting?",
      description:
        "TradingBacktesting is an all-in-one platform for traders and investors to backtest strategies, track performance, connect to MetaTrader, get real-time news, and more—all in one dashboard.",
    },
    {
      title: "Can I connect my MetaTrader account?",
      description:
        "Yes, you can seamlessly connect your MetaTrader 4 or 5 account to mirror trades, import account history, and track real-time performance within the platform.",
    },
    {
      title: "Is live economic news included?",
      description:
        "Absolutely. TradingBacktesting provides real-time financial news and an integrated economic calendar to help you stay on top of market-moving events.",
    },
    {
      title: "Can I calculate lot sizes and risk?",
      description:
        "Yes, our built-in calculators allow you to compute lot sizes, pip values, and risk percentages tailored to your trading strategy and account size.",
    },
    {
      title: "Is this platform suitable for beginners?",
      description:
        "Yes! TradingBacktesting is designed for both beginners and professionals. The interface is user-friendly and packed with tutorials to help you get started.",
    },
    {
      title: "Do you offer a free trial?",
      description:
        "We do! You can try TradingBacktesting free for 7 days with full access to all features—no credit card required.",
    },
    {
      title: "Is my data secure?",
      description:
        "We take data security seriously. All account information and trading data are encrypted and stored securely with best-in-class protocols.",
    },
  ];

  return (
    <div className="w-full max-w-5xl px-4 mx-auto text-center md:text-left mb-12">
      <span className="text-4xl space-x-3 flex-none justify-center md:flex lg:flex md:text-5xl font-extrabold tracking-tight">
        <h1> Frequently Asked </h1>
        <h1 className="t bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          Questions
        </h1>
      </span>
      {/* FAQS Cards Section */}
      <div className="mt-12 border bg-card rounded-lg">
        {faqs.map((faq) => (
          <FAQCard key={faq.title} {...faq} />
        ))}
      </div>
    </div>
  );
};

export default FAQsSection;
