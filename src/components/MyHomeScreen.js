/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button
} from 'react-native';

export default class MyHomeScreen extends Component {
    static navigationOptions = {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('./compass.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      ),
    };

    
  
    render() {
      return (
        <Button
          onPress={() => this.props.navigation.navigate('MyNotificationsScreen')}
          title="Go to notifications"
        />
      );
    }
  }


  const styles = StyleSheet.create({

    container: {
      flex: 1,
    },

    icon: {
      width: 24,
      height: 24,
    },
  });