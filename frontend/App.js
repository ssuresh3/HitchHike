/*
  This is the main js file that keeps track of routing between pages.
  Edit this file to add a new page you want to route to.
  Make sure to import the location of the file you want to route to.
    eg: import Login from './src/pages/Login';
  Add routing path to the AppStack
*/

import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Verify from './src/pages/Verify';
import Home from './src/pages/Home';
import Ride from './src/components/Ride';
import AddRide from './src/pages/AddRide';
import MyRides from './src/pages/MyRides';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppStack = createStackNavigator(
  {
    SignupRoute: Signup,
    VerifyRoute: Verify,
    HomeRoute: Home,
    RideRoute: Ride,
    AddRideRoute: AddRide,
    MyRidesRoute: MyRides
  }
)

const AuthStack = createStackNavigator(
  {
    LoginRoute: Login
  }
)

export default createAppContainer(createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack

  }
));

// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   View,
//   Text
// } from 'react-native';

// import StarRating from './src/components/StarRating';

// export default class Ratings extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       user: 'rider' //setState of user to be either rider of driver
//     };
//   }


//   render() {
//     return (
//       <React.Fragment>
//         <View style={styles.formContainer}>
//           <Text style={styles.container}>Rate your {this.state.user}!</Text>
//           <StarRating />
//         </View>
//       </React.Fragment>
//     );
//   }
// }

// //styling
// //adding CSS
// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     justifyContent: 'center',
//     textAlign: 'center',
//     backgroundColor: 'white',
//     color: 'black',
//     padding: 10,
//     fontSize: 30,
//   },

//   signupTextCont: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     paddingVertical: 16,
//     flexDirection: 'row',
//   },

//   signupText: {
//     color: '#12799f',
//     fontSize: 16,
//   },

//   signupButton: {
//     color: '#12799f',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   formContainer: {
//     justifyContent: 'center', //centers flex objects
//     alignItems: 'center',
//   },

//   inputBox: {
//     width: 200,
//     height: 30,
//     backgroundColor: '#eeeeee',
//     borderRadius: 25,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     color: '#002f6c',
//     marginVertical: 10,
//   },

//   button: {
//     width: 300,
//     backgroundColor: '#ff8700',
//     borderRadius: 25,
//     marginVertical: 10,
//     paddingVertical: 12,
//   },

//   buttonText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#ffffff',
//     textAlign: 'center',
//   },
// });

// import React, { Component } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// import { TextInput } from 'react-native-paper';

// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// import LocationAutocompleteInput from './src/components/LocationAutocompleteInput';

// export default class AddRide extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       start: '',
//       end: '',
//       price: '',
//       data: '',
//       time: '',
//       seats: '',
//     };
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <KeyboardAwareScrollView
//           contentContainerStyle={styles.container}
//           resetScrollToCoords={{ x: 0, y: 0 }}
//           scrollEnabled={false}
//           keyboardShouldPersistTaps={true}>
//           <LocationAutocompleteInput
//             style={{ zIndex: 8, margin: 10 }}
//             label={'Pickup'}
//             onEnter={location => {
//               this.setState({ start: location });
//             }}
//           />
//           <LocationAutocompleteInput
//             style={{ zIndex: 6, margin: 10 }}
//             label={'Dropoff'}
//             onEnter={location => {
//               this.setState({ end: location });
//             }}
//           />
//           <TextInput
//             style={styles.inputBox} //creating password text input
//             underlineColorAndroid="rgba(0,0,0,0)"
//             placeholder="Price"
//             placeholderTextColor="#ff8700"
//             dense={true}
//             onChangeText={price => this.setState({ price })}
//           />
//           <TextInput
//             style={styles.inputBox} //creating password text input
//             underlineColorAndroid="rgba(0,0,0,0)"
//             placeholder="Date"
//             placeholderTextColor="#ff8700"
//             dense={true}
//             onChangeText={date => this.setState({ date })}
//           />
//           <TextInput
//             style={styles.inputBox} //creating password text input
//             underlineColorAndroid="rgba(0,0,0,0)"
//             placeholder="Time"
//             placeholderTextColor="#ff8700"
//             dense={true}
//             onChangeText={time => this.setState({ time })}
//           />
//           <TextInput
//             style={styles.inputBox} //creating password text input
//             underlineColorAndroid="rgba(0,0,0,0)"
//             placeholder="Seats Available"
//             placeholderTextColor="#ff8700"
//             dense={true}
//             onChangeText={seats => this.setState({ seats })}
//           />
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => {
//               console.log(this.state);

//               fetch(
//                 'http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/rides/postRide',
//                 {
//                   method: 'POST',
//                   headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                   },
//                   body: JSON.stringify({
//                     username: '$$aman69420$$',
//                     origin: {x:this.state.start.lat,y:this.state.start.lon},
//                     destination: {x:this.state.end.lat,y:this.state.end.lon},
//                     seats: this.state.seats,
//                     departure: this.state.time,
//                   }),
//                 }
//               ).catch(error => {
//                 console.log(error);
//               });
//               console.log(this.state);
//               // this.props.navigation.navigate('HomeRoute');
//             }}>
//             <Text style={styles.buttonText}>Post Ride!</Text>
//           </TouchableOpacity>
//         </KeyboardAwareScrollView>
//       </React.Fragment>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   inputBox: {
//     width: '80%',
//     backgroundColor: '#eeeeee',
//     color: '#002f6c',
//     textAlign: 'center',
//     margin: 10,
//   },

//   button: {
//     width: 300,
//     backgroundColor: '#ff8700',
//     borderRadius: 25,
//     marginVertical: 10,
//     paddingVertical: 12,
//   },

//   buttonText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#ffffff',
//     textAlign: 'center',
//   },
// });
