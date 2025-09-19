// src/app/(user)/protected-route/operations/page.tsx
import PageLayout from "./components/page-layout";
import { getSearchParams } from "@/utils/search-params/url-search-params";

// Helper to normalize searchParams
function normalizeSearchParams(
  params?: Record<string, string | string[] | undefined>
): Record<string, string> {
  const normalized: Record<string, string> = {};
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (Array.isArray(value)) normalized[key] = value[0];
    else if (value !== undefined) normalized[key] = value;
  });
  return normalized;
}

// Synchronous page
export default function TradesPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const normalized = normalizeSearchParams(searchParams);

  const { accountId, page, limit } = getSearchParams(normalized, {
    accountId: "default-account",
    page: 1,
    limit: 8,
  });

  return <PageLayout accountId={accountId} page={page} limit={limit} />;
}
