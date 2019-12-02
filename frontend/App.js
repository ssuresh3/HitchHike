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
      screen: Home,

      navigationOptions: {
        header: null
      }
    },
    AvailableRidesRoute: {
      screen: Ride,

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