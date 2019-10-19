//importing necessary react and react-native libraries
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard} from 'react-native';
import { Actions } from 'react-native-router-flux';

//creating the Form class
export default class Form extends Component{

    //default constructor with email and password
    constructor(props){
        super(props);
        this.state={
            email: '',
            password: ''
        }
    }

    //saving user info details
    saveData   
}