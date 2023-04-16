import axios from "axios";

import { appConfig } from "../config/config";

export async function getPosts() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  const res = await axios.get(`${appConfig.API_URL}/api/book/getList`, config);
  return res;
}

export async function getReviews() {}
