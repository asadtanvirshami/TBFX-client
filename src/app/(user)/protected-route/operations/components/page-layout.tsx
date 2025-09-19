"use client";

import { getColumns } from "@/components/ui/landing-layout/tabs-section/trades/trades-table/columns";
import { TradesTable } from "@/components/ui/landing-layout/tabs-section/trades/trades-table/table";
import { useGetTrades } from "@/hooks/trades/queries";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import LayoutSkeleton from "./layout-skeleton";

export default function TradesList({
  accountId,
  page,
  limit,
}: {
  accountId: string;
  page: number;
  limit: number;
}) {
  const router = useRouter();
  const { data, isLoading } = useGetTrades(accountId, page, limit);
  const columns = useMemo(() => getColumns(), []);

  if (isLoading) return <LayoutSkeleton />;

  return (
    <div className="p-12">
      <TradesTable data={data?.data ?? []} columns={columns} />
    </div>
  );
}
