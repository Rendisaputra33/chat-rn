import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { ActivityIndicator, useColorScheme } from 'react-native';
import { View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function IndexScreen({
	navigation,
}: RootStackScreenProps<'Root'>) {
	const theme = useColorScheme();
	React.useEffect(() => {
		setTimeout(() => {
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
		}, 1500);
	}, []);

	return (
		<View style={{ width: '100%', height: '100%' }}>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<ActivityIndicator
					size={30}
					color={theme === 'dark' ? 'white' : 'black'}
				/>
			</View>
		</View>
	);
}
