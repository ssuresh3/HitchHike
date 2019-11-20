import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';

import { Card } from 'react-native-paper';

export default class MyRides extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rides: [],
    };
    this.displayName() 
  }

  displayName = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsedUser = JSON.parse(user);
      this.setState({rides:parsedUser.data.rides});
      console.log("extracting from asyncstorage")
      console.log(this.state.rides);
      // <Text>user</Text>
    } catch (error) {
      alert(error)
    }
  }

  render() {
    return (
      <React.Fragment>
        <View>
          <Text style={styles.title}>My Rides</Text>
        </View>
        <View style={styles.container}
        >
          {this.state.rides.map(ride => {
            return (
              <Card style={styles.rideCard}>
                <View style={styles.cardRow}>
                  <Text>{ride.origin.desc}</Text>
                  <Image style={{width: 30, height: 20,marginLeft:30,marginRight:30,marginBottom:10}} source={require('../../assets/arrow_right.png')}/>
                  <Text>{ride.destination.desc}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text>Departs at {ride.departTime}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text>Rider's Phone Number{ride.riderPhone}</Text>
                </View>
              </Card>
            );
          })}
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
    marginTop: 20,
    color: '#ff8700',
  },
  rideCard: {
    padding: 20,
    margin: 10,
    marginTop: 0,
    alignSelf: 'stretch',
    shadowRadius: 5
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "center",
  }
});

// const rides = [
//   {
//     origin: 'Crown',
//     destination: 'RCC',
//     maxSeats: 5,
//     departTime: '12:30',
//   },
//   {
//     origin: 'McHenry',
//     destination: 'SNE',
//     maxSeats: 5,
//     departTime: '12:50',
//   },
//   {
//     origin: 'UCSC',
//     destination: 'Downtown',
//     maxSeats: 5,
//     departTime: '6:40',
//   },
// ];
