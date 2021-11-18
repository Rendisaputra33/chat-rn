import { SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	GestureResponderEvent,
} from 'react-native';

interface Props {
	onInput: Function;
	onSend: (e: GestureResponderEvent) => void;
	value: string;
}

export default function MessageInput({ onInput, onSend, value }: Props) {
	return (
		<View style={styles.root}>
			<View style={styles.inputContainer}>
				<SimpleLineIcons
					style={{ marginRight: 7 }}
					name="emotsmile"
					size={25}
					color="gray"
				/>
				<TextInput
					style={{ flex: 1 }}
					placeholder="type message..."
					value={value}
					onChangeText={message => onInput(message)}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={onSend}>
					<Text style={{ color: 'white', fontSize: 30, fontWeight: '500' }}>
						+
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		marginBottom: 8,
		borderRadius: 15,
	},
	inputContainer: {
		flexDirection: 'row',
		backgroundColor: '#f2f2f2',
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: '#dedede',
		flex: 1,
		borderRadius: 25,
		marginHorizontal: 10,
		alignItems: 'center',
	},
	buttonContainer: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginLeft: 0,
		marginRight: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#3777f0',
	},
});
