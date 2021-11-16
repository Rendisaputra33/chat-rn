import React from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

const req = axios.create({
	baseURL: 'http:api-data-movie.herokuapp.com/api/',
});

export const useGetRequest = (url: string) => {
	const [response, setResponse] = React.useState<AxiosResponse | null>(null);
	const [error, setError] = React.useState<AxiosError | null>(null);

	React.useEffect(() => {
		const makeRequet = async () => {
			try {
				const respo = await req.get(url);
				setResponse(respo);
			} catch (error) {
				setError(error as AxiosError);
			}
		};
		makeRequet();
	}, []);

	return { response, error };
};
