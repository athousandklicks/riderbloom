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
    Dimensions,
    Image,
  TouchableOpacity,
  } from 'react-native';

  import AsyncStorage from '@react-native-community/async-storage';


  //Import all the screens
import Screen1 from './src/components/Screen1';
import Screen2 from './src/components/Screen2';
import Screen3 from './src/components/Screen3';
 
//Import Custom Sidebar
import CustomSidebarMenu from './CustomSidebarMenu';
 
global.currentScreenIndex = 0;


  import Home from './src/components/Home';
  import Artist from './src/components/Artist';
  import RiderLogin from './src/components/RiderLogin';
  import SignUp from './src/components/SignUp';
  import Authentication from './src/components/Authentication';
  import IsVerified from './src/components/IsVerified';
  import PostTrip from './src/components/PostTrip';
 import TripDetails from './src/components/TripDetails';
  import UploadIdVerification from './src/components/UploadIdVerification';
  import UploadSelfieVerification from './src/components/UploadSelfieVerification';
  import UserVerificationComplete from './src/components/UserVerificationComplete';
  import Profile from './src/components/profile';
  import Riderdetails from './src/components/Riderdetails';
  import RideHistory from './src/components/RideHistory';
  import Landing from './src/components/Landing';
  import Splash from './src/components/Splash';

  import EditName from './src/components/EditName';
  import EditEmail from './src/components/EditEmail';
  import EditPassword from './src/components/EditPassword';
  import EditPhone from './src/components/EditPhone';


  import TripDetails2 from './src/components/TripDetails2';

  import TripAccepted from './src/components/TripAccepted';


  

//Navigation Drawer Structure for all screen
class NavigationDrawerStructure extends Component {
  //Top Navigation Header with Donute Button
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('./drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
 
//Stack Navigator for the First Option of Navigation Drawer
const ProfileStackNavigator = createStackNavigator({
  //All the screen from the First Option will be indexed here
  First: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      title: 'Profile',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});
 
//Stack Navigator for the Second Option of Navigation Drawer
const RideHistory_StackNavigator = createStackNavigator({
  //All the screen from the Second Option will be indexed here
  Second: {
    screen: RideHistory,
    navigationOptions: ({ navigation }) => ({
      title: 'Ride History',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
 
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});
 
//Stack Navigator for the Third Option of Navigation Drawer
const Screen3_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  Third: {
    screen: Screen3,
    navigationOptions: ({ navigation }) => ({
      title: 'Demo Screen 3',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});
 

const AuthStack = createStackNavigator({ 
  RiderLogin: RiderLogin 
});

const AppStack = createStackNavigator({ 
   
  Splash:Splash,
  PostTrip:PostTrip,
  TripDetails2: TripDetails2,
  Landing: Landing,
  TripAccepted: TripAccepted,
  Home: Home, 
  Artist: Artist,
  SignUp: SignUp,
  Authentication: Authentication,
  IsVerified: IsVerified,
  TripDetails: TripDetails,
  UploadSelfieVerification: UploadSelfieVerification,
  UserVerificationComplete: UserVerificationComplete,
  Riderdetails: Riderdetails,
  UploadIdVerification: UploadIdVerification,
});


const ProfileStack = createStackNavigator({ 
  EditName:EditName,
  EditEmail: EditEmail,
  EditPassword: EditPassword,
  EditPhone: EditPhone, 
});


// const DrawerStack = createDrawerNavigator({
//   AppStack: AppStack,
//   Profile: Profile,
//   RideHistory: RideHistory,
//   Home: Home,
// });

//Drawer Navigator Which will provide the structure of our App
const DrawerNavigatorExample = createDrawerNavigator(
  {
    AppStack: AppStack,
    ProfileStack:ProfileStack,
    //Drawer Optons and indexing
    NavScreenProfile: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        drawerLabel: 'Profile',
      },
    },
    NavScreenRideHistory: {
      screen: RideHistory_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Ride Hostory',
      },
    },
    NavScreen3: {
      screen: Screen3_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Demo Screen 3',
      },
    },
  },
  {
    //For the Custom sidebar menu we have to provide our CustomSidebarMenu
    contentComponent: CustomSidebarMenu,
    //Sidebar width
    drawerWidth: Dimensions.get('window').width - 130,
  }
);


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
    App: DrawerNavigatorExample,
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

