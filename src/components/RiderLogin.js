/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  Alert
  } from 'react-native';

  import AsyncStorage from '@react-native-community/async-storage';
  import axios from 'axios';


const FIRST_NAME = 'first_name';
const PHONE_NUMBER = 'phone_number';
const USER_ID = 'user_id';
const EMAIL = 'email';

//const user_info = {phone_number:'123456', user_password: '123' };

export default class RiderLogin extends Component{

  // componentDidMount(){
  //   this.props.loginUser();
  //   console.log(this.props);
  // }

  constructor(props){
    super(props)
     this.state = {
     phone: '',
     password: '',
     loading: true,
     isLoading: false,
      otp: '',
      idCard: '',
      selfie:'',
      user_id:null,
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


    componentDidMount = async () => {
        try {
          const _otp = await AsyncStorage.getItem('otpVerified');
          const _idCard = await AsyncStorage.getItem('idCardVerified');
          const _selfie = await AsyncStorage.getItem('selfieVerified');

          this.setState({ 
            otp: _otp,
            idCard: _idCard,
            selfie: _selfie,
            server_otp:''
          });
  
        } catch (e) {
          this.props.navigation.navigate('Auth');
        }
      }
     

    //  componentDidMount(){
    //   this.setState({
    //     loading: true
    //   });
    //  }

     getDetails = async () => {
      try {
        const userId = await AsyncStorage.getItem('user_id');
        this.setState({ 
          user_id: userId,
        });
      } catch (e) {
        this.props.navigation.navigate('Auth');
      }
    }

     async storeUserDetails(first_name, phone_number, email) {
      try {
        await AsyncStorage.setItem(FIRST_NAME, first_name);
        await AsyncStorage.setItem(PHONE_NUMBER, phone_number);
        await AsyncStorage.setItem(EMAIL, email);
        
          console.log('Login Phone number stored successfull');
      } catch (error) {
          console.log('Something went wrong with phone No');
      }
    }

    async storeUserId(user_id) {
      try {
          await AsyncStorage.setItem(USER_ID, JSON.stringify(user_id));
          console.log('Login ID stored successfull: ' + user_id);
      } catch (error) {
          console.log('Something went wrong with User ID');
      }
    }

    verifyIfSignupIsComplete(id, phone) {

        if(id !== null){ //Means user record exists

        if(!this.state.otp && !this.state.idCard && !this.state.selfie){
          ToastAndroid.show
          ('Registration Incomplete! Pls, request a new OTP to continue', ToastAndroid.SHORT);
          this.props.navigation.navigate('Authentication' , {phone_no: phone});

        }else if(this.state.otp  && !this.state.idCard && !this.state.selfie){
          ToastAndroid.show
          ('Registration Incomplete! Pls, upload ID card to continue', ToastAndroid.SHORT);
          this.props.navigation.navigate('UploadIdVerification', {userId: id});

        }else if(this.state.otp && this.state.idCard && !this.state.selfie){
          ToastAndroid.show
          ('Registration Incomplete! Pls, upload a Selfie to continue', ToastAndroid.SHORT);
          this.props.navigation.navigate('UploadSelfieVerification', {userId: id});
        }else{
          ToastAndroid.show
          ('Login Details Incorrect! You can try again, Register or Recover your password', ToastAndroid.SHORT);
        } 
      }   //end id check
      }



    // setIsLoggedIn = async () => {
    //     try {
    //       if(this.state.otp && this.state.idCard && this.state.selfie){
    //         await AsyncStorage.setItem('isLoggedIn', '1' );
    //         console.log('setIsLoggedIn stored successfull');
    //       }else{
    //       //  this.verifyIfSignupIsComplete(this.state.user_id, this.state.phone);
    //       }
    //     } catch (e) {
    //     }
    //   }


    setIsLoggedIn = async () => {
      try {
 
          await AsyncStorage.setItem('isLoggedIn', '1' );
          console.log('setIsLoggedIn stored successfull');
        
      } catch (e) {
      }
    } 

    async login(){

    let data = {};
     data.username = this.state.phone,
     data.password = this.state.password,
     data.role = 1,
     console.log(data);

     this.ShowHideActivityIndicator();

    //var url = 'https://example.com/profile';
    var url = 'http://104.248.254.71/app/public/api/login';
    
    fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
     'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .then(response => {
        if(response.status == true){
            
           let phone = response.phone;
           let firstname = response.firstname;
           let email = response.email;
           let user_id = response.user_id;

           this.setState({ 
            user_id: user_id,
            phone: phone
          });

           console.log('PHONE: '+ phone);
           console.log('USER ID: '+ user_id);

           this.storeUserDetails(firstname, phone, email);
           this.storeUserId(user_id);
           this.setIsLoggedIn();

           this.ShowHideActivityIndicator();
           
           this.props.navigation.navigate('Splash');
        } else {
         // this.verifyIfSignupIsComplete(this.state.user_id, this .state.phone);
          console.log(response.status); 
          this.ShowHideActivityIndicator();
        }
    })
    .catch(error => console.error('Error', error));
    this.ShowHideActivityIndicator();
    }

    forgotPasswordOtpAlert(){
      Alert.alert(
        'Exit',
        'Do You want to reset your password?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => this.requestOtp()},
        ],
        {cancelable: false},
      );
  
      }

      requestOtp(){
        let  phone = this.state.phone;
        this.props.navigation.navigate('ForgotPassword', {phone_no: phone})
      }



static navigationOptions = { header: null, };

  render() {
    return (
  <View style={styles.container}>

  

      <View style={styles.top}>
             <Text style={styles.headerText}>WELCOME BACK</Text>
             <Text style={styles.secondHeaderText}>Please log in to continue</Text>
      </View>

      <View style= {styles.center}>
      <View style={styles.container}>
        <TextInput style = {styles.inputBox}
          placeholder="Phone Number"
          placeholderTextColor="#313233"
          keyboardType="numeric"
            onChangeText={phone => this.setState({phone})}
            value = {this.state.phone}
            onSubmitEditing={()=> this.password.focus()}
          />

        <TextInput style = {styles.inputBox}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="#313233"
         onChangeText={password => this.setState({password})}
         value = {this.state.password}
         ref={(input) => this.password = input}
         />
    <TouchableOpacity onPress={()=> this.forgotPasswordOtpAlert()}>
          <Text style= {styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
      </View>

           <TouchableOpacity 
                onPress={() => this.login()} 
                style ={styles.button}>
               <Text style= {styles.buttonText}>Sign In</Text>
             </TouchableOpacity>

      <View style={styles.signUpText}>
              <Text style={styles.signUp}>Dont have an account? </Text>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignUp')}>
              <Text style={styles.logInButton}>Sign Up</Text>
              </TouchableOpacity>
      </View>
      </View>

      <View style= {styles.bottom}>
          {  
            this.state.isLoading ?  
            <ActivityIndicator style={styles.ActivityIndicatorStyle} /> 
            : null
          }
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

  ActivityIndicatorStyle:{
    paddingTop:10
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
    height: 55,
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

// function mapStateToProps(state){
//   return {
//     user_login: state.user_login,
//   }
// }

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({loginUser}, dispatch)
// }


// export default connect(mapStateToProps,mapDispatchToProps)(RiderLogin)
