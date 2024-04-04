import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";

const axiosClient = axios.create({
  baseURL: "/api/"
});

const config: AxiosRequestConfig = {
  headers: {
    Accept: "application/json"
  } as RawAxiosRequestHeaders
};

export { axiosClient, config };
