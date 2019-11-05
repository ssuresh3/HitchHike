import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

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
        <View style={styles.container}>
          <TextInput
            style={styles.inputBox} //creating email text input
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Start Location"
            placeholderTextColor="#ff8700"
            selectionColor="#fff"
            onChangeText={start => this.setState({ start })}
          />
          <TextInput
            style={styles.inputBox} //creating password text input
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="End Location"
            placeholderTextColor="#ff8700"
            onChangeText={end => this.setState({ end })}
          />
          <TextInput
            style={styles.inputBox} //creating password text input
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Price"
            placeholderTextColor="#ff8700"
            onChangeText={price => this.setState({ price })}
          />
          <TextInput
            style={styles.inputBox} //creating password text input
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Date"
            placeholderTextColor="#ff8700"
            onChangeText={date => this.setState({ date })}
          />
          <TextInput
            style={styles.inputBox} //creating password text input
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Time"
            placeholderTextColor="#ff8700"
            onChangeText={time => this.setState({ time })}
          />
          <TextInput
            style={styles.inputBox} //creating password text input
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Seats Available"
            placeholderTextColor="#ff8700"
            onChangeText={seats => this.setState({ seats })}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              fetch('http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/rides/postRide', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username:"$$aman69420$$",
                  origin: this.state.start,
                  destination: this.state.end,
                  seats:this.state.seats,
                  departure:this.state.time
                }),
              }).catch(error => {
                console.log(error);
              });
              console.log(this.state);
            }}>
            <Text style={styles.buttonText}>Post Ride!</Text>
          </TouchableOpacity>
        </View>
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
    width: 300,
    backgroundColor: '#fffdd0',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#002f6c',
    marginVertical: 10,
    textAlign: 'center',
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
