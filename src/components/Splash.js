/* eslint-disable prettier/prettier */
import React, {Component}  from 'react';
import { 
    View, 
    Text, 
    BackHandler,
    Alert,
    Modal,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {  StackActions, NavigationActions } from 'react-navigation';
import NetInfo from '@react-native-community/netinfo';
import Spinner from 'react-native-loading-spinner-overlay';
//import RNRestart from 'react-native-restart';


let backHandlerClickCount = 0;
let clickedPosition = 0;


const resetAction = StackActions.reset({
  index:0,
  actions:[
    NavigationActions.navigate({})
  ]
})

export default class Splash extends Component { 


  constructor(){
    super();
    this.state={
      connection_Status : "",
      isLoading: false,
      userId:null,
      phone:''
    }
  }
  

  ShowHideActivityIndicator = () =>{
    if(this.state.isLoading == true)
    {
      this.setState({isLoading: false})
    }
    else
    {
      this.setState({isLoading: true})
    }
  }

  

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


  verifyIfSignupIsComplete = async (id, phone) => {
    try {
      const _otp = await AsyncStorage.getItem('otpVerified');
      const _idCard = await AsyncStorage.getItem('idCardVerified');
      const _selfie = await AsyncStorage.getItem('selfieVerified');

      if(id !== null){ //Means user record exists

      if(!_otp && !_idCard && !_selfie){
        ToastAndroid.show
        ('Registration Incomplete! Pls, request a new OTP to continue', ToastAndroid.SHORT);
        this.props.navigation.navigate('Authentication' , {phone_no: phone});

      }else if(_otp  && !_idCard && !_selfie){
        ToastAndroid.show
        ('Registration Incomplete! Pls, upload ID card to continue', ToastAndroid.SHORT);
        this.props.navigation.navigate('UploadIdVerification', {userId: id});

      }else if(_otp && _idCard && !_selfie){
        ToastAndroid.show
        ('Registration Incomplete! Pls, upload a Selfie to continue', ToastAndroid.SHORT);
        this.props.navigation.navigate('UploadSelfieVerification', {userId: id});

      }else{
        ToastAndroid.show
        ('Login Details Incorrect! You can try again, Register or Recover your password', ToastAndroid.SHORT);
      } 

    }   //end id check

    } catch (e) {
    }
  }



  async bootStrap(){
    try {
      const userId = await AsyncStorage.getItem('user_id');
      const _phone = await AsyncStorage.getItem('phone_number');
      const userToken = await AsyncStorage.getItem('isLoggedIn');

      this.setState({
        userId:userId,
        phone:_phone
      })

      console.log('USER ID FROM ASYNC: ', userId);
      console.log('USER PHONE FROM ASYNC: ', _phone);
      console.log('USER userToken FROM ASYNC: ', userToken);


      if (userToken){
      if (userId !==null){

        console.log('USER ID NOT NULL: ', userId);

            return fetch(`http://104.248.254.71/app/public/api/get-active-trip?user_id=${userId}`)
            // return fetch(`http://104.248.254.71/app/public/api/get-active-trip?user_id=1`)
          .then ((res) => res.json())
          .then(response => {
              if (response.status === true){


                    if(response.request_details.status === 1){
                      console.log('RESPONSE: ' + response.request_details.status);
                    this.props.navigation.navigate('PendingTrip', {tripId: response.request_details.id});
                    }else if(response.request_details.status>1 && response.trip_details.status === 3){
                      console.log('RESPONSE: ' + response.request_details.status);
                    this.props.navigation.navigate('Rating', {tripId: response.trip_details.id});
                    }
                    else if(response.request_details.status === 2){
                    console.log('ACCEPTED TRIP: ' + response.request_details.status);
                    this.props.navigation.navigate('WelcomeActivePage', {user_Id: userId});
                    }else{
                      this.props.navigation.navigate('WelcomePage');
                    }
              }else{
                console.log(JSON.stringify(response));
                this.props.navigation.navigate('WelcomePage');
              }
          }).catch((error) => {
            console.log(error);
          })
      }
    }else{
      this.verifyIfSignupIsComplete(this.state.userId, this.state.phone);
    }
    }catch (e) {
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
              Bloom Ride
            </Text>
          </View>
      )
   
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#232a46'
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
}

