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

const PHONE_NUMBER = 'phone_number';

export default class EditEmail extends Component {

  constructor(props) {
    super(props);
    //this.getPhone();
    this.state = {
              phone: null,
              user_id: null,
          };
  }



  componentDidMount () {
    const { navigation } = this.props;
    const userId = navigation.getParam('UserId', 'NO-ID');
    this.state.user_id = userId;
    console.log('TRIP ID: '+ userId);
    console.log('TRIP ID: '+ this.state.user_id);
  }


  removeValue = async () => {
    try {
      await AsyncStorage.removeItem('phone_number');
      console.log('User phone_number Removed successfull');
    } catch(e) {
      // remove error
    }
    console.log('Done.')
  }


  async updateUserPhone(phone_number) {
    try {
        await AsyncStorage.setItem(PHONE_NUMBER, phone_number);
        console.log('User phone stored successfull');
    } catch (error) {
        console.log('Something went wrong');
    }
  }
 
  async updatePhone (){
    let data = {};
      data.value = this.state.phone,
      data.type = 'phone',
      data.user_id = this.state.user_id,
      console.log(data);

    var url = 'http://104.248.254.71/app/public/api/update-profile';

    fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json',
    }
    }).then(res => res.json())
    .then(response => {
        if (response.status === true){

          console.log(response.user_details.phone);

          let new_phone = response.user_details.phone;

          this.removeValue();
          this.updateUserPhone(new_phone);
         // this.goBack();

         this.props.navigation.navigate('Profile');
         console.log('Updated phone: '+ new_phone);

        } else {
            console.log('Error');
    
        }
    })
    .catch(error => console.error('Error', error));
  }

   
      render() {
        return (
      <View style={styles.container}>
    
          <View style={styles.top}>
        
                 <Text style={styles.secondHeaderText}>Update Email</Text>
          </View>
    
          <View style= {styles.center}>
          <View style={styles.container}>
            <TextInput style = {styles.inputBox}
              placeholder="Enter Phone Number"
              placeholderTextColor="#313233"
              keyboardType="numeric"
                onChangeText={phone => this.setState({phone})}
                value = {this.state.phone}
              />

          <TouchableOpacity 
                onPress={() => this.updatePhone()} 
                style ={styles.button}>
               <Text style= {styles.buttonText}>Update Phone</Text>
             </TouchableOpacity>
 
          </View>
    
          <View style= {styles.bottom}>
               <Image source={require('../img/log.png')}  style={styles.backgroundImage} />
          </View>
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
