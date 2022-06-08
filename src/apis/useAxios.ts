import { useCallback } from 'react';
import axiosApiInstance from './axiosApiInstance';

const useAxios = () => {
	// TODO: Global loading and error states

	const requestToServerWith = useCallback(
		// eslint-disable-next-line consistent-return
		async (options: any) => {
			try {
				// TODO: Global loading and error states dispatchers

				const result = await axiosApiInstance.request(options); // https://axios-http.com/docs/req_config
				return result;

				// eslint-disable-next-line no-shadow
			} catch (error) {
				// TODO: apply error state
			} finally {
				// TODO: apply loading state
			}
		},
		[]
	);

	return { requestToServerWith };
};

export default useAxios;
