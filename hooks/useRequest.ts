import React from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

const req = axios.create({
	baseURL: 'http://192.168.1.3:7000/api/',
});

export const useGetRequest = <T = any>(url: string) => {
	const [response, setResponse] = React.useState<AxiosResponse<T> | null>(null);
	const [error, setError] = React.useState<AxiosError | null>(null);

	React.useEffect(() => {
		const makeRequet = async () => {
			try {
				const respo = await req.get<T>(url);
				setResponse(respo);
			} catch (error) {
				setError(error as AxiosError);
			}
		};
		makeRequet();
	}, []);

	return { response, error };
};
