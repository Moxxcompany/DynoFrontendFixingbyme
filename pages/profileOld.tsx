import useTokenData from "@/hooks/useTokenData";
import React, { useCallback, useEffect } from "react";
import { pageProps } from "@/utils/types";
import { useTranslation } from "react-i18next";
import ProfilePageOld from "@/Components/Page/Profile/ProfilePageOld";

const ProfileOld = ({ setPageName, setPageDescription }: pageProps) => {
  const tokenData = useTokenData();
  const namespaces = ["profile", "common"];
  const { t } = useTranslation(namespaces);
  const tProfile = useCallback((key: string) => t(key, { ns: "profile" }), [t]);
  const tCommon = useCallback((key: string) => t(key, { ns: "common" }), [t]);
  useEffect(() => {
    if (setPageName && setPageDescription) {
      setPageName(tProfile("profile"));
      setPageDescription("");
    }
  }, [setPageName, setPageDescription, tProfile]);

  return <>{tokenData && <ProfilePageOld tokenData={tokenData} />}</>;
};

export default ProfileOld;
