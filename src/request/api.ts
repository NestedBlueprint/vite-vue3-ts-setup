import request from "./request";

export const adminLoginApi = (data: AdminLoginItf): Promise<LoginResItf<LoginDataItf>> => request.post("/admin/login", data);
export const getAdminInfoApi = ():Promise<LoginResItf<AdminInfoRes>> => request.get("/admin/info");