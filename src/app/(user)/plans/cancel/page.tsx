"use client";
import { useEffect } from "react";
import { useUser } from "@/hooks/user/use-user";
import { SyncPlan } from "@/hooks/plans/use-plans";
import { useDispatch } from "react-redux";
import { updateProfile, upgradeUserPlan } from "@/redux/slices/user/user-slice";
import { BadgeX } from "lucide-react";

export default function PaymentSuccess() {
  const { refetch } = useUser();
  const { data, isError, isLoading, isSuccess } = SyncPlan();
  const dispatch = useDispatch();

  useEffect(() => {
    async function refreshUser() {
      const user = await refetch();
      console.log("Refetched user:", user);

      if (user) {
        if (user.data.plan.toLowerCase() === data.plan.toLowerCase()) {
          dispatch(updateProfile(user.data));
          dispatch(upgradeUserPlan(user.data.plan));
          setTimeout(() => {
            window.close();
          }, 3000);
        }
      }
    }
    refreshUser();
  }, [refetch]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold gap-4 flex items-center">
        Canceled Successfully
        <BadgeX />
      </h1>
      {isLoading && <p>Your account is being upgraded…</p>}
      {isSuccess && <p>Your account is upgraded!</p>}
      {isError && <p>Failed to upgrade your account</p>}
    </div>
  );
}
