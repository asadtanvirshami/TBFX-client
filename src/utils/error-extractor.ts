export function extractErrorMessage(error: unknown): string {
  if (!error) return "Unknown error";
  if (typeof error === "string") return error;

  if (isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}

function isAxiosError(err: unknown): err is { response?: { data?: { message?: string } }, message: string } {
  return (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    typeof (err as any).message === "string"
  );
}
