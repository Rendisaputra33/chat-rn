import React from 'react';
import { View, Text } from 'react-native';
import { RootStackScreenProps } from '../types';

export default function ChatRoom({
	route: {
		params: { user },
	},
}: RootStackScreenProps<'ChatRoom'>) {
	return (
		<View>
			<Text>Chat Room {user.username}</Text>
		</View>
	);
}
