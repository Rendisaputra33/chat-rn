import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import { TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function LoginScreen({
	navigation,
}: RootStackScreenProps<'Login'>) {
	const [username, setUsername] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');

	const handleSubmit = async () => {
		if (username !== '' && password !== '') {
			const data = await axios.post('http://192.168.1.183:7000/api/login', {
				username,
				password,
			});
			if (data.data.statusLogin) {
				await AsyncStorage.setItem('@auth', JSON.stringify(data.data.user));
				navigation.replace('Index');
			} else {
				alert('slah sandi blok');
			}
		} else {
			alert('isis disek blok');
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>lOGIN</Text>
			<View
				style={{
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<View style={styles.input}>
					<TextInput
						onChangeText={e => setUsername(e)}
						placeholderTextColor="white"
						style={{ color: 'white' }}
						placeholder="username..."
					/>
				</View>
				<View style={styles.input}>
					<TextInput
						onChangeText={e => setPassword(e)}
						placeholderTextColor="white"
						style={{ color: 'white' }}
						placeholder="password..."
					/>
				</View>
				<TouchableOpacity
					onPress={handleSubmit}
					style={{
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<View style={styles.button}>
						<Text style={{ color: 'white' }}>SUBMIT</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		fontSize: 35,
		fontWeight: 'bold',
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	input: {
		backgroundColor: '#a5a5a5',
		marginVertical: 10,
		width: '80%',
		height: 50,
		justifyContent: 'center',
		paddingHorizontal: 20,
		borderRadius: 30,
	},
	button: {
		height: 50,
		width: '80%',
		backgroundColor: '#3777f0',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		borderRadius: 30,
	},
});
