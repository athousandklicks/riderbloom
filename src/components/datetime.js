import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';

import DateTimePicker from 'react-native-modal-datetime-picker';


export default class App extends React.Component {
  
  state = {
    isDateTimePickerVisible: false,
    rawTime: '',
    timeWithZeros: ''
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let rawTime = `${hours}:${minutes}:${seconds}`;
    let timeWithZeros = `${this.makeTwoDigits(hours)}:${this.makeTwoDigits(minutes)}:${this.makeTwoDigits(seconds)}`;
    this.setState({rawTime, timeWithZeros})
    
    this._hideDateTimePicker();
  };

  makeTwoDigits (time) {
  const timeString = `${time}`;
    if (timeString.length === 2) return time
    return `0${time}`
  }


  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text>Show TimePicker</Text>
        </TouchableOpacity>
        <Text>Raw Time: {this.state.rawTime}</Text>
        <Text>Time with zeros: {this.state.timeWithZeros}</Text>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode={'time'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
