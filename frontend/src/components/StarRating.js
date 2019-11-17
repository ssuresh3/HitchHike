import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

type Props = {

};

export default class StarRating extends Component<Props> {
	render() {
		return (
			<View style={ styles.container }>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		width: 100,
		height: 50
	}
});