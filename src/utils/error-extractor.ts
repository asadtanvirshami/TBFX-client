export function extractErrorMessage(error: unknown): string {
  if (!error) return "Unknown error";
  if (typeof error === "string") return error;

  const maybeErr = error as any;

  return (
    maybeErr?.response?.message || maybeErr?.message || JSON.stringify(maybeErr)
  );
}
