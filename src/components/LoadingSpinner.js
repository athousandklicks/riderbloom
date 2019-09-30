/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
 
export default class LoadingSpinner extends Component {
  state = {
    //default loading false
    loading: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Text style={{ textAlign: 'center', fontSize: 20 }}>
          Bloom Away
        </Text>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});