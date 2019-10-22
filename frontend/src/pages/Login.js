//Your part Harshitha
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Button } from 'react-native';

//import {Actions} from 'react-native-router-flux';

//import Form from '../components/Form';

export default class Login extends Component {

    signup() {
        Actions.signup()
    }
          constructor(props) {
        super(props);
        this.state = {user: ''};
        this.state = {pass: ''};
      }
    render() {

        return(
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
    
                <View style={styles.container}>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
               {/* <Form type="Login"/> */}
                <View style={styles.signupTextCont}> 
                    <Text style={styles.signupText}>Dont have an account yet? </Text>
                    <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}>Sign up!</Text></TouchableOpacity>
                </View>
            </View>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    signupTextCont: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingVertical: 16,
      flexDirection: 'row',
    },
    signupText: {
      color: '#12799f', 
      fontSize:16,
    },
    signupButton: {
        color: '#12799f',
        fontSize:16,
        fontWeight: '500',
    }
});
