import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native';


import { TextInput } from 'react-native-paper';

// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import LocationAutocompleteInput from '../components/LocationAutocompleteInput';

import {myRides} from '../pages/Styles';

export default class AddRide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: null,
      end: null,
      price: '',
      data: '',
      time: '',
      seats: '',
    };

    this.user = AsyncStorage.getItem("user");
  }

  render() {
    return (
      <React.Fragment>
        <KeyboardAwareScrollView
          contentContainerStyle={myRides.container}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
          keyboardShouldPersistTaps={true}>
          <LocationAutocompleteInput
            style={{ zIndex: 8, margin: 10 }}
            label={'Pickup'}
            mode={'outlined'}
            onEnter={location => {
              this.setState({ start: location });
            }}
          />
          <LocationAutocompleteInput
            style={{ zIndex: 6, margin: 10 }}
            label={'Dropoff'}
            mode={'outlined'}
            onEnter={location => {
              this.setState({ end: location });
            }}
          />
          <TextInput
            style={myRides.inputBox}
            dense={true}
            theme={theme}
            mode={'outlined'}
            label={'Price'}
            value={"$"+this.state.price}
            keyboardType={'numeric'}
            onChangeText={price => this.setState({ price:price.substring(1) })}
          />
          <TextInput
            style={myRides.inputBox}
            dense={true}
            theme={theme}
            mode={'outlined'}
            label={'Seats Available'}
            keyboardType={'numeric'}
            onChangeText={seats => this.setState({ seats:seats })}
          />       
          <TextInput
            style={myRides.inputBox} //creating password text input
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Date"
            placeholderTextColor="#ff8700"
            dense={true}
            mode={'outlined'}
            onChangeText={date => this.setState({ date })}
          />
          <TextInput
            style={myRides.inputBox} //creating password text input
            // underlineColorAndroid="rgba(0,0,0,0)"
            // placeholder="Time"
            // placeholderTextColor="#ff8700"
          //  style={styles.inputBox} //creating password text input
            label={'Time'}
            theme={theme}
            dense={true}
            mode={'outlined'}
            onChangeText={time => this.setState({ time })}
          />
          <TouchableOpacity
            style={myRides.button}
            onPress={() => {
              var body = JSON.stringify({
                username: this.user.username,
                origin: {
                  x: this.state.start.lat,
                  y: this.state.start.lng,
                  desc: this.state.start.description,
                },
                destination: {
                  x: this.state.end.lat,
                  y: this.state.end.lng,
                  desc: this.state.end.description,
                },
                seats: this.state.seats,
                departure: this.state.time,
              });
              console.log(body);

              fetch(
                'http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/rides/postRide',
                {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: body,
                }
              ).catch(error => {
                console.log(error);
              });

              // this.props.navigation.navigate('HomeRoute');
            }}>
            <Text style={myRides.buttonText}>Post Ride!</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </React.Fragment>
    );
  }
}

// const theme = { colors: { primary: '#ff8700' } };

// const myRides = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   inputBox: {
//     width: '80%',
//     margin: 10,
//     zIndex:1
//   },

//   button: {
//     width: 300,
//     backgroundColor: '#ff8700',
//     borderRadius: 25,
//     marginVertical: 10,
//     paddingVertical: 12,
//   },

//   buttonText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#ffffff',
//     textAlign: 'center',
//   },
// });
