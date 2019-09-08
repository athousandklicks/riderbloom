/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Platform, 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    Image, 
    ImageBackground, 
    TextInput} from 'react-native';
    import AsyncStorage from '@react-native-community/async-storage';


export default class Authentication extends Component {

  constructor(props) {
    super(props);
    //this.getPhone();
    this.state = {
              entered_otp: null,
              server_otp: null,
              otp_error: null,
          };
  }

      componentDidMount () {
        this.requestOtp();
      }

      requestOtp(){
        const { navigation } = this.props;
       const phoneNumber = navigation.getParam('phone_no', 'NO-PHONE NUMBER');
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
            }else{
                console.log(response.status);
            }
        }).catch((error) => {
          console.log(error);
        })
      }

      authenticateOtp (serverOtp, phoneOtp){
        console.log('Server OTP:' + serverOtp);
        console.log('phone OTP:' + phoneOtp);
        if(serverOtp == phoneOtp){
          this.props.navigation.navigate('IsVerified', {otp: serverOtp});
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
      <View style={styles.container}>
    
          <View style={styles.top}>
                 <Text style={styles.headerText}>OTP</Text>
                 <Text style={styles.secondHeaderText}>Please enter OTP in to continue</Text>
          </View>
    
          <View style= {styles.center}>
          <View style={styles.container}>
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
          </View>

          <View style={styles.signUpText}>
            <Text style={styles.signUp}>
              {this.state.otp_error}</Text>
          </View>

          <TouchableOpacity 
                onPress={() => this.authenticateOtp(this.state.server_otp, this.state.entered_otp)} 
                style ={styles.button}>
               <Text style= {styles.buttonText}>Sign In</Text>
             </TouchableOpacity>
 
          </View>
    
          <View style= {styles.bottom}>
               <Image source={require('../img/log.png')}  style={styles.backgroundImage} />
          </View>
      </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor:'white'
    },
    form : {
      flexGrow: 1,
     borderRadius: 15,
      backgroundColor:'white',
      margin: 0,
      paddingBottom: 40,
    },
    inputBox: {
      alignSelf: 'stretch',
      margin: 15,
      height: 40,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      fontSize: 18,
        width: 270,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 40
    },
    forgotPassword: {
      color: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 100,
      textAlign: 'right'
    },
    top: {
      height: '35%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 40
    },
    center: {
      height: '45%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottom: {
      height: '10%',
    },
    headerText:{
    fontSize: 20,
    color: '#12213a',
    marginVertical: 10,
    alignItems: 'center',
    fontWeight: '900',
    paddingTop: 80,
  },
    secondHeaderText: {
    fontSize: 15,
    color: '#2e2f30',
    marginVertical: 5,
    alignItems: 'center',
    paddingBottom: 60
     },
     button: {
      width: 270,
      borderRadius: 25,
      backgroundColor: '#12213a',
      marginVertical:20,
      marginBottom:30,
      paddingVertical: 15
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '800',
      color: 'white',
      textAlign: 'center'
    },
    signUpText: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30,
      flexDirection: 'row',
      paddingBottom: 20
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
