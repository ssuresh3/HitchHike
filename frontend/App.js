/*
  This is the main js file that keeps track of routing between pages.
  Edit this file to add a new page you want to route to.
  Make sure to import the location of the file you want to route to.
    eg: import Login from './src/pages/Login';
  Add routing path to the AppStack
*/

/*
  Importing the necessary libraries for App.js
*/
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Verify from './src/pages/Verify';
import Home from './src/pages/Home';
import ViewRides from './src/pages/ViewRides';
import Temp from './src/pages/tempVIewRides'
import Ride from './src/pages/Ride';
import AddRide from './src/pages/AddRide';
import MyRides from './src/pages/MyRides';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

/*
  Creating the the first AppStack
  This stack keeps track of the buttons on the Home page
*/
const AppStack = createStackNavigator(
  {
    HomeRoute: {
      screen: ViewRides,

      navigationOptions: {
        header: null
      }
    },
    PostRidesRoute: {
      screen: AddRide,

      navigationOptions: {
        header: null
      }
    },
    MyRidesRoute: {
      screen: MyRides,

      navigationOptions: {
        header: null
      }
    },
  }
)

/*
  Creating the the second AppStack
  This stack has one page, Login
*/
const AuthStack = createStackNavigator({
  LoginRoute: {
    screen: Login,

    navigationOptions: {
      header: null
    }
  }
});

/*
  Creating the the third AppStack
  This stack has the Signup and and Verify pages
*/
const AuthStackTwo = createStackNavigator({
  SignupRoute: {
    screen: Signup,

    navigationOptions: {
      header: null
    }
  },
  VerifyRoute: {
    screen: Verify,

    navigationOptions: {
      header: null
    }
  }
});

/*
  This block renders the entire app
*/
export default createAppContainer(createSwitchNavigator(
  {
    Auth: AuthStack,
    Auth2: AuthStackTwo,
    App: AppStack
  },
));

// import React, { Component } from 'react';
// import {
//   Text,
//   View,
//   Image,
//   AsyncStorage,
//   FlatList,
//   Modal,
// } from 'react-native';

// import {myRides} from './src/pages/Styles'; //change when things work

// import {
//   Card,
//   Button,
//   Snackbar,
//   Avatar,
//   FAB,
//   IconButton,
// } from 'react-native-paper';

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       rides: [],
//       showModal: false,
//       selectedRide: null,
//       showSnack: false,
//       snackMsg: '',
//       isRefreshing: false,
//     };
//     this.loadRides();

//   }

//   loadRides = async () => {
//     this.setState({ isRefreshing: true });
//     try {
//       fetch(
//         'http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/rides/allRides',
//         {
//           method: 'GET',
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//         }
//       )
//         .then(response => response.json())
//         .then(responseJson => {
//           console.log(responseJson.body);
//           var newRides = [];
//           if (responseJson.success) {
//             newRides = responseJson.body;
//           }
//           this.setState({ rides: newRides, isRefreshing: false });
//         });
//     } catch (error) {
//       this.setState({ isRefreshing: false });
//       alert(error);
//     }
//   };

//   rideInfo = item => {
//     return (
//       <View>
//         <View style={[myRides.cardRow, { marginTop: 20 }]}>
//           <Text numberOfLines={1}>
//             {item.origin.name.length > 15
//               ? item.origin.name.substring(0, 14) + '...'
//               : item.origin.name}
//           </Text>
//           <Image
//             style={{
//               width: 30,
//               height: 20,
//               marginLeft: 30,
//               marginRight: 30,
//               marginBottom: 10,
//             }}
//             source={require('./assets/arrow_right.png')} //change this later
//           />
//           <Text numberOfLines={1}>
//             {item.destination.name.length > 15
//               ? item.destination.name.substring(0, 14) + '...'
//               : item.destination.name}
//           </Text>
//         </View>

//         <View style={[myRides.cardRow, { marginBottom: 20 }]}>
//           <Text>
//             {new Date(item.departTime).toDateString()} at{' '}
//             {new Date(item.departTime).toLocaleTimeString('en-US', {
//               hour: '2-digit',
//               minute: '2-digit',
//             })}
//           </Text>
//           <Text />
//         </View>
//       </View>
//     );
//   };

//   joinRide = async () => {
//     var username = '';

//     try {
//       const user = await AsyncStorage.getItem('user');
//       if (user == null) {
//         throw 'user is null';
//       }

//       username = JSON.parse(user).username;

//       if (username == null) {
//         throw 'username is null';
//       }
//     } catch (error) {
//       // Error retrieving data
//       console.error('Error getting username: ' + error);
//       this.setState({
//         showModal: false,
//         showSnack: true,
//         snackMsg: 'Error: ' + error,
//       });
//       return;
//     }

//     if (this.state.selectedRide.driverUserName == username) {
//       this.setState({
//         showModal: false,
//         showSnack: true,
//         snackMsg: 'Cannot book your own ride',
//       });
//     } else {
//       //make post request
//       var body = JSON.stringify({
//         username: username,
//         ride: this.state.selectedRide,
//       });
//       fetch(
//         'http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/requestRide',
//         {
//           method: 'POST',
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//           body: body,
//         }
//       )
//         .then(response => response.json())
//         .then(responseJson => {
//           if (responseJson.success) {
//             this.setState({
//               showModal: false,
//               showSnack: true,
//               snackMsg: 'Ride booked',
//             });
//             this.loadRides();
//           } else {
//             this.setState({
//               showModal: false,
//               showSnack: true,
//               snackMsg: 'Error: ' + responseJson.reason,
//             });
//           }
//         })
//         .catch(error => {
//           this.setState({
//             showModal: false,
//             showSnack: true,
//             snackMsg: '' + error,
//           });
//           console.error(error);
//         });
//     }
//   };

//   render() {
//     return (
//       <React.Fragment style={myRides.container}>
//         <View style={myRides.topBar}>
//           <Text style={myRides.title}>Nearby Rides</Text>

//           <IconButton
//             icon="account"
//             color={"#ff8700"}
//             style={{position:"absolute",margin:20,top:20}}
//             size={30}
//             onPress={() => {}}
//           />
//         </View>

//         <FlatList
//           data={this.state.rides}
//           style={myRides.rideList}
//           refreshing={this.state.isRefreshing}
//           onRefresh={() => {
//             this.loadRides();
//           }}
//           renderItem={({ item }) => {
//             return (
//               <Card
//                 style={myRides.rideCard}
//                 onPress={() => {
//                   this.setState({ showModal: true, selectedRide: item });
//                 }}>
//                 {this.rideInfo(item)}
//               </Card>
//             );
//           }}
//           keyExtractor={ride => ride.rideID}
//         />

//         <Modal
//           visible={this.state.showModal}
//           animationType={'slide'}
//           transparent={false}
//           onRequestClose={() => this.setState({ showModal: false })}>
//           <View style={[myRides.container, { marginTop: 25 }]}>
//             {this.state.selectedRide != null &&
//               this.rideInfo(this.state.selectedRide)}
//             <Card style={myRides.rideCard}>
//               <View style={[myRides.cardRow]}>
//                 <Avatar.Text
//                   label={
//                     this.state.selectedRide != null
//                       ? this.state.selectedRide.driverUserName
//                           .substring(0, 2)
//                           .toUpperCase()
//                       : 'KK'
//                   }
//                   size={30}
//                   theme={theme}
//                   style={{ margin: 10 }}
//                 />
//                 <Text style={{ alignSelf: 'center' }}>
//                   {this.state.selectedRide != null &&
//                     this.state.selectedRide.driverUserName}
//                 </Text>
//               </View>
//             </Card>
//             <View style={[myRides.cardRow, { marginTop: 20 }]}>
//               <Button
//                 mode="outlined"
//                 style={[myRides.inputBox, { marginRight: 15 }]}
//                 onPress={() => this.setState({ showModal: false })}
//                 icon={'close'}
//                 theme={theme}>
//                 Cancel
//               </Button>
//               <Button
//                 mode="contained"
//                 onPress={() => this.joinRide()}
//                 icon={'check'}
//                 style={[myRides.inputBox, { marginLeft: 15 }]}
//                 theme={theme}>
//                 Join
//               </Button>
//             </View>
//           </View>
//         </Modal>

//         <FAB
//           style={{
//             zIndex: 99,
//             position: 'absolute',
//             margin: 16,
//             bottom: 0,
//             right: 0,
//           }}
//           icon="plus"
//           theme={theme}
//           onPress={() => {}}
//         />

//         <Snackbar
//           visible={this.state.showSnack}
//           theme={theme}
//           style={{ zIndex: 100 }}
//           action={{
//             label: 'close',
//             onPress: () => this.setState({ showSnack: false }),
//           }}
//           onDismiss={() => this.setState({ showSnack: false })}>
//           {this.state.snackMsg}
//         </Snackbar>
//       </React.Fragment>
//     );
//   }


// }

// const theme = { colors: { primary: '#ff8700', accent: '#ff8700' } };