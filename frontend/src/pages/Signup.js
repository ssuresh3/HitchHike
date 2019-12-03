/*
    This file renders the signup page and allows users to input and submit their information
    Users will be routed to Verify.js upon clicking Sign Up!
    Users have the option to login if they have already been verified (they can be routed to Login.js)
*/

//importing necessary libraries
import React, { Component } from 'react';
import {
    View,
    ScrollView,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { myRides, theme } from '../pages/Styles';

//creating Signup class
export default class Signup extends Component {
    //constructor
    constructor(props) {
        super(props);
        this.state = {
            fName: '',
            lName: '',
            username: '',
            DOB: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
            showDatePicker: false,
            datePickerMode: 'date',
        };
    }

    //renders form component with signup, creates a text and button
    render() {
        return (
            <React.Fragment>
                <ScrollView>
                    <View
                        style={myRides.containerSignup}
                    >
                        <TextInput
                            //creating first name text input
                            style={myRides.inputBox}
                            onChangeText={fName => this.setState({ fName })}
                            value={this.state.fName}
                            dense={true}
                            theme={theme}
                            mode={'outlined'}
                            label={'First Name'}
                            keyboardType="default"
                        />
                        <TextInput
                            style={myRides.inputBox} //creating last name text input
                            onChangeText={lName => this.setState({ lName })}
                            value={this.state.lName}
                            dense={true}
                            theme={theme}
                            mode={'outlined'}
                            label={'Last Name'}
                            keyboardType="default"
                        />
                        <TextInput
                            style={myRides.inputBox} //creating username text input
                            onChangeText={username => this.setState({ username })}
                            value={this.state.username}
                            dense={true}
                            theme={theme}
                            mode={'outlined'}
                            label={'Username'}
                            autoCapitalize="none"
                            keyboardType="default"
                        />
                        <TextInput
                            style={myRides.inputBox} //creating birthday text input
                            onChangeText={DOB => this.setState({ DOB })}
                            value={this.state.DOB}
                            dense={true}
                            theme={theme}
                            mode={'outlined'}
                            label={'Birthday: MM/DD/YYYY'}
                            keyboardType="default"
                        />
                        <TextInput
                            style={myRides.inputBox} //creating Phone number text input
                            onChangeText={phone => this.setState({ phone })}
                            value={this.state.phone}
                            dense={true}
                            theme={theme}
                            mode={'outlined'}
                            label={'Phone Number (Ex:1234567890)'}
                            keyboardType="default"
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={myRides.inputBox} //creating email text input
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                            dense={true}
                            theme={theme}
                            mode={'outlined'}
                            label={'Email'}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={myRides.inputBox} //creating password text input
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            dense={true}
                            theme={theme}
                            mode={'outlined'}
                            label={'Password'}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            placeholderTextColor="#ff8700"
                        />
                        <TextInput
                            style={myRides.inputBox} //creating confirm password text input
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                            value={this.state.confirmPassword}
                            dense={true}
                            theme={theme}
                            mode={'outlined'}
                            label={'Confirm Password'}
                            autoCapitalize="none"
                            secureTextEntry={true}
                        />
                        <Button style={myRides.inputBox} onPress={() => {
                            /*
                                The following if statements represent the input validation for signup
                                The functionality for input validation utilizes regular expressions in order to get the desired format of input
                            */
                            if (this.state.fName.length == 0) {
                                alert("Enter your first name!");
                                return;
                            }
                            if (this.state.lName.length == 0) {
                                alert("Enter your last name!");
                                return;
                            }
                            if (this.state.username.length < 5) {
                                alert("Username too short! Please try again and enter a username longer than 4 characters.");
                                return;
                            }
                            if (this.state.DOB.length != 10) {
                                alert("DOB is incorrect format! Please try again.");
                                return;
                            }
                            if (this.state.DOB.length == 10) {
                                var pattern = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/;
                                if (!this.state.DOB.match(pattern)) {
                                    alert("DOB is incorrect format! Please try again.");
                                    return;
                                }
                            }
                            if (this.state.phone.length != 10) {
                                alert("Phone number is incorrect format! Please try again.");
                                return;
                            }
                            if (this.state.phone.length === 10) {
                                var pattern = /\d/g;
                                if (!this.state.phone.match(pattern)) {
                                    alert("Phone number is incorrect format! Please try again.");
                                    return;
                                }
                            }
                            if (!this.state.email.includes("@ucsc.edu")) {
                                alert("Please enter a ucsc email!");
                                return;
                            }
                            if (this.state.email.includes("@ucsc.edu")) {
                                var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                if (!this.state.email.match(pattern)) {
                                    alert("Please enter a proper ucsc email!");
                                    return;
                                }
                            }
                            if (this.state.password.length < 5) {
                                alert("Password too short! Please try again and enter a username longer than 4 characters.");
                                return;
                            }
                            if (this.state.password != this.state.confirmPassword) {
                                alert("Passwords don't match! Please try again.");
                                return;
                            } else {
                                //if text inputs follow correct input format, user can then proceed to the verification process of checking their email
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
                        }
                        }
                            mode="contained"
                            style={myRides.inputBox}
                            loading={this.state.loading}
                            theme={{
                                colors: {
                                    primary: '#ff8700'
                                }
                            }
                            }
                        >
                            {label = "Sign Up"}
                        </Button>
                        {/* </TouchableOpacity> */}
                        <Button style={myRides.inputBox}
                            onPress={() => this.props.navigation.navigate('LoginRoute')}
                            mode="contained"
                            style={myRides.inputBox}
                            loading={this.state.loading}
                            theme={{
                                colors: {
                                    primary: '#ff8700'
                                }
                            }
                            }
                        >
                            {label = "Sign In"}
                        </Button>
                        {/* </ScrollView> */}
                    </View>
                </ScrollView>
            </React.Fragment>
        );
    }
}
