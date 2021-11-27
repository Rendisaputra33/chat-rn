import React from 'react';
import { Text, View } from 'react-native';

export default function Bubble({
	message,
	createdAt,
	isRead,
}: {
	message: string;
	createdAt: string;
	isRead: boolean;
}) {
	return (
		<View>
			<Text>{message}</Text>
		</View>
	);
}
