import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  AsyncStorage,
  FlatList,
  Modal,
} from 'react-native';

import {myRides} from './Styles';

import {
  Card,
  Button,
  Snackbar,
  Avatar,
  FAB,
  IconButton,
} from 'react-native-paper';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rides: [],
      showModal: false,
      selectedRide: null,
      showSnack: false,
      snackMsg: '',
      isRefreshing: true,
    };
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
          console.log(responseJson.body);
          var newRides = [];
          if (responseJson.success) {
            newRides = responseJson.body;
          }
          this.setState({ rides: newRides, isRefreshing: false });
        });
    } catch (error) {
      this.setState({ isRefreshing: false });
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
            source={require('../../assets/arrow_right.png')}
          />
          <Text numberOfLines={1}>
            {item.destination.name.length > 15
              ? item.destination.name.substring(0, 14) + '...'
              : item.destination.name}
          </Text>
        </View>

        <View style={[myRides.cardRow, { marginBottom: 20 }]}>
          <Text>
            {new Date(item.departTime).toDateString()} at{' '}
            {new Date(item.departTime).toLocaleTimeString('en-US', {
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

      username = JSON.parse(user).data.username;
      console.log(JSON.parse(user));
      if (username == null) {
        throw 'username is null';
      }
    } catch (error) {
      // Error retrieving data
      // console.error('Error getting username: ' + error);
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
      var body = JSON.stringify({
        username: username,
        ride: this.state.selectedRide,
      });
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
          console.log(error);
        });
    }
  };

  render() {
    if(this.state.isRefreshing){
      this.loadRides();
    }
    return (
      <React.Fragment>
        <View style={myRides.topBar}>
          <Text style={myRides.title}>Nearby Rides</Text>

          <IconButton
          //route to myRides
            icon="account"
            color={"#ff8700"}
            style={{position:"absolute",margin:20,top:20}}
            size={30}
            onPress={() => {
              this.props.navigation.navigate('MyRidesRoute');
            }}
          />
        </View>

        <FlatList
          data={this.state.rides}
          style={myRides.rideList}
          refreshing={this.state.isRefreshing}
          onRefresh={() => {this.setState({isRefreshing:true});}}
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
            <Card style={myRides.rideCard}>
              <View style={[myRides.cardRow]}>
                <Avatar.Text
                  label={
                    this.state.selectedRide != null
                      ? this.state.selectedRide.driverUserName
                          .substring(0, 2)
                          .toUpperCase()
                      : '--'
                  }
                  size={30}
                  theme={theme}
                  style={{ margin: 10 }}
                /> 
                <Text style={{ alignSelf: 'center' }}>
                  {this.state.selectedRide != null &&
                    this.state.selectedRide.driverUserName}
                </Text>
              </View>
            </Card>
            <View style={[myRides.cardRow, { marginTop: 20 }]}>
              <Button
                mode="outlined"
                style={{ marginRight: 15 }}
                onPress={() => this.setState({ showModal: false })}
                icon={'close'}
                theme={theme}>
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={() => this.joinRide()}
                icon={'check'}
                style={{ marginLeft: 15 }}
                theme={theme}>
                Join
              </Button>
            </View>
          </View>
        </Modal>

        <FAB
        //route to addRide
          style={{
            zIndex: 99,
            position: 'absolute',
            margin: 16,
            bottom: 0,
            right: 0,
          }}
          icon="plus"
          theme={theme}
          onPress={() => {
            this.props.navigation.navigate('PostRidesRoute');
          }}
        />

        <Snackbar
          visible={this.state.showSnack}
          theme={theme}
          style={{ zIndex: 100 }}
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

const theme = { colors: { primary: '#ff8700', accent: '#ff8700' } };

// const myRides = StyleSheet.create({
//   //These styles are new styles
//   topBar: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#ff8700',
//     zIndex: 5,
//     backgroundColor: '#FFFFFF'
//   },
//   rideList: {
//     height: '100%',
//     zIndex: 1,
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
