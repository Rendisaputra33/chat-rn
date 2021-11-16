import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import useColorScheme from '../hooks/useColorScheme';
import { RootTabParamList, RootTabScreenProps, UsersData } from '../types';

interface Extended {
	user: UsersData;
	onSelected: Function;
}

const CardFriend: React.FC<Extended> = ({ user, onSelected }) => {
	const theme = useColorScheme();
	return (
		<TouchableOpacity onPress={() => onSelected()}>
			<View style={styles.wraperCard}>
				<Image
					source={{ uri: user.avatar }}
					style={{
						...styles.avatar,
						borderColor: theme === 'dark' ? 'white' : 'black',
					}}
				/>
				<View style={styles.badge}>
					<Text style={styles.badgeText}>4</Text>
				</View>
				<View style={styles.usernameWrap}>
					<View style={styles.usernameRow}>
						<Text
							style={{
								...styles.username,
								color: theme === 'dark' ? 'white' : 'black',
							}}
						>
							{user.first_name + ' ' + user.last_name}
						</Text>
						<Text style={{ color: theme === 'dark' ? '#cecece' : 'gray' }}>
							11.00 AM
						</Text>
					</View>
					<Text
						style={{
							marginVertical: 2,
							color: theme === 'dark' ? '#cecece' : 'black',
						}}
					>
						test message from rendi...
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	wraperCard: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 13,
	},
	side: {
		flex: 1,
	},
	avatar: {
		height: 55,
		width: 55,
		borderColor: 'black',
		backgroundColor: 'white',
		borderWidth: 1,
		borderRadius: 50,
	},
	badge: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#3872e9',
		width: 20,
		height: 20,
		borderRadius: 10,
		position: 'absolute',
		left: 38,
		borderColor: 'white',
		borderWidth: 1,
		top: 0,
	},
	badgeText: {
		color: 'white',
		fontSize: 12,
	},
	usernameWrap: {
		marginHorizontal: 13,
		display: 'flex',
		flex: 1,
		justifyContent: 'space-between',
	},
	usernameRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	username: {
		fontSize: 17,
		fontWeight: 'bold',
	},
});

export default CardFriend;
