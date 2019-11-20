import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { Card } from 'react-native-paper';
var axios = require("axios");
export default class MyRides extends Component {
    getRating = function(username) {
        var rating = null;
        axios.post('http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/getRating',{username: username})
        .then(function (response){
            rating = response.data
        })
        return rating;
    }
  render() {
    
    return (
        //Surya: please get the ride from the ride selction page while routing. This just has dummy info
      <React.Fragment>
        <View style={styles.container}>
          <View style = {styles.title}>
            <Text> Ride Details</Text>
          </View>
              <Card style={styles.rideCard}>
                <View style={styles.cardRow}>
                  <Text>{ride.origin.desc}</Text>
                  <Image style={{width: 60, height: 100,marginTop: 30, marginLeft:30,marginRight:30,marginBottom:10}} source={require('../../assets/arrow_right.png')}/>
                  <Text>{ride.destination.desc}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text>Departs at {ride.departTime}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text>Rider's Phone Number{ride.riderPhone}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text>Driver's Rating{this.getRating(ride.driverUserName)}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text>Number of seats left:{ride.seatsLeft}</Text>
                </View>
              </Card>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    padding: 20,
    marginTop:20,
    color: '#ff8700',
  },
  rideCard: {
    padding: 20,
    margin: 10,
    marginTop:0,
    alignSelf: 'stretch',
    shadowRadius:5
  },
  cardRow: {
    flexDirection:"row",
    justifyContent:"center",
  }
});

var ride = {
  rideID : 12345,
  origin : "San Francisco",
  destination : "San Bruno",
  maxSeats : 5,
  departTime : 9,
  driverUserName: "heyyyyy",
  seatsLeft : 4

}

