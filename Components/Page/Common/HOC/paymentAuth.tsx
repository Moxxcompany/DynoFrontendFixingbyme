import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { Loading } from "@/Components/UI";
import {
  IManagerPermissions,
  IMemberPermissions,
  TokenData,
  rootReducer,
} from "@/utils/types";
import { useSelector } from "react-redux";
const paymentAuth = (WrappedComponent: any) => {
  const AuthChecker = (props: any) => {
    const Router = useRouter();
    const [payment, setPayment] = useState(false);
    const paymentState = useSelector(
      (state: rootReducer) => state.paymentReducer
    );
    useEffect(() => {
      if (paymentState.finalPrice !== 0) {
        setPayment(true);
      } else {
        Router.replace("/");
      }
    }, [Router.pathname]);
    return payment ? <WrappedComponent {...props} /> : <></>;
  };
  return AuthChecker;
};

export default paymentAuth;
