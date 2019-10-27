//importing necessary libraries
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
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
            firstName: '',
            lastName: '',
            username: '',
            dateOfBirth: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    //renders form component with signup argument, creates a text and button
    render() {
        return (
            <React.Fragment>
                <View style={styles.formContainer}>
                    <Text>{'\n'}</Text>
                    <Text>{'\n'}</Text>
                    <Text style={styles.container}>Sign up for HitchHike!</Text>
                    <TextInput
                        style={styles.inputBox} //creating first name text input
                        onChangeText={firstName => this.setState({ firstName })}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="First Name"
                        placeholderTextColor="#ff8700"
                        selectionColor="#fff"
                        keyboardType="default"
                        onSubmitEditing={() => this.firstName.focus()}
                    />
                    <TextInput
                        style={styles.inputBox} //creating last name text input
                        onChangeText={lastName => this.setState({ lastName })}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="Last Name"
                        placeholderTextColor="#ff8700"
                        selectionColor="#fff"
                        keyboardType="default"
                        onSubmitEditing={() => this.lastName.focus()}
                    />
                    <TextInput
                        style={styles.inputBox} //creating username text input
                        onChangeText={username => this.setState({ username })}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="Username"
                        placeholderTextColor="#ff8700"
                        selectionColor="#fff"
                        keyboardType="default"
                        onSubmitEditing={() => this.username.focus()}
                    />
                    <TextInput
                        style={styles.inputBox} //creating birthday text input
                        onChangeText={dateOfBirth => this.setState({ dateOfBirth })}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="Birthday: MM/DD/YYYY"
                        placeholderTextColor="#ff8700"
                        selectionColor="#fff"
                        keyboardType="default"
                        onSubmitEditing={() => this.dateOfBirth.focus()}
                    />

                    <TextInput
                        style={styles.inputBox} //creating email text input
                        onChangeText={email => this.setState({ email })}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="Email"
                        placeholderTextColor="#ff8700"
                        selectionColor="#fff"
                        keyboardType="email-address"
                        onSubmitEditing={() => this.password.focus()}
                    />
                    <TextInput
                        style={styles.inputBox} //creating password text input
                        onChangeText={password => this.setState({ password })}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor="#ff8700"
                        ref={input => (this.password = input)}
                    />
                    <TextInput
                        style={styles.inputBox} //creating confirm password text input
                        onChangeText={confirmPassword => this.setState({ confirmPassword })}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="Confirm Password"
                        placeholderTextColor="#ff8700"
                        secureTextEntry={true}
                        ref={input => (this.password = input)}
                    />
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={this.saveData}>
                            {' '}
                            Sign up!{' '}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}> Already have an account? </Text>
                    <TouchableOpacity onPress={this.goBack}>
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
