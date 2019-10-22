import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
//import {Button} from "./src/components/Button";

export default class loginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {user: ''};
    this.state = {pass: ''};
  }
  
  render() {
    // let pic = {
    //   uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'};
    return (
    <React.Fragment>
      {/* <Image source = {pic} style = {{width: 193, height:110}}/> */}
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{color: 'orange'}}>Username</Text>

        <TextInput
          style={{ height: 40, borderColor: 'orange', borderWidth: 1 }}
          placeholder="Type username!"
          onChangeText={(user) => this.setState({user})}
          value={this.state.user}
        />
        <Text style={{padding: 10, fontSize: 42}}>
       </Text>
      </View>

      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{color: 'orange'}}>Password</Text>
        <TextInput
          style={{ height: 40, borderColor: 'orange', borderWidth: 1 }}
          secureTextEntry={true}
          placeholder="Type password!"
          onChangeText={(pass) => this.setState({pass})}
          value={this.state.pass}
        />
        <Text style={{padding: 10, fontSize: 42}}>
       </Text>
      </View>   
      <View style={{alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          title="Login!"
          color="#ff8700"
          //onPress={() => Alert.alert('Simple Button pressed')}
        />

        <Button
          title="Cancel!"
          color="black"
          //onPress={() => Alert.alert('Simple Button pressed')}
        />
      </View>           
    </React.Fragment>
    );
  }
}
