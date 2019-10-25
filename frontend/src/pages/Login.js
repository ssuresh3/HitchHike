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
      {/* <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
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
      </View> */}
      <View style={styles.container}>
                <TextInput style={styles.inputBox} //creating email text input
                    onChangeText={(email) => this.setState({ email })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Username"
                    placeholderTextColor="#ff8700"
                    selectionColor="#fff"
                    keyboardType="Username"
                    onSubmitEditing={() => this.password.focus()} />
                <TextInput style={styles.inputBox} //creating password text input
                    onChangeText={(password) => this.setState({ password })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="#ff8700"
                    ref={(input) => this.password = input}
                />
                <TouchableOpacity style={styles.button}>
                    {
                        //depending on what the user presses, the button will either render login or signup
                    }
                    <Text style={styles.buttonText} onPress={this.saveData} color = "orange"> Login {this.props.type} </Text>
                </TouchableOpacity>
            </View>   
      <View style={{alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
        {/* <Button
          title="Login!"
          color="#ff8700"
          //onPress={() => Alert.alert('Simple Button pressed')}
        /> */}
        <TouchableOpacity style={styles.button1}>
                    {
                        //depending on what the user presses, the button will either render login or signup
                    }
                    <Text style={styles.buttonText1} onPress={this.saveData}> Sign Up!{this.props.type} </Text>
                </TouchableOpacity>
        {/* <Button
          title="Sign Up Yo!"
          color=""
          //onPress={() => Alert.alert('Simple Button pressed')}
        /> */}
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

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'white',
//     },
//     signupTextCont: {
//       flexGrow: 1,
//       justifyContent: 'center',
//       alignItems: 'flex-end',
//       paddingVertical: 16,
//       flexDirection: 'row',
//     },
//     signupText: {
//       color: '#12799f', 
//       fontSize:16,
//     },
//     signupButton: {
//         color: '#12799f',
//         fontSize:16,
//         fontWeight: '500',
//     }
// });
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', //centers flex objects
        alignItems: 'center'
    },

    inputBox: {
        width: 300,
        backgroundColor: '#fffdd0',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },

    button: {
        width: 300,
        backgroundColor: '#ff8700',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    button1: {
        width: 300,
        backgroundColor: '#fffdd0',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    buttonText1: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ff8700',
        textAlign: 'center'
    }
});
