import axios from "axios";
export const baseURL = "http://localhost:3000/api/";
const client = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
  },
});

const wrapperApi = (method, options, isGuest) => {
  let token = "";
  if (!isGuest) {
    token = "";
  }
  return client.request({
    method,
    headers: { Authorization: `Bearer ${token ? token : ""}` },
    ...options,
  });
};

export default wrapperApi;
