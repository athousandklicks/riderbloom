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
  } from 'react-native';

  import AsyncStorage from '@react-native-community/async-storage';
  import axios from 'axios';

import { connect } from 'react-redux';
import { loginUser} from '../store/actions';
import { bindActionCreators } from 'redux';

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
       }
     }


     getDetails = async () => {
      try {
        const userId = await AsyncStorage.getItem('user_id');
        if(userId != null){

        }
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

           console.log('PHONE: '+ phone);
           console.log('USER ID: '+ user_id);

           this.storeUserDetails(firstname, phone, email);
           this.storeUserId(user_id);
           this.setIsLoggedIn();
           
           this.props.navigation.navigate('Splash');
        } else {
            console.log(response.status);
            
        }
    })
    .catch(error => console.error('Error', error));
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

          <Text style= {styles.forgotPassword}>Forgot Password?</Text>
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
