import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class MyRides extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <React.Fragment>
        <View>
          <Text style={styles.title}>My Rides</Text>
        </View>
        <View style={styles.container}>{}</View>
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
  title: {
    fontSize: 30,
    textAlign: 'center',
    padding: 50,
    color: '#ff8700',
  },
});
