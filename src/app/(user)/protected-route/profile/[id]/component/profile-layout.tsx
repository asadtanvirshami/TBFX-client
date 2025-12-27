import React, { memo } from "react";
import ProfileForm from "../../form/profile-form";
import PasswordStrip from "./password-strip";
import PremiumStrip from "./premium-strip";
import UploadAvatar from "./upload-image";
import ChangePassword from "../../form/change-password";

const PageTitle = () => {
  return (
    <div>
      <h1 className=" text-3xl font-bold">Account Information</h1>
      <p>Manage your general account information</p>
    </div>
  );
};

const ProfileView = ({}) => {
  return (
    <React.Fragment>
      <section className="flex justify-center w-full h-full p-6 space-y-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="space-y-12">
            <PageTitle />
            <UploadAvatar />
            <ProfileForm />
            <PasswordStrip />
          </div>
          <div>
            <PremiumStrip />
          </div>
        </div>
      </section>
      <ChangePassword buttonVisibility={false} />
    </React.Fragment>
  );
};

export default memo(ProfileView);
