import axios, { Method } from 'axios';
import { HTTPMethods } from 'constants/HTTPMethods';
import Router from 'next/router';
import { ROUTES } from 'constants/Routes';

const defaultHeaders = {};

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create();

const request = (
  method: Method | undefined,
  url: string,
  headers: any,
  axiosConfig = {},
) =>
  axiosInstance({
    method,
    url,
    baseURL,
    headers: { ...defaultHeaders, ...headers },
    responseType: 'json',
    ...axiosConfig,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response.status === 500) Router.push(ROUTES.SERVER_ERROR);
      return error.response;
    });

const http = {
  [HTTPMethods.POST]: (url: string, { headers = {}, data = {}, params = {} }) =>
    request(HTTPMethods.POST, url, headers, {
      data,
      params,
    }),
  [HTTPMethods.PUT]: (url: string, { headers = {}, data = {}, params = {} }) =>
    request(HTTPMethods.PUT, url, headers, {
      data,
      params,
    }),
  [HTTPMethods.PATCH]: (
    url: string,
    { headers = {}, data = {}, params = {} },
  ) =>
    request(HTTPMethods.PATCH, url, headers, {
      data,
      params,
    }),
  [HTTPMethods.GET]: (url: string, { headers = {}, params = {} }) =>
    request(HTTPMethods.GET, url, headers, {
      params,
    }),
  [HTTPMethods.DELETE]: (url: string, { headers = {}, params = {} }) =>
    request(HTTPMethods.DELETE, url, headers, {
      params,
    }),
};

export default http;
