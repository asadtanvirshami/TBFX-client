"use client";

import { getColumns } from "@/components/ui/trades-table/columns";
import { TradesTable } from "@/components/ui/trades-table/table";
import { useGetTrades } from "@/hooks/trades/queries";
import { useEffect, useMemo, useState } from "react";
import LayoutSkeleton from "./layout-skeleton";
import type { Trade } from "@/components/ui/trades-table/columns";

type TradesQuery = {
  page: number; // 1-based for API
  pageSize: number;
  filters: {
    accountId: string;
    symbol: string; // keep this concrete to avoid 'never[]' widening
  };
};

export default function TradesList({
  accountId,
  page,
  limit,
}: {
  accountId: string;
  page: number;
  limit: number;
}) {
  const [query, setQuery] = useState<TradesQuery>({
    page,
    pageSize: limit,
    filters: { accountId, symbol: "" },
  });

  const { data, isLoading } = useGetTrades(
    query.filters,
    query.page,
    query.pageSize
  );

  const totalCount = data?.meta?.total ?? data?.total ?? 0;

  const [tradesData, setTradesData] = useState<Trade[]>([]);
  useEffect(() => {
    if (data?.data) setTradesData(data?.data);
  }, [data]);

  const columns = useMemo(() => getColumns(), []);

  if (isLoading) return <LayoutSkeleton />;

  console.log(query);

  return (
    <div className="p-12">
      <TradesTable
        columns={columns}
        data={tradesData}
        query={query}
        setQuery={setQuery}
        totalCount={totalCount}
      />
    </div>
  );
}
