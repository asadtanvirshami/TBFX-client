// src/app/(user)/protected-route/operations/page.tsx
import PageLayout from "./components/page-layout";
import { getSearchParams } from "@/utils/search-params/url-search-params";

interface TradesPageProps {
  searchParams: Record<string, string | string[]>;
}

// Normalize searchParams: take first element if array
function normalizeSearchParams(
  params: Record<string, string | string[]>
): Record<string, string> {
  const normalized: Record<string, string> = {};
  Object.entries(params).forEach(([key, value]) => {
    normalized[key] = Array.isArray(value) ? value[0] : value;
  });
  return normalized;
}

export default function TradesPage({ searchParams }: TradesPageProps) {
  const normalized = normalizeSearchParams(searchParams);

  const { accountId, page, limit } = getSearchParams(normalized, {
    accountId: "default-account",
    page: 1,
    limit: 8,
  });

  return <PageLayout accountId={accountId} page={page} limit={limit} />;
}
