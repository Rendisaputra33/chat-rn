import React from 'react';
import { FlatList, GestureResponderEvent } from 'react-native';
import Message from '../components/Message';
import MessageInput from '../components/MessageInput';
import { View } from '../components/Themed';
import { useGetRequest } from '../hooks/useRequest';
import { RootStackScreenProps } from '../types';

export default function ChatRoom({
	route: { params },
}: RootStackScreenProps<'ChatRoom'>) {
	//
	const [message, setMessage] = React.useState<string>('');
	const [chats, setChats] = React.useState<any[]>([]);

	const { response, error } = useGetRequest(
		`chats?sender=${params.current._id}&receiver=${params.user._id}`
	);

	//
	React.useEffect(() => {
		params.socket?.on('rec_message', data => {
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
	//
	const onSend = (e: GestureResponderEvent) => {
		params.socket?.emit('send_message', {
			receiver: params.user._id,
			sender: params.current._id,
			message: message,
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
