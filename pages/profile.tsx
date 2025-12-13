import useTokenData from "@/hooks/useTokenData";
import React, { useEffect } from "react";
import ProfilePage from "@/Components/Page/Profile/ProfilePage";
import { pageProps } from "@/utils/types";

const Profile = ({ setPageName, setPageDescription }: pageProps) => {
  const tokenData = useTokenData();
  useEffect(() => {
    if (setPageName && setPageDescription) {
      setPageName("Profile");
      setPageDescription("Manage your profile information and settings.");
    }
  }, []);

  return <>{tokenData && <ProfilePage tokenData={tokenData} />}</>
};

export default Profile;
