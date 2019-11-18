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
          <View style={styles.formContainer}>
            <Text style={styles.container}>Rate your {this.state.user}!</Text>
            <StarRating/>
          </View>
        </React.Fragment>
      );
    }
  }
  
  //styling
  //adding CSS
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
  
    signupTextCont: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 16,
        flexDirection: 'row',
    },
  
    signupText: {
        color: '#12799f',
        fontSize: 16,
    },
  
    signupButton: {
        color: '#12799f',
        fontSize: 16,
        fontWeight: '500',
    },
    formContainer: {
        justifyContent: 'center', //centers flex objects
        alignItems: 'center',
    },
  
    inputBox: {
        width: 200,
        height: 30,
        backgroundColor: '#eeeeee',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10,
    },
  
    button: {
        width: 300,
        backgroundColor: '#ff8700',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12,
    },
  
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
    },
  });

