// utils/searchParams.ts
export function getSearchParams<T extends Record<string, any>>(
  searchParams: URLSearchParams | Record<string, any>,
  defaults: T
): T {
  const params: Record<string, any> = { ...defaults };

  Object.keys(defaults).forEach((key) => {
    const value =
      searchParams instanceof URLSearchParams
        ? searchParams.get(key)
        : searchParams[key];

    if (value !== null && value !== undefined) {
      // if number → convert
      params[key] = typeof defaults[key] === "number" ? Number(value) : value;
    }
  });

  return params as T;
}
