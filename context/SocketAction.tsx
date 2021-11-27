import { Socket } from 'socket.io-client';

export const assignSocket = (socket: Socket) => {
	return { type: 'SOCKET_INSTANCE', payload: socket };
};