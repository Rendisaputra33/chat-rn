import React from 'react';
import {
	ActivityIndicator,
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
} from 'react-native';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import datas from '../constants/users';
import CardFriend from '../components/CardFriends';
import { useGetRequest } from '../hooks/useRequest';

export default function TabOneScreen({
	navigation,
}: RootTabScreenProps<'TabOne'>) {
	// make request
	const { response, error } = useGetRequest('users');
	// render element
	return (
		<View>
			{!response && <ActivityIndicator color="blue" />}
			{error && (
				<View>
					<Text>error</Text>
				</View>
			)}
			{response && (
				<FlatList
					style={styles.container}
					data={datas.users}
					renderItem={data => (
						<CardFriend
							onSelected={() =>
								navigation.navigate('ChatRoom', { user: data.item })
							}
							user={data.item}
							key={data.index}
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
