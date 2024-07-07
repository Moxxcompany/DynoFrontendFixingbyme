import useTokenData from "@/hooks/useTokenData";
import React, { useEffect } from "react";
import ProfilePage from "@/Components/Page/Profile/ProfilePage";
import { pageProps } from "@/utils/types/common";

const Profile = ({ setPageName }: pageProps) => {
  const tokenData = useTokenData();
  useEffect(() => {
    setPageName("Profile");
  }, []);

  return <>{tokenData && <ProfilePage tokenData={tokenData} />}</>;
};

export default Profile;
