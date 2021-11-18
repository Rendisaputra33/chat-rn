import React from 'react';
import { Text, View } from './Themed';
import { StyleSheet } from 'react-native';

interface Props {
	isSender: boolean;
}

export default function Message({ isSender }: Props) {
	return (
		<View
			style={[styled.container, isSender ? styled.sender : styled.receiver]}
		>
			<Text style={styled.message}>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis veniam
				provident suscipit nobis
			</Text>
		</View>
	);
}

const styled = StyleSheet.create({
	container: {
		marginHorizontal: 10,
		marginTop: 15,
		padding: 14,
		maxWidth: '70%',
		borderRadius: 20,
	},
	message: {
		color: 'white',
		fontSize: 15,
	},
	sender: {
		marginLeft: 'auto',
		borderTopEndRadius: 0,
		borderTopStartRadius: 20,
		backgroundColor: '#3777f0',
	},
	receiver: {
		marginLeft: 10,
		borderTopEndRadius: 20,
		borderTopStartRadius: 0,
		backgroundColor: '#afafaf',
	},
});