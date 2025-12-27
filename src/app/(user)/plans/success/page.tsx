"use client";
import { useEffect } from "react";
import { useUser } from "@/hooks/user/use-user";
import { SyncPlan } from "@/hooks/plans/use-plans";
import { useDispatch } from "react-redux";
import { updateProfile } from "@/redux/slices/user/user-slice";

export default function PaymentSuccess() {
  const { refetch } = useUser();
  const { isError, isLoading, isSuccess } = SyncPlan();
  const dispatch = useDispatch();

  useEffect(() => {
    async function refreshUser() {
      if (!isSuccess) return; // wait until plan sync finishes

      const user = await refetch();
      if (user?.isSuccess && user?.data?.plan) {
        dispatch(updateProfile(user.data)); // dispatch full user object
        setTimeout(() => window.close(), 3000);
      }
    }

    refreshUser();
  }, [isSuccess, refetch]); // ✅ re-run when sync completes

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold">Payment Successful 🎉</h1>
      {isLoading && <p>Your account is being upgraded…</p>}
      {isSuccess && <p>Your account is upgraded!</p>}
      {isError && <p>Failed to upgrade your account</p>}
    </div>
  );
}
