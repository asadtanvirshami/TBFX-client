// app/dashboard/page.tsx
import { verifyJWTServer } from "@/lib/auth/verifyJWTServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies(); // ✅ Await the cookies() call
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/auth/signin"); // If not logged in, redirect
  }

  const res = await verifyJWTServer(accessToken);

  if (!res) {
    redirect("/auth/signin"); // Invalid token, redirect
  }

  return <div>Welcome</div>;
}
