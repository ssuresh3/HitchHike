/*
    This file renders the signup page and allows users to input and submit their information
    Users will be routed to Verify.js upon clicking Sign Up!
    Users have the option to login if they have already been verified (they can be routed to Login.js)
*/

//importing necessary libraries
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
// import Form from '../components/Form.js'
// import { Actions } from 'react-native-router-flux';


//creating Signup class
export default class Signup extends Component {
    //function to load previous page on a stack
    // goBack() {
    //     Actions.pop();
    // }

    constructor(props) {
        super(props);

        this.state = {
            fName: '',
            lName: '',
            username: '',
            DOB: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    // postSignupData() {
    //     console.log('hello');
    //     fetch('http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/signup', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             fName: this.state.fName,
    //             lName: this.state.lName,
    //             username: this.state.username,
    //             DOB: this.state.DOB,
    //             email: this.state.email,
    //             password: this.state.password
    //         }),
    //     });
    // }

    //renders form component with signup argument, creates a text and button
    render() {
        // console.log(this.state.fName);
        // console.log(this.state.lName);
        // console.log(this.state.username);
        // console.log(this.state.DOB);
        // console.log(this.state.email);
        // console.log(this.state.password);
        return (
            <React.Fragment>
                <View style={styles.formContainer}>
                    <KeyboardAvoidingView style={styles.formContainer}>
                        <Text style={styles.container}>Sign up for HitchHike!</Text>
                        <TextInput
                            style={styles.inputBox} //creating first name text input
                            onChangeText={fName => this.setState({ fName })}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder="First Name"
                            placeholderTextColor="#ff8700"
                            selectionColor="#fff"
                            keyboardType="default"
                        // onSubmitEditing={(event) => this.updateText(event.nativeEvent.text)}
                        />
                        <TextInput
                            style={styles.inputBox} //creating last name text input
                            onChangeText={lName => this.setState({ lName })}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder="Last Name"
                            placeholderTextColor="#ff8700"
                            selectionColor="#fff"
                            keyboardType="default"
                        // onSubmitEditing={() => this.lName.focus()}
                        />
                        <TextInput
                            style={styles.inputBox} //creating username text input
                            onChangeText={username => this.setState({ username })}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder="Username"
                            placeholderTextColor="#ff8700"
                            selectionColor="#fff"
                            keyboardType="default"
                        // onSubmitEditing={() => this.username.focus()}
                        />
                        <TextInput
                            style={styles.inputBox} //creating birthday text input
                            onChangeText={DOB => this.setState({ DOB })}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder="Birthday: MM/DD/YYYY"
                            placeholderTextColor="#ff8700"
                            selectionColor="#fff"
                            keyboardType="default"
                        // onSubmitEditing={() => this.DOB.focus()}
                        />

                        <TextInput
                            style={styles.inputBox} //creating email text input
                            onChangeText={email => this.setState({ email })}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder="Email"
                            placeholderTextColor="#ff8700"
                            selectionColor="#fff"
                            keyboardType="email-address"
                        // onSubmitEditing={() => this.password.focus()}
                        />
                        <TextInput
                            style={styles.inputBox} //creating password text input
                            onChangeText={password => this.setState({ password })}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor="#ff8700"
                        // ref={input => (this.password = input)}
                        />
                        <TextInput
                            style={styles.inputBox} //creating confirm password text input
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder="Confirm Password"
                            placeholderTextColor="#ff8700"
                            secureTextEntry={true}
                        // ref={input => (this.password = input)}
                        />
                    </KeyboardAvoidingView>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => {
                            console.log('Signing up');
                            fetch('http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/signup', {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    fName: this.state.fName,
                                    lName: this.state.lName,
                                    username: this.state.username,
                                    DOB: this.state.DOB,
                                    email: this.state.email,
                                    password: this.state.password
                                }),
                            });
                            this.props.navigation.navigate('VerifyRoute')
                        }

                        }>
                            {' '}
                            Sign Up{' '}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}> Already have an account? </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginRoute')}>
                        <Text style={styles.signupButton}> Sign in! </Text>
                    </TouchableOpacity>
                </View>
            </React.Fragment>
        );
    }
}

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
