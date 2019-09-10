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
      } from 'react-native';

    import AsyncStorage from '@react-native-community/async-storage';

      
      const FIRST_NAME = 'first_name';
      const PHONE_NUMBER = 'phone_number';
      const USER_ID = 'user_id';
      const EMAIL = 'email';
      

    export default class SignUp extends Component {
        // Gettin Values
      constructor(props){
      super(props)

      this.state = {
      name: '',
      phone:'',
      password: '',
      errors: [],
      showProgress: false,
        }
      }


      async storeUserDetails(first_name, phone_number, email) {
        try {
            await AsyncStorage.setItem(FIRST_NAME, first_name);
            await AsyncStorage.setItem(PHONE_NUMBER, phone_number);
            await AsyncStorage.setItem(EMAIL, email);
            console.log('User details stored successfull');
        } catch (error) {
            console.log('Something went wrong');
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

      async register (){
      let data = {};
        data.firstname = this.state.name,
        data.lastname = this.state.name,
        data.phone = this.state.phone,
        data.password = this.state.password,
        data.role = 1,
        data.email = '',
        console.log(data);

      var url = 'http://104.248.254.71/app/public/api/register';

      fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json',
      }
      }).then(res => res.json())
      .then(response => {
        console.log(response.message);
          if (response.status === true){

            let firstname = response.firstname;
            let phone = response.phone;
            let user_id = response.user_id;
            let email = response.email;

           this.storeUserDetails(firstname, phone, email);
           this.storeUserId(user_id);
           this.setIsLoggedIn();

           this.props.navigation.navigate('Authentication', {phone_no: phone});
           console.log('User Phone: '+ phone);
 
          } else {
              console.log(response.status);
              console.log(response.errors);
              this.props.navigation.navigate('Auth');
          }
      })
      .catch(error => console.error('Error', error));
    }

    static navigationOptions = { header: null, };

      render() {
        return (
          <View style={styles.container}>
            <View style={styles.top}>
              <Text style={styles.headerText}>WELCOME</Text>
              <Text style={styles.secondHeaderText}>Please create an account to continue</Text>
            </View>

          <View style= {styles.center}>
            <View style = {styles.form}>
            <TextInput style = {styles.inputBox}
            placeholder="Full Name"
            placeholderTextColor="#313233"
            onChangeText={name => this.setState({name})}
            value = {this.state.name}
            onSubmitEditing={()=> this.phone.focus()}
              />

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
                </View>

                <TouchableOpacity 
                onPress={() => this.register()} 
                style ={styles.button}>
                  <Text style= {styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

          <View style={styles.signUpText}>
            <Text style={styles.signUp}>Already have an account? </Text>

            <TouchableOpacity onPress={()=> this.props.navigation.navigate('RiderLogin')}>
            <Text style={styles.logInButton}>Log In</Text>
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
        backgroundColor:'#e8e9ed'
      },
      form: {
        flexGrow: 1,
      borderRadius: 15,
        backgroundColor:'white',
        margin: 20,
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
      top: {
        height: '35%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#12213a',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
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
        color: 'white',
        marginVertical: 10,
        alignItems: 'center',
        fontWeight: '500',
      },
      secondHeaderText: {
        fontSize: 15,
        color: 'white',
        marginVertical: 5,
        alignItems: 'center',
        paddingBottom: 60
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
      button: {
        width: 270,
        borderRadius: 25,
        backgroundColor: '#12213a',
        marginVertical: 14,
        paddingVertical: 15
      },
      buttonText: {
        fontSize: 16,
        fontWeight: '800',
        color: 'white',
        textAlign: 'center'
      },
    });
