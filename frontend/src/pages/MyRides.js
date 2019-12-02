import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import Divider from 'react-native-divider'
import {myRides} from "./Styles"
class RideView extends React.Component {
  render() {
    return (
      <View>
        <Card>
          <Text>{this.props.driverName}</Text>
          <Text>{this.props.origin}</Text>
          <Text>{this.props.destination}</Text>
          <Text>{this.props.time}</Text>
        </Card>
      </View>
    );
  }
}
export default class App extends React.Component {
  render() {
    return (
      <View>
        <Divider borderColor="#fff870" color="black" orientation="center">
            Your Posted Rides
        </Divider>
        <RideView
          driverName={'Bitchass'}
          origin={'Bitch'}
          destination={'Ass'}
          time={'When the clock strikes 9'}
        />
        <Divider borderColor="#fff870" color="black" orientation="center">
            Your Booked Rides
        </Divider>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});