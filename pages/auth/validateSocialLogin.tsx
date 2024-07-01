import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";

const ValidateSocialLogin = () => {
  const session = useSession();

  useEffect(() => {
    const tempSession: any = session.data;
    console.log(tempSession.token);
    signOut();
  }, [session]);
  return <div>ValidateSocialLogin</div>;
};

export default ValidateSocialLogin;
