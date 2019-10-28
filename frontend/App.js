import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const AppContainer = createAppContainer(AppNavigator);
const AppNavigator = createStackNavigator(
  {
    LoginPage: Login,
    SignupPage: Signup,
  },
  {
    initialRouteName: 'Login',
  }
);

//export default createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
    <View>
      <Text>Fuck</Text>
      <AppContainer />
    </View>
    );
  }
}