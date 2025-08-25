"use client";

import { Button } from "@/components/ui/button";
import { openForm } from "@/redux/slices/ui/slice";
import React, { memo } from "react";
import { useDispatch } from "react-redux";

const PasswordStrip = () => {
  const dispatch = useDispatch();
  return (
    <div className="w-2/2">
      <h5 className="text-xl mb-3">Password & Security</h5>
      <div className="flex justify-between items-center border p-4 rounded-md gap-8">
        <div className="flex flex-col w-fit p-2 space-y-4">
          <h5 className="font-bold ">Change Password</h5>
          <p className="text-sm">
            Make sure that your password is secure. Do not change if not
            necessary.
          </p>
        </div>
        <Button
          onClick={() => dispatch(openForm("change-password"))}
          size={"sm"}
        >
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default memo(PasswordStrip);
