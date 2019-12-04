/*
    Verify.js is what the user sees upon entering valid signup credentials
    User needs to see the o
*/

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Button,
    Image
} from 'react-native';

import { myRides, theme } from './Styles';

export default class Verify extends Component {
    render() {
        return (
            <React.Fragment>

                <View style={myRides.container}>
                    <Image
                        //adding HitchHike logo
                        style={{
                            height: '35%',
                            width: '70%'
                        }}
                        source={require('../../assets/HitchHike.png')}
                        resizeMode="contain" />

                    <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 20, alignContent: "center" }}>
                        Verifying Email..
                    {"\n"}
                        Check your Email!
            {"\n"}
                        Once you're done,
                </Text>
                    <Button
                        onPress={() => this.props.navigation.navigate('LoginRoute')}
                        mode="contained"
                        style={myRides.inputBox}
                        //  loading={this.state.loading}
                        color='#ff8700'
                        title={"Sign In"}
                    >
                    </Button>
                </View>

            </React.Fragment>
        );
    }
}