//importing necessary libraries
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text
} from 'react-native';

//imports StarRating component
import StarRating from '../components/StarRating';

export default class Ratings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: 'rider' //setState of user to be either rider of driver
        };
    }


    render() {
        return (
            <React.Fragment>
                <Text style = {styles.container}>Rate your this.state.user</Text>

                <View style={styles.container}>
                    <StarRating/>
                </View>
            </React.Fragment>
        );
    }
}

//styling
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
        color: 'black',
        padding: 10,
        fontSize: 30,
    },
});

