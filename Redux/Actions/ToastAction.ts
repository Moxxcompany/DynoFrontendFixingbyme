import { toastReducer } from "@/utils/types/common";

export const TOAST_INIT: any = "TOAST_INIT";
export const TOAST_SHOW = "TOAST_SHOW";
export const TOAST_HIDE = "TOAST_HIDE";

export const ToastAction = (data: toastReducer) => {
  return { type: TOAST_INIT, payload: data };
};
