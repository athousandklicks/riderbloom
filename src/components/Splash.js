/* eslint-disable prettier/prettier */
import React, {Component}  from 'react';
import { 
    View, 
    Text, 
    BackHandler,
    Alert
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {  StackActions } from 'react-navigation';
import NetInfo from '@react-native-community/netinfo';
//import RNRestart from 'react-native-restart';


let backHandlerClickCount = 0;
let clickedPosition = 0;

export default class Splash extends Component { 


  constructor(){
 
    super();
 
    this.state={
 
      connection_Status : ""
 
    }
 
  }
  

  // handleBackButton = () => {
      
  //     backHandlerClickCount += 1;
  //     console.log('backHandlerClickCount' + backHandlerClickCount)

  //     if ((backHandlerClickCount === 4)) {

  //       alert(
  //         'Exit Application',
  //         'Do you want to quit application?', 
          
  //         [{
  //           text: 'Cancel',
  //           onPress: () => console.log('Cancel Pressed'),
  //           style: 'cancel'
  //         }, {
  //           text: 'OK',
  //           onPress: () => BackHandler.exitApp()
  //         }]
  //         , {
  //           cancelable: false
  //         }
  //       );
  //     }
  //     return true;
  //   }

  //  componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  // }

//   handleBackButton() {
//    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
//     return true;
// }


  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange

  );
 
  NetInfo.isConnected.fetch().done((isConnected) => {

    if(isConnected == true)
    {
      console.log('CONNECTION: ONLINE');
      this.bootStrap();
      this.setState({connection_Status : "Online"})
    }
    else
    {
      console.log('CONNECTION: OFFLINE');
      this.ShowAlertWithDelay();
      this.setState({connection_Status : "Offline"})
    }

  });

  //  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

  }

  
  componentWillUnmount() {
 
    NetInfo.isConnected.removeEventListener(
        'connectionChange',
        this._handleConnectivityChange
 
    );
 
  }
 
  _handleConnectivityChange = (isConnected) => {
 
    if(isConnected == true)
      {
        console.log('CONNECTION: ONLINE');
        this.bootStrap();
        this.setState({connection_Status : "Online"})
      }
      else
      {
        console.log('CONNECTION: OFFLINE');
        this.ShowAlertWithDelay();
        this.setState({connection_Status : "Offline"})
      }
  };

  async bootStrap(){
    try {
      const userId = await AsyncStorage.getItem('user_id');
      console.log('USER ID FROM ASYNC: ', userId);
      
      return fetch(`http://104.248.254.71/app/public/api/get-active-trip?user_id=${userId}`)
      // return fetch(`http://104.248.254.71/app/public/api/get-active-trip?user_id=1`)
     .then ((res) => res.json())
     .then(response => {
         if(response.status == true){

              if(response.request_details.status === 2){
                console.log('ACCEPTED TRIP: ' + response.request_details.status);
              this.props.navigation.navigate('WelcomeActivePage', {user_Id: userId});
              }else if(response.request_details.status === 1){
                console.log('RESPONSE: ' + response.trip_details.id);
              this.props.navigation.navigate('PendingTrip', {tripId: response.trip_details.id});
              
              }

         }else{
          this.props.navigation.navigate('WelcomePage');
         }
     }).catch((error) => {
      console.log(error);
     })

    } catch (e) {
      this.props.navigation.navigate('Auth');
    }
  }

  ShowAlertWithDelay=()=>{
    setTimeout(function(){
      Alert.alert("No internet connection detected, please try again!")
    }, 10000);
  }

//   restartApp(){
//     setTimeout(function(){

//     Alert.alert(
//       'No Network Connection',
//       'No internet connection detected, please try againby pressing OK',
//       [
//         {
//           text: 'Cancel',
//           onPress: () => console.log('Cancel Pressed'),
//           style: 'cancel',
//         },
//         {text: 'OK', onPress: () => RNRestart.Restart()},
//       ],
//       {cancelable: false},
//     );
//     }, 10000);

// }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Text style={styles.textStyles}>
          Bloom Riders
        </Text>
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  }
}

