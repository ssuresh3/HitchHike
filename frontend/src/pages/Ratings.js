import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import assets from '../../assets';


//props is a variable?
type Props = {

};

export default class Ratings extends Component<Props>{
    render(){
        return(
            <View style = {styles.container}></View>
        );
    }
}

//styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    }

});

