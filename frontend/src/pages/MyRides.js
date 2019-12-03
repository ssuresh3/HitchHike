/*
Page to view rides posted and requested by users
*/

import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  FlatList,
  ScrollView,
  AsyncStorage
} from 'react-native';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import Divider from 'react-native-divider';
import {myRides} from './Styles'

/*Component wraps data for each ride into a card*/
class RideView extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props.item)
  }
  render() {
    return (
      <Card style={myRides.rideCard}>
        <Text
          style={{ textAlign: 'center', fontWeight: 'bold', color: '#ff8700' }}>
          {this.props.item.driverUserName}
        </Text>
        <Text style={{ textAlign: 'center' }}>
          {/*<Text style={{ fontWeight: 'bold' }}>From: </Text>*/}
          {this.props.item.origin.name + '   '}
          <Image
            source={require('../../assets/arrow_right.png')}
            style={{
              width: 30,
              height: 10,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 1,
            }}
          />
          {'   ' + this.props.item.destination.name}
        </Text>
        <Text style={{ textAlign: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>Time: </Text>
          {this.props.item.departTime}
        </Text>
      </Card>
    );
  }
}

/*
Client class for RideView component
Used to display requested and posted rides
*/
export default class App extends React.Component {
    constructor(props){
        super(props)

        this.state = {
          userLoaded: false,
            user: {
              postedRides: [],
              requestedRides: []
            }
        }
    }

    getUser = function(){
      
        AsyncStorage.getItem("user").then(data => {
            // console.log(data)
            data = JSON.parse(data)
            // console.log(data.data.requestedRides[0].Ride)
            this.setState(previousState => {
                return {
                    userLoaded: true,
                    user: data.data
                }
            })
        })
    }


  render() {
    if(!this.state.userLoaded) this.getUser();
    // console.log(this.state.user)
    return (
      <ScrollView style={{ flexDirection: 'column', marginTop: '10%' }}>
        <Divider borderColor="#ff8700" color="#ff8700" orientation="center">
        {'    '}
          Your Posted Rides
        </Divider>
        {this.state.user != {} ? this.state.user.postedRides.map((ride, key) => {
          return(
            <RideView key = {key} item = {ride.Ride}/>
          )
        }) : <View></View>}
        <Divider borderColor="#ff8700" color="#ff8700" orientation="center">
          {'  '}Your Booked Rides{'  '}
        </Divider>
        {this.state.user != {} ? this.state.user.requestedRides.map((ride, key) => {
          console.log(ride + "ho")
          return(
            <RideView key = {key} item = {ride.Ride}/>
          )
        }) : <View></View>}
      </ScrollView>
    );
  }
}