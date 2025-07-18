
/**
 * Safely extracts an error message from an error object.
 *
 * @param error The error from which to extract the message
 * @returns The error message as a string
 */
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
/**
 * Checks if an error is an axios error.
 *
 * Axios errors have a non-null object type, contain a string "message" property, and
 * optionally a "response" property that contains a "data" property with a "message"
 * property.
 *
 * @param err - The error to check
 * @returns Whether the error is an axios error
 */

function isAxiosError(err: unknown): err is { response?: { data?: { message?: string } }, message: string } {
  return (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    typeof (err as any).message === "string"
  );
}
