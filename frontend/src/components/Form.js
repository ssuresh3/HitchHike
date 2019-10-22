//importing necessary react and react-native libraries
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';

//creating the Form class
export default class Form extends Component {

    //default constructor with email and password
    constructor(props) {
        super(props);

        //dynamic state
        this.state = {
            email: '',
            password: ''
        }
    }

    //saving user info details
    saveData = async () => {
        const { email, password } = this.state;

        //saving data with asyncstorage
        let loginDetails = {
            email: email,
            password: password
        }

        //registers a new user to the app
        if (this.props.type == Signup) { //may need to change back to != Login
            AsyncStorage.setItem(loginDetails, JSON.stringify(loginDetails)); //parses java object into text
            Keyboard.dismiss();
            alert("You have successfully registered! Please verify your email!"); 
            /*
                TODO:
                redirect to login page
            */
        }

        //logs in an old user
        else if (this.props.type == Login) {
            try {
                let loginDetails = await AsyncStorage.getItem('loginDetails');
                let ld = JSON.parse(loginDetails); //parses text into a java object
                if (ld.email != null && ld.password != null) {
                    if (ld.email == email && ld.password == password) {
                        alert("Welcome!");
                        /*
                            TODO:
                            redirect to home page
                        */
                    } else {
                        alert("Invalid email or password!");
                    }
                }
            } catch{
                alert(Error);
            }
        }
    }

    //show data after someone has registered
    showData = async () => {
        let loginDetails = await AsyncStorage.getItem('loginDetails');
        let ld = JSON.parse(loginDetails);
        alert("Your email is: " + ld.email + " Your password is: " + ld.password);
    }

    /*
        TODO:
        create check method if email is valid
    */

    //creating the display for signup and login
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputBox} //creating email text input
                    onChangeText={(email) => this.setState({ email })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Email"
                    placeholderTextColor="#002f6c"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.password.focus()} />
                <TextInput style={styles.inputBox} //creating password text input
                    onChangeText={(password) => this.setState({ password })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="#002f6c"
                    ref={(input) => this.password = input}
                />
                <TouchableOpacity style={styles.button}>
                    {
                        //depending on what the user presses, the button will either render login or signup
                    }
                    <Text style={styles.buttonText} onPress={this.saveData}> {this.props.type} </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

//adding CSS styling
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', //centers flex objects
        alignItems: 'center'
    },

    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },

    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});
