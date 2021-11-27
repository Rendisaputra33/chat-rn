import { Socket } from 'socket.io-client';

type Type = {
	type: string;
	payload: Socket;
};

export const SocketReducer = (
	state: { socket: Socket | null },
	action: Type
) => {
	switch (action.type) {
		case 'SOCKET_INSTANCE':
			return {
				socket: action.payload,
			};
		default:
			return state;
	}
};
