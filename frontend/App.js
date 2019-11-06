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
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppStack = createStackNavigator(
  {
    SignupRoute: Signup,
    VerifyRoute: Verify,
    HomeRoute: Home,
    RideRoute: Ride
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