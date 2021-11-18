import React, { useContext, useRef } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { View, Text } from '../components/Themed';
import { RootTabScreenProps, UsersData } from '../types';
import CardFriend from '../components/CardFriends';
import { useGetRequest } from '../hooks/useRequest';
import io, { Socket } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SocketContext } from '../context/SocketContext';
import { assignSocket } from '../context/SocketAction';

export default function TabOneScreen({
	navigation,
}: RootTabScreenProps<'TabOne'>) {
	// make request
	const { response, error } = useGetRequest<{ friends: UsersData[] }>('users');
	let socket = useRef<Socket>();
	const [auth, setAuth] = React.useState<any>({});
	const { dispatch } = useContext(SocketContext);
	// make effect
	React.useEffect(() => {
		// instance socket
		socket.current = io('http://192.168.1.3:7000');
		dispatch && dispatch(assignSocket(socket.current));
		// set user
		AsyncStorage.getItem('@auth').then(res => {
			const user = JSON.parse(res as string);
			setAuth(user);
			socket.current?.emit('add_user', user._id);
		});
	}, []);
	// render element
	return (
		<View>
			{!response && (
				<View
					style={{
						...styles.container,
						width: '100%',
						height: '100%',
						flexDirection: 'column',
					}}
				>
					<ActivityIndicator
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						}}
						color="blue"
						size="large"
					/>
				</View>
			)}
			{error !== null && (
				<View>
					<Text>error</Text>
				</View>
			)}
			{response && (
				<FlatList
					style={styles.container}
					data={response.data.friends}
					renderItem={data => (
						<CardFriend
							onSelected={() =>
								navigation.navigate('ChatRoom', {
									user: data.item,
									// socket: socket.current,
									current: auth,
								})
							}
							key={data.item._id}
							user={data.item}
						/>
					)}
					keyExtractor={(item, index) => item._id}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		paddingHorizontal: 15,
	},
});
