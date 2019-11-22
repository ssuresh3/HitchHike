import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
  Image
} from 'react-native';
import {myRides} from '../../src/components';
import { Card } from 'react-native-paper';
//creating the Form class
class MyRides extends Component {
  //default constructor with email and password
  constructor(props) {
    super(props);

    //dynamic state
    this.state = {
      numAvailable: this.props.numAvailable,
      toShow: '',
    };
  }

  render() {
    return (
      <React.Fragment>
        <View>
          <Text style={myRides.title}>My Rides</Text>
        </View>
        <View style={myRides.container}>
          <Text style={myRides.displayText1}>{this.props.driverFirstName}</Text>
          <Text style={myRides.displayText}>
            Number of spots: {this.state.numAvailable}
          </Text>
          <Text style={myRides.displayText}>From: {this.props.origin}</Text>
          <Text style={myRides.displayText}>To: {this.props.destination}</Text>
          <Text style={myRides.displayText}>
            Departs at: {this.props.departsAt}
          </Text>
          <Text style={myRides.displayText}>
            Driver Phone Number: {this.props.driverPhone}
          </Text>          
          <View>
            <TouchableOpacity style={myRides.button} onPress={this.makeARequest}>
              <Text style={myRides.buttonText}>Opt Out!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </React.Fragment>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rides: dummyRides,
    };
  }
  render() {
    return (
      <React.Fragment>
        <View>
          <Text style={myRides.title}>My Rides</Text>
        </View>
        <View>
          <Text style={myRides.buttonText}>Choose a ride!</Text>
          {this.state.rides.map((ride, key) => {
            console.log(ride);
            return (
              // <Card style={myRides.rideCard}>
              //   <View style={myRides.cardRow}>
              //   <MyRides
              //     key={key}
              //     driverFirstName="Aman"
              //     numAvailable={ride.maxSeats}
              //     origin={ride.origin.x + ', ' + ride.origin.y}
              //     destination={ride.destination.x + ', ' + ride.origin.y}
              //     departsAt={ride.departTime}
              //     driverPhone = {ride.driverPhone}
              //   />
              // </View>
              // </Card>
            <Card style={myRides.rideCard}>
              <View style={myRides.cardRow}>
                <Text>{ride.origin.desc}</Text>
                <Image style={{width: 30, height: 20,marginLeft:30,marginRight:30,marginBottom:10}} source={require('assets/arrow_right.png')}/>
                <Text>{ride.destination.desc}</Text>
              </View>
              <View style={myRides.cardRow}>
                <Text>Departs at {ride.departTime}</Text>
              </View>
              <View style={myRides.cardRow}>
                <Text>Driver's Phone Number:{ride.DriverPhone}</Text>
              </View>
            </Card>
            );
          })}
        </View>
      </React.Fragment>
    );
    // return null
  }
}

// const myRides = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     color: 'black',
//     padding: 10,
//     fontSize: 30,
//     borderColor: 'black',
//     borderWidth: 2,
//   },
//   title: {
//     fontSize: 30,
//     textAlign: 'center',
//     padding: 20,
//     marginTop:20,
//     color: '#ff8700',
//   },
//   displayText: {
//     // Setting up Hint Align center.
//     textAlign: 'center',
//     height: 25,
//     backgroundColor: '#FFFFFF',
//     fontSize: 20,
//   },
//   displayText1: {
//     // Setting up Hint Align center.
//     textAlign: 'center',
//     height: 35,
//     fontWeight: 'bold',
//     backgroundColor: '#FFFFFF',
//     //textDecorationLine: 'underline',
//     fontSize: 27,
//   },

//    rideCard: {
//     padding: 20,
//     margin: 10,
//     marginTop:0,
//     alignSelf: 'stretch',
//     shadowRadius:5
//   },
//     cardRow: {
//     flexDirection:"row",
//     justifyContent:"center",
//   },
//   button: {
//     // width: 100, backgroundColor: '#ff8700', borderRadius: 25, marginVertical: 10,
//     // paddingVertical: 12, justifyContent: 'center', alignItems: 'center'
//     // textAlign: 'center',
//     height: 35,
//     borderWidth: 2,
//     borderColor: '#ff8700',
//     borderRadius: 20,
//     backgroundColor: '#ff8700',
//   },
//   buttonText: {
//     fontSize: 25,
//     fontWeight: '500',
//     color: '#FFFFFF',
//     textAlign: 'center',
//   },
// });

var dummyRides = [
  {
    origin: {
      x: 0.4,
      y: 0.5,
    },
    destination: {
      x: 0.7,
      y: 0.8,
    },
    maxSeats: 4,
    departTime: '11:11',
  },
  {
    origin: {
      x: 0.5,
      y: 0.6,
    },
    destination: {
      x: 0.3,
      y: 0.5,
    },
    maxSeats: 4,
    departTime: '11:23',
  },
];