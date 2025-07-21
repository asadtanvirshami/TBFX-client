import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

const MetricCard = ({
  title,
  description,
  values,
  Icon,
}: {
  title: string;
  description: string;
  Icon: React.ElementType;
  values?: string | number | null;
}) => {
  return (
    <Card className=" h-full p-4 shadow-md rounded-lg">
      <CardHeader>
        <CardTitle className="text-3xl">{values}</CardTitle>
        <CardTitle className="text-sm flex items-center gap-2">
          <Icon />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default MetricCard;
