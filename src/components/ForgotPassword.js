/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Platform, 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    Image, 
    ActivityIndicator, 
    TextInput} from 'react-native';
    import AsyncStorage from '@react-native-community/async-storage';


export default class ForgotPassword extends Component {

  constructor(props) {
    super(props);
    //this.getPhone();
    this.state = {
              entered_otp: null,
              server_otp: null,
              otp_error: null,
              user_id:'',
              isLoading: false,
          };
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

  getDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      console.log('Authentication.js User ID:' + userId);
      this.setState({ 
        user_Id: userId,
      });

    } catch (e) {
     // this.props.navigation.navigate('Auth');
    }
  }

  setIsOTPVerified = async () => {
    try {
        await AsyncStorage.setItem('otpVerified', '1' );
        console.log('OTP verified successfull');
    } catch (e) {
    }
  }


      componentDidMount () {
        this.getDetails();
        this.requestOtp();
      }

      requestOtp(){
        const { navigation } = this.props;
       const phoneNumber = navigation.getParam('phone_no', 'NO-PHONE NUMBER');
       this.ShowHideActivityIndicator();
       let url_phone_no = phoneNumber;
       

       console.log('phoneNumber: '+ phoneNumber);
        return fetch(`http://104.248.254.71/app/public/api/verify-phone?phone=${url_phone_no}`)
        .then ((res) => res.json())
        .then(response => {
            if(response.status === true){
                console.log('OTP RESPONSE:' + response.message);
                console.log('OTP RESPONSE:' + response.otp);
                this.setState({
                  server_otp: response.otp,
                });
                this.ShowHideActivityIndicator();
            }else{
                console.log(response.status);
                this.ShowHideActivityIndicator();
            }
        }).catch((error) => {
          console.log(error);
          this.ShowHideActivityIndicator();
        })
      }

      authenticateOtp (serverOtp, phoneOtp){
        console.log('Server OTP:' + serverOtp);
        console.log('phone OTP:' + phoneOtp);
        if(serverOtp == phoneOtp){
          this.setIsOTPVerified();
          this.props.navigation.navigate('UploadIdVerification', {userId: this.state.user_id});
        }else{
          this.updateOtpError();
        } 
      }

      updateOtpError = () => {
        this.setState({otp_error: 'OTP mismatch, request a new OTP'});
        this.setState({entered_otp: null});
     }
      
      static navigationOptions = { header: null, };
   
      render() {
        return (

          <View style={styles.MainContainer}>
                    <View style={styles.Body}>
                        <TextInput style = {styles.inputBox}
                            placeholder="Enter OTP"
                            placeholderTextColor="#313233"
                            keyboardType="numeric"
                              onChangeText={entered_otp => this.setState({entered_otp})}
                              value = {this.state.entered_otp}
                        />

                    <TouchableOpacity onPress={()=> this.requestOtp()}>
                      <Text style={styles.logInButton}>Request a new OTP</Text>
                    </TouchableOpacity>

                    <View style={styles.signUpText}>
                      <Text style={styles.signUp}>
                        {this.state.otp_error}</Text>
                    </View>

                            <TouchableOpacity onPress={() => this.authenticateOtp(this.state.server_otp, this.state.entered_otp)} style ={styles.button}>
                                <View style={styles.TripButtonWrapper}>
                                    <View style={styles.TripRequestButton}>
                                        <Text style={styles.TripRequestButtonText}>Save</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            </View>

                            <View style= {styles.bottom}>
                                <Image source={require('../img/log.png')}  style={styles.backgroundImage} />
                            </View>     
                            {
          // Here the ? Question Mark represent the ternary operator.   
        this.state.isLoading ?  <ActivityIndicator style={styles.ActivityIndicatorStyle} /> : null
      }                  
                    </View>

        );
      }
}


const styles = StyleSheet.create({
  MainContainer: {
  flex: 1,
  backgroundColor: '#dfe2ee',
  alignSelf: 'stretch'
  },
  
  Body: {
    marginLeft: 18,
    marginRight: 18,
    marginTop:40,
    flex: 3,
  },

  ActivityIndicatorStyle:{
    paddingTop:50
  },


  bottom: {
    flex: 1,
  },
  
  inputBox: {
  alignSelf: 'stretch',
  height: 55,
  borderRadius:8,
  fontSize: 16,
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: 20,
  paddingRight: 20,
  backgroundColor: '#ffffff',
  marginTop:10,
  marginBottom:20
  },
  
  LabelText:{
  marginTop:20,
  fontWeight:'bold',
  },
  TripButtonWrapper:{
  flexDirection: 'row',
   justifyContent: 'space-between',
  },
  
  
  TripRequestButton: {
  flex: 1,
  backgroundColor: '#222a46',
  padding: 8,
  borderRadius: 6,
  marginTop: 30,
  borderColor: '#bcc0c6',
  borderStyle: 'solid',
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
  height: 55,
  
  },
  
  TripCancelButtonText: {
  color: '#4c4d4e',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 20,
  },
  
  TripRequestButtonText: {
  color: '#ffffff',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 20,
  },
  signUpText: {
    marginBottom: 5,
    marginTop:5
    
  },
  signUp:{
    fontSize: 15,
    color: 'black',
      fontWeight: '700'
  },
  logInButton: {
    fontWeight: '900',
    fontSize: 16,
    color: 'blue'
  },
  
  });
