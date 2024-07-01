import { LayoutProps, rootReducer } from "@/utils/types";
import React from "react";
import { LoginWrapper } from "./styled";
import { useSelector } from "react-redux";
import Toast from "@/Components/UI/Toast";

const LoginLayout = ({ children }: LayoutProps) => {
  const ToastState = useSelector((state: rootReducer) => state.toastReducer);
  return (
    <LoginWrapper>
      <Toast
        open={ToastState.open}
        message={ToastState.message}
        severity={ToastState.severity ?? "success"}
        loading={ToastState.loading}
      />
      {children}
    </LoginWrapper>
  );
};

export default LoginLayout;
