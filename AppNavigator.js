/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
//import AppNavigator from './AppNavigator';

import {
  createSwitchNavigator, 
  createAppContainer,
  } from 'react-navigation';

import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

  import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
  } from 'react-native';

  import AsyncStorage from '@react-native-community/async-storage';



  import Home from './src/components/Home';
  import Artist from './src/components/Artist';
  import RiderLogin from './src/components/RiderLogin';
  import SignUp from './src/components/SignUp';
  import Authentication from './src/components/Authentication';
  import IsVerified from './src/components/IsVerified';
  import PostTrip from './src/components/PostTrip';
  import InterDetails from './src/components/InterDetails';

import MyHomeScreen from './src/components/MyHomeScreen';
import MyNotificationsScreen from './src/components/MyNotificationsScreen';


const AuthStack = createStackNavigator({ 
  RiderLogin: RiderLogin 
});

const AppStack = createStackNavigator({ 
  PostTrip: PostTrip,
  Home: Home, 
  Artist: Artist,
  SignUp: SignUp,
  Authentication: Authentication,
  IsVerified: IsVerified,
  InterDetails: InterDetails,
});

const DrawerStack = createDrawerNavigator({
  AppStack: AppStack,
  MyHomeScreen: MyHomeScreen,
  MyNotificationsScreen: MyNotificationsScreen,
});


  class AuthLoadingScreen extends Component {
    constructor(props) {
      super(props);
      this._bootstrapApp();
    }
  
    // Fetch the token from storage then navigate to our appropriate place

    _bootstrapApp = async () => {
      try {
        const userToken = await AsyncStorage.getItem('isLoggedIn');
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
      } catch (e) {
        this.props.navigation.navigate('Auth');
      }
    }
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }


  export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: DrawerStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
  })

