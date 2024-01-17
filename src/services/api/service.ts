import axios, { AxiosInstance } from 'axios';

// const accessRefreshUrls = [config.authRefreshEmployee];

// export const addAuthInterceptor = (client: AxiosInstance) => {
//     client.interceptors.request.use((conf) => {
//         const authStore = store.authStore;
//         if (!conf.headers) {
//             return conf;
//         }
//         if (conf.url) {
//             if (accessRefreshUrls.includes(conf.url)) {
//                 conf.headers.Authorization = `Bearer ${authStore.authToken?.refresh_token}`;
//             } else {
//                 conf.headers.Authorization = `Bearer ${authStore.authToken?.access_token}`;
//             }
//         }
//         return conf;
//     });
// };

// export const addAuthFailedInterceptor = (client: AxiosInstance) => {
//     client.interceptors.response.use(
//         (response) => {
//             console.log(
//                 'response :: url ' +
//                     JSON.stringify(response?.config?.url, null, 4)
//             );
//             console.log(
//                 'response :: ' + JSON.stringify(response?.data, null, 4)
//             );
//             return response;
//         },
//         async (error) => {
//             const originalRequest = error?.config;
//             const status = error?.response?.status;
//             const url = originalRequest.url;
//             if (!store.authStore.authorized) {
//                 console.log('error :: ' + JSON.stringify(error, null, 4));
//                 return Promise.reject(error);
//             }
//             if (
//                 error?.response?.status === 401 &&
//                 // eslint-disable-next-line no-extra-boolean-cast
//                 !Boolean(originalRequest._retry) &&
//                 url !== config.authRefreshEmployee
//             ) {
//                 originalRequest._retry = true;
//                 try {
//                     const refreshAuthResult =
//                         await store.authStore.refreshAuthToken();
//                     const authSuccess =
//                         !refreshAuthResult?.error &&
//                         refreshAuthResult?.data &&
//                         refreshAuthResult?.status.responseSuccess();

//                     if (authSuccess) {
//                         const modifiedOriginalRequest = {
//                             ...originalRequest,
//                             headers: {
//                                 ...originalRequest.headers,
//                                 Authorization: `Bearer ${refreshAuthResult.data?.data.access_token}`,
//                             },
//                         };
//                         return axios(modifiedOriginalRequest);
//                     } else {
//                         DataService.clearAll({ reason: 'session-expired' });
//                     }
//                 } catch (refreshError) {
//                     console.log(
//                         'refreshError :: ' +
//                             JSON.stringify(refreshError, null, 4)
//                     );
//                     return Promise.reject(refreshError);
//                 }
//             }
//             if (status === 401) {
//                 console.log('401 :: NO AUTHORIZATION :: ' + url);
//             } else {
//                 console.log('error :: ' + JSON.stringify(error, null, 4));
//             }
//             return Promise.reject(error);
//         }
//     );
// };

export const createClient = (url: string) => {
    return axios.create({
        baseURL: url,
        // withCredentials: true,
        timeout: 120000,
        headers: {
            Accept: 'application/json',
        },
    });
};
