import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { TextInput } from 'react-native-paper';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import LocationAutocompleteInput from '../components/LocationAutocompleteInput';

export default class AddRide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: '',
      end: '',
      price: '',
      data: '',
      time: '',
      seats: '',
    };
  }

  render() {
    return (
      <React.Fragment>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
          keyboardShouldPersistTaps={true}>
          <LocationAutocompleteInput
            style={{ zIndex: 8, margin: 10 }}
            label={'Pickup'}
            onEnter={location => {
              this.setState({ start: location });
            }}
          />
          <LocationAutocompleteInput
            style={{ zIndex: 6, margin: 10 }}
            label={'Dropoff'}
            onEnter={location => {
              this.setState({ end: location });
            }}
          />
          <TextInput
            style={styles.inputBox} //creating password text input
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Price"
            placeholderTextColor="#ff8700"
            dense={true}
            onChangeText={price => this.setState({ price })}
          />
          <TextInput
            style={styles.inputBox} //creating password text input
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Date"
            placeholderTextColor="#ff8700"
            dense={true}
            onChangeText={date => this.setState({ date })}
          />
          <TextInput
            style={styles.inputBox} //creating password text input
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Time"
            placeholderTextColor="#ff8700"
            dense={true}
            onChangeText={time => this.setState({ time })}
          />
          <TextInput
            style={styles.inputBox} //creating password text input
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Seats Available"
            placeholderTextColor="#ff8700"
            dense={true}
            onChangeText={seats => this.setState({ seats })}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log(this.state);

              fetch(
                'http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/rides/postRide',
                {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: '$$aman69420$$',
                    origin: {x:this.state.start.lat,y:this.state.start.lon},
                    destination: {x:this.state.end.lat,y:this.state.end.lon},
                    seats: this.state.seats,
                    departure: this.state.time,
                  }),
                }
              ).catch(error => {
                console.log(error);
              });
              console.log(this.state);
              // this.props.navigation.navigate('HomeRoute');
            }}>
            <Text style={styles.buttonText}>Post Ride!</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputBox: {
    width: '80%',
    backgroundColor: '#eeeeee',
    color: '#002f6c',
    textAlign: 'center',
    margin: 10,
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
