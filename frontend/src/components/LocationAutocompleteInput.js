import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { TextInput, Card, TouchableRipple } from 'react-native-paper';

export default class LocationAutocompleteInput extends React.Component {
  constructor(props) {
    super(props);

    var code = Math.random()
      .toString(10)
      .substring(2, 7);

    this.state = {
      text: '',
      isAutofilled: false,
      session: code,
      suggestions: [],
    };
  }

  getSuggestions(string) {
    var url =
      'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' +
      string +
      '&key=AIzaSyCsd_xEVy2XRMjbGNb8_qICT9QIOq971Cg&sessiontoken=' +
      this.state.session;

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ suggestions: responseJson.predictions });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={[styles.container1, this.props.style]}>
        <TextInput
          style={{ width: '100%' }}
          label={this.props.label}
          value={this.state.text}
          dense={true}
          theme={{colors:{primary:"#ff8700"}}}
          mode={this.props.mode}

          onChangeText={text => {
            if (text.length > 1) {
              this.getSuggestions(text.trim().replace(/ /g, '+'));
            }
            this.setState({ text: text, isAutofilled: false });
          }}

          onBlur={() => {
            var text = this.state.text;
            if (!this.state.isAutofilled) {
              text = '';
              this.props.onEnter(null);
            }
            this.setState({ text: text, suggestions: []});
          }}
        />
        {this.state.suggestions.length > 0 && (
          <Card style={myRides.autocomplete}>
            {this.state.suggestions.map(suggestion => {
              return (
                <TouchableRipple
                  onPress={() => {
                    this.setState({
                      text: suggestion.description,
                      suggestions:[],
                      isAutofilled: true,
                    });
                    this.props.onEnter(suggestion);

                    var url =
                      'https://maps.googleapis.com/maps/api/place/details/json?place_id=' +
                      suggestion.place_id +
                      '&fields=geometry&key=AIzaSyCsd_xEVy2XRMjbGNb8_qICT9QIOq971Cg&sessiontoken=' +
                      this.state.session;

                    fetch(url)
                      .then(response => response.json())
                      .then(responseJson => {
                        var loc = responseJson.result.geometry.location;
                        loc.description = suggestion.description;
                        this.props.onEnter(loc);
                      })
                      .catch(error => {
                        console.error(error);
                      });
                  }}
                  rippleColor="rgba(0, 0, 0, .32)">
                  <Text style={styles.suggestion}>
                    {suggestion.description}
                  </Text>
                </TouchableRipple>
              );
            })}
          </Card>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  autocomplete: {
    width: '100%',
    elevation: 3,
    position: 'absolute',
    top: 48,
    padding: 5,
  },
  suggestion: {
    padding: 5,
    paddingStart: 10,
  },
});
