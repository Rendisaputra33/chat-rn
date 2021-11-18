import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function IndexScreen({
	navigation,
}: RootStackScreenProps<'Root'>) {
	React.useEffect(() => {
		AsyncStorage.getItem('@auth')
			.then(res => {
				if (!res) {
					return navigation.replace('Login');
				}
				navigation.replace('Index');
			})
			.catch(e => {
				navigation.replace('Login');
			});
	}, []);

	return (
		<View
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<ActivityIndicator size="large" color="blue" />
		</View>
	);
}
