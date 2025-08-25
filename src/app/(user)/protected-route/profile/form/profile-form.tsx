"use client";

import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucideLoaderCircle, X } from "lucide-react";
import { handleError } from "@/utils/error-handler";
import { extractErrorMessage } from "@/utils/error-extractor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useUserUpdate } from "@/hooks/user/mutations";
import { updateProfile } from "@/redux/slices/user/user-slice";
import { UpdateProfileData } from "@/types/user-type/type";
import { updateProfileSchema } from "@/schemas/user-schema/schema";

const ProfileForm = () => {
  const update = useUserUpdate();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const [isEditForm, setIsEditForm] = React.useState(false);

  const form = useForm<UpdateProfileData>({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      id: user?.sub || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = form;

  const onSubmit = async (data: UpdateProfileData) => {
    if (!user?.sub || !data.id) {
      setError("root", { type: "manual", message: "User ID missing" });
      return;
    }

    update.mutate(
      { ...data },
      {
        onSuccess: (res) => {
          if (!res?.success) {
            setError("root", {
              type: "server",
              message: res?.message || "Something went wrong",
            });
            return;
          }
          dispatch(updateProfile(res?.user));
          setIsEditForm(false);
        },
        onError: (error) => {
          handleError(error, {
            context: "ProfileForm",
            notify: false,
            setFormError: (msg) =>
              form.setError("root", {
                type: "manual",
                message: msg,
              }),
          });
        },
      }
    );
  };

  if (!user) {
    return null;
  }

  return (
    <div className="w-full font-[family-name:var(--font-poppins)] !shadow-none !bg-transparent !border-none">
      <h5 className="text-xl">Basic Info</h5>
      <div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mx-auto">
            {/* Edit toggle */}
            <div className="flex items-center justify-end mb-4">
              <Button
                onClick={() => setIsEditForm((p) => !p)}
                type="button"
                variant="ghost"
                size="icon"
              >
                {isEditForm ? <X className="text-red-500" /> : <LucideEdit />}
              </Button>
            </div>

            {/* Disable all fields when not editing */}
            <fieldset disabled={!isEditForm} className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        data-cy="#firstName"
                        type="text"
                        placeholder="John"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        data-cy="#lastName"
                        type="text"
                        placeholder="Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        data-cy="#email"
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>

            {/* Server error */}
            {errors.root?.message && isEditForm && (
              <div className="text-xs text-red-600 text-center">
                {extractErrorMessage(errors.root.message)}
              </div>
            )}

            {/* Save button (only visible in edit mode) */}
            {isEditForm && (
              <Button
                type="submit"
                disabled={update.isPending}
                className="w-fit float-right"
                variant="success"
              >
                {update.isPending ? (
                  <>
                    Saving Changes{" "}
                    <LucideLoaderCircle size={22} className="animate-spin" />
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default memo(ProfileForm);
