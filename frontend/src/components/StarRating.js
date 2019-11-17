import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

type Props = {

};

export default class StarRating extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../../assets/filled_star.png')}
                />
                <Image
                    style={styles.image}
                    source={require('../../assets/filled_star.png')}
                />
                <Image
                    style={styles.image}
                    source={require('../../assets/filled_star.png')}
                />
                <Image
                    style={styles.image}
                    source={require('../../assets/filled_star.png')}
                />
                <Image
                    style={styles.image}
                    source={require('../../assets/filled_star.png')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
     backgroundColor: 'black',
    },
    image: {
        width: 25,
        height: 25,
    }
});

