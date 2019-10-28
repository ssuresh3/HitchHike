import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppStack = createStackNavigator(
  {
    SignupRoute: Signup
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