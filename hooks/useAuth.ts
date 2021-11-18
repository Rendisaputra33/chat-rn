import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
export const useAuth = () => {
	//
	const [auth, setAuth] = React.useState<any | null>(null);
	//
	React.useEffect(() => {
		const makeEffect = async () => {
			const data = await AsyncStorage.getItem('@auth').then(res => res);
			setAuth(data);
		};
		makeEffect();

		return () => {
			auth;
		};
	}, []);
	//
	return { auth };
};
