import React from "react";
import { TradeCalendarWidget } from "../../dashboard/components/trade-calendar.widget";
import { trades } from "@/components/ui/landing-layout/tabs-section/calendar/mock/data";

const JournalLayout = () => {
  return (
    <div className="p-12">
      <TradeCalendarWidget taskData={trades} />
    </div>
  );
};

export default JournalLayout;
