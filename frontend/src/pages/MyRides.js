import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
// You can import from local files
import AssetExample from './components/AssetExample';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import Divider from 'react-native-divider'
class BeautifulText extends React.Component{
  render(){
    return(
      <Text style = {styles.buttonText}>{this.props.text}</Text>
    )
  }
}
class RideView extends React.Component {
  render() {
    
    return (
      <View>
        <Card style = {styles.container}>
        <View>
        <View style={[myRides.cardRow, { marginTop: 20 }]}>
          <Text numberOfLines={1}>
            {this.props.item.origin.name.length > 15
              ? this.props.item.origin.name.substring(0, 14) + '...'
              : this.props.item.origin.name}
          </Text>
          <Image
            style={{
              width: 30,
              height: 20,
              marginLeft: 30,
              marginRight: 30,
              marginBottom: 10,
            }}
            source={require('arrow_right.png')}
          />
          <Text numberOfLines={1}>
            {this.props.item.destination.name.length > 15
              ? this.props.item.destination.name.substring(0, 14) + '...'
              : this.props.item.destination.name}
          </Text>
        </View>

        <View style={[myRides.cardRow, { marginBottom: 20 }]}>
          <Text>
            {new Date().toDateString()} at{' '}
            {new Date().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <Text />
        </View>
      </View>
        </Card>
      </View>
    );
  }
}
export default class App extends React.Component {
  render() {
    return (
      <View>
        <Divider borderColor="#ff8700" color="#ff8700" orientation="center">
            Your Posted Rides
        </Divider>
        <RideView
          item = {x}
        />
        <Divider borderColor="#ff8700" color="#ff8700" orientation="center">
            Your Booked Rides
        </Divider>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
      //  justifyContent: 'flex-end'
    },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
        textAlign: 'center'
  }
});


var x = {
  "rideID": "ssuresh3:3:10:9",
  "origin": {
      "x": 48.13128570000001,
      "y": 11.5493024,
      "desc": "Theresienwiese, Bavariaring, Munich, Germany",
      "name": "Theresienwiese"
  },
  "destination": {
      "x": 42.56285560000001,
      "y": -83.1841251,
      "desc": "Somerset Collection, West Big Beaver Road, Troy, MI, USA",
      "name": "Somerset Collection"
  },
  "maxSeats": 5,
  "departTime": "2020-12-02T10:09:07.000Z",
  "driverUserName": "ssuresh3",
  "seatsLeft": 5
}