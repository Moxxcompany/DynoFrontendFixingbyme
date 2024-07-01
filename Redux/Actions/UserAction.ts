export const USER_INIT: any = "USER_INIT";
export const USER_LOGIN = "USER_LOGIN";
export const USER_REGISTER = "USER_REGISTER";
export const USER_API_ERROR = "USER_API_ERROR";

export const UserAction = (type?: string, data?: any) => {
  return { type: USER_INIT, payload: data, crudType: type };
};
