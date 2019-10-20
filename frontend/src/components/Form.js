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
    saveData =async()=>{
        const {email, password} = this.state;
        
        //saving data with asyncstorage
        let loginDetails={
            email: email,
            password: password
        }

        //registers a new user to the app
        if(this.props.type == Signup){ //may need to change back to != Login
            AsyncStorage.setItem(loginDetails, JSON.stringify(loginDetails));
            Keyboard.dismiss();
            alert("You have successfully registered!");
            this.login(); //where does this function come from?
        }

        //logs in an old user
        else if(this.props.type == Login){
            try{
                let loginDetails = await AsyncStorage.getItem('loginDetails');
                let ld = JSON.parse(loginDetails);
                if(ld.email != null && ld.password != null){
                    if(ld.email == email && ld.password == password){
                        alert("Welcome!");
                    } else{
                        alert("Invalid email or password!");
                    }
                }
            } catch{
                alert(Error);
            }
        }
    }
}
