import React from "react";
import ProfileView from "./component/profile-layout";

const page = ({ params }: { params: { id: string } }) => {
  return <ProfileView/>;
};

export default page;
