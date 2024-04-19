import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";

const axiosClient = axios.create({
  baseURL: "/api"
});

const axiosConfig: AxiosRequestConfig = {
  headers: {
    Accept: "application/json"
    // Authorization: `Bearer ${getToken()}`
  } as RawAxiosRequestHeaders
};

const blobConfig: AxiosRequestConfig = {
  responseType: "blob"
};

export { axiosClient, axiosConfig, blobConfig };
