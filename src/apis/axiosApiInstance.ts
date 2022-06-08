/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axios from 'axios';

const axiosApiInstance = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com',	
	headers: {
		accept: 'application/json',
	},
});

axiosApiInstance.interceptors.request.use(
	async (config: any) =>
		// TODO: Apply access token mechanism here

		config,
	(error: any) => {
		Promise.reject(error);
	}
);

axiosApiInstance.interceptors.response.use(
	(response: any) => response,
	async (error: { config: any; response: { status: number; }; }) => {
		const originalRequest = error.config;

		if ([401, 403].includes(error?.response?.status) && !originalRequest._retry) {
			originalRequest._retry = true;

			// TODO: Apply refresh token mechanism here

			return axiosApiInstance(originalRequest);
		}

		return Promise.reject(error);
	}
);

export default axiosApiInstance;
