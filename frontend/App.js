import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native';

import Route from './src/Route.js'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#002f6c"
          barStyle="light-content"
        />
        <Route />
      </View>
    );
  }
}

//adding CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})