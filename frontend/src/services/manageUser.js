// gọi api đăng nhập

import { https } from "./config";

export const manageUserService = {
  login: (data) => {
    return https.post("v1/auth/login", data);
  },
  signup: (data) => {
    return https.post("v1/auth/register", data);
  },
};
