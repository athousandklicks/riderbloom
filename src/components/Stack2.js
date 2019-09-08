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

export default class Stack2 extends Component {
    
  
    render() {
      return (
        <Button
          onPress={() => this.props.navigation.navigate('MyNotificationsScreen')}
          title="This is Stack 2"
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