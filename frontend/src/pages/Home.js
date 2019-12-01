/*
    Our home file that users will see once logging in to the app
*/

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    // AsyncStorage
} from 'react-native';
import { Button } from 'react-native-paper';
import { myRides } from './Styles';


export default class Home extends Component {

    constructor(props) {
        super(props);
        // this.state = { 
        //     rides: {},
        // };
    }

    // displayName = async() => {
    //     try{
    //         let user = await AsyncStorage.getItem('user');
    //         let parsedUser = JSON.parse(user);
    //         this.state.rides = parsedUser.data.rides;
    //         console.log("extracting from asyncstorage")
    //         console.log(this.state.rides);
    //         // <Text>user</Text>
    //     } catch(error){
    //         alert(error)
    //     }
    // }

    render() {
        return (
            <React.Fragment>
                <View style={styles.formContainer}>
                    <Text style={styles.container}
                    // ref={ref=>{this.displayName()}}
                    >
                        Welcome to HitchHike!
                    </Text>

                    <Button  mode="contained"
                                style={myRides.inputBox}
                                onPress={() => {
                                    // console.log('Signing up');
                                    this.props.navigation.navigate('AvailableRidesRoute')
                                }}
                                // loading={this.state.loading}
                                theme={{
                                        colors: {
                                            primary: '#ff8700'
                                        }
                                    }
                                }
                                title = {"Sign up"} 
                    >
                        {label = "Available rides"}
                    </Button>

                    <Button  mode="contained"
                                style={myRides.inputBox}
                                onPress={() => {
                                    // console.log('Signing up');
                                    this.props.navigation.navigate('PostRidesRoute')
                                }}
                                // loading={this.state.loading}
                                theme={{
                                        colors: {
                                            primary: '#ff8700'
                                        }
                                    }
                                }
                                title = {"Sign up"} 
                    >
                        {label = "Post Rides"}
                    </Button>

                    <Button  mode="contained"
                                style={myRides.inputBox}
                                onPress={() => {
                                    // console.log('Signing up');
                                    this.props.navigation.navigate('MyRidesRoute')
                                }}
                                // loading={this.state.loading}
                                theme={{
                                        colors: {
                                            primary: '#ff8700'
                                        }
                                    }
                                }
                                title = {"Sign up"} 
                    >
                        {label = "My Rides"}
                    </Button>
                </View>
            </React.Fragment>
        );
    }
}

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