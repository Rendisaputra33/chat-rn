/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
	CompositeScreenProps,
	NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	Index: NavigatorScreenParams<RootTabParamList> | undefined;
	Root: undefined;
	Login: undefined;
	Modal: undefined;
	ChatRoom: {
		user: {
			username: string;
			password: string;
			_id: string;
		};
		current: any;
		// socket?: Socket;
	};
	NotFound: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, T>;

export type RootTabParamList = {
	TabOne: undefined;
	TabTwo: undefined;
};

export type RootTabScreenProps<T extends keyof RootTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<RootTabParamList, T>,
		NativeStackScreenProps<RootStackParamList>
	>;

export type UsersData = {
	_id: string;
	username: string;
	password: string;
};
