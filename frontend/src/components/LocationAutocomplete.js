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
      focused: false,
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
      <View style={[styles.container, this.props.style]}>
        <TextInput
          style={{ width: '100%' }}
          label={this.props.label}
          value={this.state.text}
          dense={true}
          mode={this.props.mode}
          onChangeText={text => {
            if (text.length > 1) {
              this.getSuggestions(text.trim().replace(/ /g, '+'));
            }
            this.setState({ text: text, isAutofilled: false });
          }}
          ref={ref => {
            if (ref != null && ref.isFocused() && !this.state.focused) {
              ref.blur();
            }
          }}
          onFocus={() => {
            this.setState({ focused: true });
          }}
          onBlur={() => {
            var text = this.state.text;
            if (!this.state.isAutofilled) {
              text = '';
              this.props.onEnter(null);
            }
            this.setState({ text: text, suggestions: [], focused: false });
          }}
        />
        {this.state.suggestions.length > 0 && (
          <Card style={styles.autocomplete}>
            {this.state.suggestions.map(suggestion => {
              return (
                <TouchableRipple
                  onPress={() => {
                    this.setState({
                      text: suggestion.description,
                      focused: false,
                      isAutofilled: true,
                    });

                    var url =
                      'https://maps.googleapis.com/maps/api/place/details/json?place_id=' +
                      suggestion.place_id +
                      '&fields=geometry&key=AIzaSyCsd_xEVy2XRMjbGNb8_qICT9QIOq971Cg&sessiontoken=' +
                      this.state.session;

                    fetch(url)
                      .then(response => response.json())
                      .then(responseJson => {
                        this.props.onEnter(responseJson.result.geometry.location);
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
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    width: '100%',
    elevation: 3,
    position: 'absolute',
    top: 52,
    padding: 5,
  },
  suggestion: {
    padding: 5,
    paddingStart: 10,
  },
});
