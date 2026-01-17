import axios from "axios";
import { parseCookies } from "nookies";

export const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const { "nextauth.token": token } = parseCookies();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
