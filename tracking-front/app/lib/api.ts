import axios from 'axios';
import { parseCookies } from 'nookies'

const { "nextauth.token": token } = parseCookies();

export let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export const api = axios.create({
    baseURL
})

if (token) {
    api.defaults.headers["authorozation"] = `Bearer ${token}`;
}