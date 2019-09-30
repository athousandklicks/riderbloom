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

 
//Import Custom Sidebar
import CustomSidebarMenu from './CustomSidebarMenu';
 
global.currentScreenIndex = 0;


  import RiderLogin from './src/components/RiderLogin';
  import SignUp from './src/components/SignUp';
  import Authentication from './src/components/Authentication';
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


  import TripAccepted from './src/components/TripAccepted';
  import DriverDetails from './src/components/DriverDetails';


  import PendingTrip from './src/components/PendingTrip';
  import WelcomePage from './src/components/WelcomePage';
  import WelcomeActivePage from './src/components/WelcomeActivePage';
  import Settings from './src/components/Settings';
  import LoadingSpinner from './src/components/LoadingSpinner';
  import NextOfKin from './src/components/NextOfKin';
  import Rating from './src/components/Rating';
  import ForgotPassword from './src/components/ForgotPassword';
  
import { Icon } from 'react-native-vector-icons/Ionicons';
  

  

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
        backgroundColor: '#ffffff',
      },
      headerTintColor: '#000000',
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
        backgroundColor: '#ffffff',
      },
      headerTintColor: '#000000',
    }),
  },
});
 
//Stack Navigator for the Third Option of Navigation Drawer
const Settings_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  Third: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      title: 'Settings',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fffff',
      },
      headerTintColor: '#000000',
    }),
  },
});


// const Welcome_StackNavigator = createStackNavigator({
//   //All the screen from the Third Option will be indexed here
//   Fourth: {
//     screen: WelcomePage,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Settings',
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: '#fffff',
//       },
//       headerTintColor: '#000000',
//     }),
//   },
// });




const AuthStack = createStackNavigator({ 
  RiderLogin: RiderLogin,
  ForgotPassword:ForgotPassword

});

// const WelcomePageNavigator = createStackNavigator(
  
//   {
//     WelcomePage:WelcomePage,
//   },

//   {
//   defaultNavigationOptions:({navigation}) => {
//     return({
//       headerStyle:{
//         backgroundColor: '#000000',
//       },

//       headerTitle: 'Home',
//       headerTintColor: '#ffffff',
//       headerTitleStyle:{
//         fontWeight: 'bold',
//         textAlign: 'center',
//         flex:1
//       },

//       headerLeft:(
//         <Icon
//         style = {{
//           paddingLeft:10, 
//           color:'#ffffff'}}

//         onPress = {()=>navigation.DrawerNavigatorExample()}
//         name = "md-menu"
//         size = {30}
//         />
//     ),

//     headerRight:(
//       <View/>
//     ),
    
//     })
//   }
// }
// )

const AppStack = createStackNavigator({ 
  Splash:Splash,
  Rating: Rating,
  
  SignUp: SignUp,
  WelcomePage:WelcomePage,
  WelcomeActivePage:WelcomeActivePage,
  LoadingSpinner:LoadingSpinner,
  PendingTrip:PendingTrip,
  Authentication: Authentication,
  EditName:EditName,
  EditEmail: EditEmail,
  EditPhone: EditPhone,
  EditPassword: EditPassword, 
  DriverDetails:DriverDetails,
  PostTrip:PostTrip,
  TripAccepted: TripAccepted,
  TripDetails: TripDetails,
  UserVerificationComplete: UserVerificationComplete,
  UploadSelfieVerification: UploadSelfieVerification,
  UploadIdVerification: UploadIdVerification,
  Riderdetails: Riderdetails,
  NextOfKin:NextOfKin,
},
{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#dfe2ee',
    },
    headerTintColor: '#000000',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
}
);

//Drawer Navigator Which will provide the structure of our App
const DrawerNavigatorExample = createDrawerNavigator(
  {
    AppStack: AppStack,
    
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
    SettingsScreen: {
      screen: Settings_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Settings',
      },
    },
  },
  {
    //For the Custom sidebar menu we have to provide our CustomSidebarMenu
    contentComponent: CustomSidebarMenu,
    //Sidebar width
    drawerWidth: Dimensions.get('window').width - 60,
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

