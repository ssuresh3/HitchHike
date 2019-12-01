import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  FlatList,
  Modal,
} from 'react-native';

import {myRides} from '../../src/components';

import { Card, Button, Snackbar } from 'react-native-paper';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rides: [],
      showModal: false,
      selectedRide: null,
      showSnack: false,
      snackMsg: '',
    };
    this.loadRides();

  }

  loadRides = async () => {
    try {
      fetch(
        'http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/rides/allRides',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson.body)
          if (responseJson.success) {
            this.setState({ rides: responseJson.body });
          }
        });
    } catch (error) {
      alert(error);
    }
  };

  rideInfo = item => {
    return (
      <View>
        <View style={[myRides.cardRow, { marginTop: 20 }]}>
          <Text numberOfLines={1}>
            {item.origin.name.length > 15
              ? item.origin.name.substring(0, 14) + '...'
              : item.origin.name}
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
            {item.destination.name.length > 15
              ? item.destination.name.substring(0, 14) + '...'
              : item.destination.name}
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
    );
  };

  joinRide = async () => {
    var username = '';

    try {
      const user = await AsyncStorage.getItem('user');
      if (user == null) {
        throw 'user is null';
      }

      username = JSON.parse(user).username;

      if (username == null) {
        throw 'username is null';
      }
    } catch (error) {
      // Error retrieving data
      console.error('Error getting username: ' + error);
      this.setState({
        showModal: false,
        showSnack: true,
        snackMsg: 'Error: ' + error,
      });
      return;
    }

    if (this.state.selectedRide.driverUserName == username) {
      this.setState({
        showModal: false,
        showSnack: true,
        snackMsg: 'Cannot book your own ride',
      });
    } else {
      //make post request
      var body = JSON.stringify({ username: username, ride: this.state.selectedRide});
      fetch(
        'http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/requestRide',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: body,
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.success) {
            this.setState({
              showModal: false,
              showSnack: true,
              snackMsg: 'Ride booked',
            });
            this.loadRides();
          } else {
            this.setState({
              showModal: false,
              showSnack: true,
              snackMsg: 'Error: ' + responseJson.reason,
            });
          }
        })
        .catch(error => {
          this.setState({
            showModal: false,
            showSnack: true,
            snackMsg: '' + error,
          });
          console.error(error);
        });
    }
  };

  render() {
    return (
      <React.Fragment style={myRides.container}>
        <View style={myRides.topBar}>
          <Text style={myRides.title}>Nearby Rides</Text>
        </View>

        <FlatList
          data={this.state.rides}
          style={myRides.rideList}
          renderItem={({ item }) => {
            return (
              <Card
                style={myRides.rideCard}
                onPress={() => {
                  this.setState({ showModal: true, selectedRide: item });
                }}>
                {this.rideInfo(item)}
              </Card>
            );
          }}
          keyExtractor={ride => ride.rideID}
        />

        <Modal
          visible={this.state.showModal}
          animationType={'slide'}
          transparent={false}
          onRequestClose={() => this.setState({ showModal: false })}>
          <View style={[myRides.container, { marginTop: 25 }]}>
            {this.state.selectedRide != null &&
              this.rideInfo(this.state.selectedRide)}
            <View style={myRides.cardRow}>
              <Button
                mode="outlined"
                style={[myRides.inputBox, { marginRight: 15 }]}
                onPress={() => this.setState({ showModal: false })}
                icon={'close'}
                theme={theme}>
                Close
              </Button>
              <Button
                mode="contained"
                onPress={() => this.joinRide()}
                icon={'check'}
                style={[myRides.inputBox, { marginLeft: 15 }]}
                theme={theme}>
                Join
              </Button>
            </View>
          </View>
        </Modal>

        <Snackbar
          visible={this.state.showSnack}
          theme={theme}
          action={{
            label: 'close',
            onPress: () => this.setState({ showSnack: false }),
          }}
          onDismiss={() => this.setState({ showSnack: false })}>
          {this.state.snackMsg}
        </Snackbar>
      </React.Fragment>
    );
  }
}

const theme = { colors: { primary: '#ff8700' } };

// const myRides = StyleSheet.create({
//   //These styles are new styles
//   topBar: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#ff8700',
//   },
//   rideList: {
//     height: '100%',
//   },

//   //These styles already exist in external style sheet
//   container: {
//     flex: 1,
//     height: '100%',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 30,
//     textAlign: 'center',
//     padding: 20,
//     marginTop: 20,
//     color: '#ff8700',
//   },
//   rideCard: {
//     margin: 5,
//     marginHorizontal: 10,
//     alignSelf: 'stretch',
//     elevation: 4,
//   },
//   cardRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
// });
