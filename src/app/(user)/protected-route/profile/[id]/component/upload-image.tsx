"use client";

import React, { memo } from "react";
import { Edit, Loader2, Upload, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useUpdateAvatar } from "@/hooks/user/mutations";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { handleError } from "@/utils/error-handler";
import { updateProfile } from "@/redux/slices/user/user-slice";

const UploadAvatar = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const disptach = useDispatch();
  const updateAvatar = useUpdateAvatar();

  const [isEditAvatar, setIsEditAvatar] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(false);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  if (!user) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    setSelectedFile(file);
    setIsEditAvatar(false);

    // Upload immediately
    try {
      setUploading(true);
      updateAvatar.mutate(
        { avatar: file, id: user?.sub || "" },
        {
          onSuccess: (res) => {
            if (res?.success) {
              disptach(
                updateProfile({
                  firstName: user?.firstName || "",
                  lastName: user?.lastName || "",
                  email: user?.email || "",
                  sub: user?.sub || "",
                  role: user?.role || "",
                  avatar: res?.avatarUrl || "",
                })
              );
            }
          },
          onError: (error) => {
            handleError(error, { context: "UploadAvatar", notify: true });
          },
          onSettled: () => {
            setUploading(false);
          },
        }
      );
    } catch (err) {
      console.error("Upload failed", err);
      setUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  console.log(user);

  return (
    <div className="flex items-center gap-32">
      <div>
        <h1 className="text-xl">Profile Picture</h1>
        <p className="text-xs text-gray-500">Upload your profile picture</p>
      </div>
      {!isEditAvatar && (
        <Avatar className="h-25 w-25 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-rose-500">
          <div className=" absolute top-0 right-0 p-4 cursor-pointer">
            <Edit
              className="text-white"
              size={15}
              onClick={() => setIsEditAvatar((p) => !p)}
            />
          </div>
          {uploading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <AvatarImage
              src={
                selectedFile ? URL.createObjectURL(selectedFile) : user.avatar
              }
              alt={user.firstName}
            />
          )}
          <AvatarFallback className="text-4xl text-white">
            {!selectedFile ? user?.firstName.slice(0, 1) : ""}
          </AvatarFallback>
        </Avatar>
      )}
      {isEditAvatar && (
        <>
          <Avatar className="h-25 w-25 flex flex-col space-y-1 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 relative">
            <div
              className="absolute top-0 right-0 m-4 cursor-pointer"
              onClick={() => setIsEditAvatar((p) => !p)}
            >
              <X className="text-white " size={15} />
            </div>

            {/* Trigger upload on click */}
            <div
              className="flex flex-col text-white items-center justify-center cursor-pointer"
              onClick={handleUploadClick}
            >
              <Upload size={18} />
              <span className="text-xs ">Upload</span>
            </div>

            {/* Hidden input */}
            <input
              ref={fileInputRef}
              disabled={!isEditAvatar || uploading}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </Avatar>
        </>
      )}
    </div>
  );
};

export default memo(UploadAvatar);
