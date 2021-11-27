import { Socket } from 'socket.io-client';
import React, { useReducer, Dispatch } from 'react';
import { SocketReducer } from './SocketReducer';

interface SoketType {
	socket: Socket | null;
	dispatch?: Dispatch<any>;
}

const INIT: SoketType = {
	socket: null,
};

export const SocketContext = React.createContext(INIT);

export function SocketContextProvider({ children }: any) {
	const [state, dispatch] = useReducer(SocketReducer, INIT);
	return (
		<SocketContext.Provider value={{ socket: state.socket, dispatch }}>
			{children}
		</SocketContext.Provider>
	);
}
