import { apiCall } from 'libs/apiCall';
import { HTTPMethods } from 'constants/HTTPMethods';
import { LOGIN } from 'libs/apiUrls';

export const reqLogin = (data: any) =>
  apiCall(HTTPMethods.POST, LOGIN, { data });
