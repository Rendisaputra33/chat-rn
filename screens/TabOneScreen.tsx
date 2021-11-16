import React, { useRef } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import datas from '../constants/users';
import CardFriend from '../components/CardFriends';
import { useGetRequest } from '../hooks/useRequest';
import io, { Socket } from 'socket.io-client';

export default function TabOneScreen({
	navigation,
}: RootTabScreenProps<'TabOne'>) {
	// make request
	const { response, error } = useGetRequest('users');
	let socket = useRef<Socket>();
	// make effect
	React.useEffect(() => {
		socket.current = io('http://192.168.1.3:7000');
	}, []);
	// render element
	return (
		<View>
			{!response && <ActivityIndicator color="blue" />}
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
								navigation.navigate('ChatRoom', { user: data.item })
							}
							user={data.item}
							key={Math.random()}
						/>
					)}
					showsVerticalScrollIndicator={false}
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
