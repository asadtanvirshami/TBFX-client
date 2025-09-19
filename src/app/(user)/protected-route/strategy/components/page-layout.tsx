"use client";

import { Fragment, useEffect, useState } from "react";
import StrategyCard from "./strategy-card";
import StrategyHeader from "./tab-menu";
import { useGetStrategies } from "@/hooks/strategies/queries";
import StrategySkeleton from "./strategy-skeleton";
import { StrategyData, StrategyQueries } from "@/types/strategy-type/type";
import StrategyForm from "../form/strategy-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { useSelector } from "react-redux";
import ViewStrategy from "./view-strategy";

const PageLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [strategyData, setStrategyData] = useState<StrategyData[]>([]);
  const [quries, setQueries] = useState<StrategyQueries>({
    page: 1,
    limit: pageSize,
    filters: { type: "" },
  });
  const { data, isError, isLoading } = useGetStrategies(quries);

  useEffect(() => {
    if (data && data.data) {
      setStrategyData(data.data);
    }
  }, [data]);

  useEffect(() => {
    setQueries((prev) => ({ ...prev, page: currentPage }));
  }, [currentPage]);

  if (isLoading) {
    return <StrategySkeleton />;
  }

  const totalItems = data?.total ?? 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <Fragment>
      <div className="p-12 space-y-8">
        <StrategyHeader
          data={strategyData}
          setData={setStrategyData}
          setQueries={setQueries}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {strategyData.map((strategy: StrategyData) => (
            <StrategyCard key={strategy.id} strategy={strategy} />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-6">
            <Button
              variant={"default"}
              className="px-4 py-2 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </Button>

            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              className="px-4 py-2 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
      <StrategyForm buttonVisibility={false} />
      <ViewStrategy />
    </Fragment>
  );
};

export default PageLayout;
