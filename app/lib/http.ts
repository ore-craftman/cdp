import axios from "axios";

interface httpArgs {
  url: string;
  method: "post" | "put" | "get" | "delete" | "patch";
  data?: object;
}

const httpInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const httpHandler = ({ data, method, url }: httpArgs) => {
  if ((method === "post" || method === "put" || method === "patch") && !data)
    throw new Error(`Payload is required ${method} method`);

  const config: httpArgs = { url, method };

  if (data) {
    config.data = data;
  }

  return httpInstance(config);
};
