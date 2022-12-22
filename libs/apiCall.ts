import { Method } from 'axios';
import http from './http';

export const apiCall = (method: Method | any, url: any, options?: any) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const httpMethod: Method | any = http[method];

  return httpMethod(url, {
    headers,
    ...options,
  });
};
