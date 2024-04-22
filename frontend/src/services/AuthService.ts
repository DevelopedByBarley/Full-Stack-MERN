
import axios, { InternalAxiosRequestConfig } from 'axios';


type UserTypes = {
  name: string,
  email: string,
  password: string
}


export function getUser(setUser: (value: UserTypes) => void) {
  fetchAuthentication.get('/user').then(res => setUser(res.data.user)).catch(err => console.log(err));
}

export const fetchAuthentication = axios.create();

fetchAuthentication.interceptors.request.use(
  (config) => {
  const accessToken = localStorage.getItem('accessToken');

  if(!accessToken) {
    return config;
  }

    return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`
    }
  } as InternalAxiosRequestConfig<string>;
},
  (error) => Promise.reject(error)
);


fetchAuthentication.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);

    if (error.response.status !== 403) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (originalRequest.isRetry) {
      return Promise.reject(error);
    }

    originalRequest.isRetry = true;

    return axios
      .get("/api/get-token", {
        withCredentials: true,
      })
      .then((res) => {
        const accessToken = res.data.accessToken;
        localStorage.removeItem('accessToken');
        localStorage.setItem('accessToken', accessToken);
      })
      .then(() => fetchAuthentication(originalRequest))
      .catch(err => {
        console.log(err);
        localStorage.clear();
        //window.location.href = "/user";
      })
  }
);