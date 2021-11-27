import { NavigationProp } from '@react-navigation/native';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { RootStackParamList } from '../types';

export default class Test extends Component<{
	navigation: NavigationProp<RootStackParamList>;
}> {
	render() {
		return (
			<View>
				<Text>Test</Text>
			</View>
		);
	}
}
