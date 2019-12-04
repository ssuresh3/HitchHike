import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import { TextInput, Button } from 'react-native-paper';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import LocationAutocompleteInput from '../components/LocationAutocompleteInput';

import DateTimePicker from 'react-native-modal-datetime-picker';

import { myRides } from '../pages/Styles';

export default class App extends Component {
  constructor(props) {
    console.disableYellowBox = true,
    super(props);

    this.state = {
      showInvalid: false,
      start: null,
      end: null,
      price: NaN,
      seats: NaN,
      date: null,
      loading: false,
      showDatePicker: false,
      datePickerMode: 'date',
    };

  }

  //post new ride to db
  post = async () => {
    this.setState({ loading: true });

    //check if all fields are filled
    if (
      this.state.start == null ||
      this.state.end == null ||
      isNaN(this.state.price) ||
      isNaN(this.state.seats) ||
      this.state.date == null
    ) {
      //if field not filled show invalid fields
      this.setState({ showInvalid: true, loading: false });
      return;
    }

    var username = '';
    var user = null;
    //get logged in username from async storage
    try {
      user = await AsyncStorage.getItem('user');
      if (user == null) {
        throw 'user is null';
      }

      username = JSON.parse(user).data.username;

      if (username == null) {
        throw 'username is null';
      }
    } catch (error) {
      // Error retrieving data
      console.log('Error getting username: ' + error);
      this.setState({ showInvalid: false, loading: false });
      return;
    }

    //stringify ride post body
    var body = JSON.stringify({
      username: username,
      origin: {
        x: this.state.start.lat,
        y: this.state.start.lng,
        desc: this.state.start.description,
        name: this.state.start.name
      },
      destination: {
        x: this.state.end.lat,
        y: this.state.end.lng,
        desc: this.state.end.description,
        name: this.state.end.name
      },
      seats: this.state.seats,
      departure: this.state.date.valueOf(),
    });
    console.log(body);

    //make post request
    fetch(
      'http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/rides/postRide',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: body,
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success) {
          this.setState({ loading: false });
          this.props.navigation.navigate('HomeRoute');
          user = JSON.parse(user);
          user.data.postedRides.push(responseJson.data.Ride);
          AsyncStorage.setItem('user', JSON.stringify(user));
        } else {
          this.setState({ loading: false });
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <KeyboardAwareScrollView
          contentContainerStyle={myRides.container}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps={"always"}

          //still not entirely functional on android
          enableOnAndroid={true}>

          <LocationAutocompleteInput
            style={{ zIndex: 8, margin: 10 }}
            label={'Pickup'}
            mode={'outlined'}
            error={this.state.showInvalid && this.state.start == null}
            onEnter={location => {
              this.setState({ start: location });
            }}
          />
          <LocationAutocompleteInput
            style={{ zIndex: 6, margin: 10 }}
            label={'Dropoff'}
            mode={'outlined'}
            error={this.state.showInvalid && this.state.end == null}
            onEnter={location => {
              this.setState({ end: location });
            }}
          />
          <TextInput
            style={myRides.inputBox}
            dense={true}
            theme={theme}
            mode={'outlined'}
            error={this.state.showInvalid && isNaN(this.state.price)}
            label={'Price'}
            value={isNaN(this.state.price) ? '$' : '$' + this.state.price}
            keyboardType={'numeric'}
            onChangeText={price =>
              this.setState({ price: parseInt(price.substring(1)) })
            }
          />
          <TextInput
            style={myRides.inputBox}
            dense={true}
            theme={theme}
            mode={'outlined'}
            error={this.state.showInvalid && isNaN(this.state.seats)}
            value={isNaN(this.state.seats) ? '' : '' + this.state.seats}
            label={'Seats Available'}
            keyboardType={'numeric'}
            onChangeText={seats => {
              this.setState({ seats: parseInt(seats) });
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ showDatePicker: true, datePickerMode: 'date' })
              }}>
              <TextInput
                style={{ marginHorizontal: 10, width: 120 }}
                label={'Date'}
                theme={theme}
                dense={true}
                editable={false}
                pointerEvents={"none"}
                value={
                  this.state.date != null ? this.state.date.toLocaleDateString('en-US') : ''
                }
                error={this.state.showInvalid && this.state.date == null}
                mode={'outlined'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.setState({ showDatePicker: true, datePickerMode: 'time' })
              }>
              <TextInput
                style={{ marginHorizontal: 10, width: 120 }}
                label={'Time'}
                theme={theme}
                dense={true}
                editable={false}
                pointerEvents={"none"}
                value={(this.state.date != null) ? this.state.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : ''}
                error={this.state.showInvalid && this.state.date == null}
                mode={'outlined'}
              />
            </TouchableOpacity>
          </View>

          <Button
            mode="contained"
            onPress={this.post}
            style={myRides.inputBox}
            loading={this.state.loading}
            theme={theme}>
            Post
          </Button>

          <DateTimePicker
            isVisible={this.state.showDatePicker}
            mode={this.state.datePickerMode}

            //start with selected date if available
            date={this.state.date != null ? this.state.date : new Date()}

            //date must be in the future
            minimumDate={new Date()}
            is24Hour={false}
            onConfirm={date => {
              console.log(date);
              this.setState({
                date: date,
                showDatePicker: false,
              });
            }}
            onCancel={() => {
              this.setState({
                showDatePicker: false,
              });
            }}
          />
        </KeyboardAwareScrollView>
      </React.Fragment>
    );
  }
}

const theme = { colors: { primary: '#ff8700' } };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   inputBox: {
//     width: '80%',
//     margin: 10,
//     zIndex: 1,
//   },
// });
