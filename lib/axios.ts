import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";

const axiosClient = axios.create({
  baseURL: "/api"
});

const axiosConfig: AxiosRequestConfig = {
  headers: {
    Accept: "application/json"
  } as RawAxiosRequestHeaders
};

export { axiosClient, axiosConfig };
