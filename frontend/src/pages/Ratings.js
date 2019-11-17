import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text
} from 'react-native';

import StarRating from '../components/StarRating';


//props is a variable?
type Props = {

};

export default class Ratings extends Component<Props>{
    render(){
        return(
            <View style = {styles.container}>
                <StarRating/>
            </View>
        );
    }
}

//styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

