import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Keyboard
} from 'react-native';
import { getProvidesAudioData } from 'expo/build/AR';

var axios = require('axios');

//creating the Form class
class Ride extends Component {
    //default constructor with email and password
    constructor(props) {
        super(props);

        //dynamic state
        this.state = {
            numAvailable: this.props.numAvailable,
            toShow: ''
        };
    }

    decrementRides = () => {
        this.setState(previousState => {
            return {
                numAvailable: --this.state.numAvailable
            };
        });
    };

    makeARequest = () => {
        // alert('hi'); console.log('hi')
        axios
            .get('http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/sendmeanemail')
            .then(res => {
                this.setState(previousState => {
                    return {toShow: res.data};
                });
                // console.log(this.state.toShow);
            });
        // console.log('here');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.displayText1}>{this.props.driverFirstName}</Text>
                <Text style={styles.displayText}>
                    Number of spots: {this.state.numAvailable}
                </Text>
                <Text style={styles.displayText}>From: {this.props.origin}</Text>
                <Text style={styles.displayText}>To: {this.props.destination}</Text>
                <Text style={styles.displayText}>
                    Departs at: {this.props.departsAt}
                </Text>
                <View>
                    <TouchableOpacity style={styles.button} onPress={this.makeARequest}>
                        <Text style={styles.buttonText}>Book!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rides: []
        };

        // console.log('here')

        // axios.get("http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/rides/allRides", function(response){
        //     console.log("here2")
        //     console.log(response)
        // })

        // var res = fetch("http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/rides/allRides");
        this.getRides()
        // console.log(res)
    }

    async getRides(){
        return fetch("http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/rides/allRides", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((data)=>{
            data.json().then(data => {
                console.log(data.body.children)
                this.setState(previousState => {return {rides: data.body.children}})
            })
        });
    }

    render() {
        return (
            <View>
                <Text style={styles.buttonText}>Choose a ride!</Text>
                {this
                    .state
                    .rides
                    .map((obj, key) => {
                        // console.log(ride);
                        var ride = obj.Ride
                        return (
                            <View>
                                <Ride
                                    key={key}
                                    driverFirstName={ride.driverUserName}
                                    numAvailable={ride.maxSeats}
                                    origin={ride.origin.desc}
                                    destination={ride.destination.desc}
                                    departsAt={ride.departTime}/>
                            </View>
                        );
                    })}
            </View>
        );
        // return null
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'black',
        padding: 10,
        fontSize: 30,
        borderColor: 'black',
        borderWidth: 2
    },

    displayText: {
        // Setting up Hint Align center.
        textAlign: 'center',
        height: 25,
        backgroundColor: '#FFFFFF',
        fontSize: 20
    },
    displayText1: {
        // Setting up Hint Align center.
        textAlign: 'center',
        height: 35,
        fontWeight: 'bold',
        backgroundColor: '#FFFFFF',
        //textDecorationLine: 'underline',
        fontSize: 27
    },

    button: {
        // width: 100, backgroundColor: '#ff8700', borderRadius: 25, marginVertical: 10,
        // paddingVertical: 12, justifyContent: 'center', alignItems: 'center'
        // textAlign: 'center',
        height: 30,
        borderWidth: 2,
        borderColor: '#ff8700',
        borderRadius: 20,
        backgroundColor: '#ff8700'
    },

    buttonText: {
        fontSize: 25,
        fontWeight: '500',
        color: '#FFFFFF',
        textAlign: 'center'
    }
});

var dummyRides = [
    {
        origin: {
            x: 0.4,
            y: 0.5
        },
        destination: {
            x: 0.7,
            y: 0.8
        },
        maxSeats: 4,
        departTime: '11:11'
    }, {
        origin: {
            x: 0.5,
            y: 0.6
        },
        destination: {
            x: 0.3,
            y: 0.5
        },
        maxSeats: 4,
        departTime: '11:23'
    }
];
