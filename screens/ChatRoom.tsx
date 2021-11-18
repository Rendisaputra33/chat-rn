import axios from 'axios';
import React, { useContext } from 'react';
import { FlatList, GestureResponderEvent } from 'react-native';
import Message from '../components/Message';
import MessageInput from '../components/MessageInput';
import { View } from '../components/Themed';
import { SocketContext } from '../context/SocketContext';
import { useGetRequest } from '../hooks/useRequest';
import { RootStackScreenProps } from '../types';

export default function ChatRoom({
	route: { params },
}: RootStackScreenProps<'ChatRoom'>) {
	//
	const [message, setMessage] = React.useState<string>('');
	const [chats, setChats] = React.useState<any[]>([]);
	const { socket } = useContext(SocketContext);

	const { response, error } = useGetRequest(
		`chats?sender=${params.current._id}&receiver=${params.user._id}`
	);

	//
	React.useEffect(() => {
		socket?.on('rec_message', data => {
			setChats(pre => [...pre, { ...data }]);
		});
	}, []);
	//
	React.useEffect(() => {
		response && setChats([...response.data.chats]);
	}, [response]);
	//
	const onInput = (e: string) => {
		setMessage(e);
	};
	// event when user send a chat
	const onSend = (e: GestureResponderEvent) => {
		const datetime = new Date();
		const coreData = {
			receiver: params.user._id,
			sender: params.current._id,
			message: message,
		};
		socket?.emit('send_message', {
			...coreData,
			createdAt: datetime,
			updatedAt: datetime,
		});
		saveChat(coreData);
	};
	//
	const saveChat = (data: any) => {
		axios.post('192.168.1.3:7000/api/chats', data).then(res => {
			setChats(pre => [...pre, res.data.newChat]);
		});
	};
	// render elemt
	return (
		<View style={{ height: '100%', display: 'flex' }}>
			{chats && (
				<FlatList
					style={{ marginBottom: 10 }}
					data={chats}
					renderItem={({ item, index }) => (
						<Message
							isSender={item.sender === params.current._id}
							message={item}
							key={index.toString()}
						/>
					)}
					keyExtractor={item => Math.random().toString()}
				/>
			)}
			<MessageInput onInput={onInput} value={message} onSend={onSend} />
		</View>
	);
}
