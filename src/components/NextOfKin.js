/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Alert,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from '@react-native-community/checkbox';

import { NavigationActions } from 'react-navigation';

// const resetAction = NavigationActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({
//       routeName: "TripDetails",
//       params: { tripId}
//     })
//   ]
// });
export default class NextOfKin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            relationship: '',
            phone:'',
            email:'',
            user_Id: null,
            user_login_id: '',
            isLoading: false
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

    getUserId = async () => {
        try {
          const userId = await AsyncStorage.getItem('user_id');
          console.log('USER ID FROM ASYNC: ', userId);
          this.setState({ 
            user_login_id: userId, 
          });
        } catch (e) {
          this.props.navigation.navigate('Auth');
        }
      }

      componentDidMount () {
        const { navigation } = this.props;
           const userId = navigation.getParam('UserId', 'NO-ID');
           this.setState({ 
            user_login_id: userId, 
          });
           console.log('TRIP ID: '+ this.state.user_login_id);
       // this.getUserId();
      }
    

    SubmitNok = () => {
      let data={}
        data.user_id = this.state.user_login_id,
        data.name = this.state.name,
        data.phone = this.state.phone,
        data.email = this.state.email,
        data.relationship = this.state.relationship,


        this.ShowHideActivityIndicator();
        //data.trip_date=this.state.Time,
        console.log(data)
    
      //var url = 'https://example.com/profile';
      var url = 'http://104.248.254.71/app/public/api/create-trip-request';
    
      fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
      }).then(res => res.json())
      .then(response => {
        console.log(response.message);
        console.log(response.trip_details.id)
        this.ShowHideActivityIndicator();
         this.props.navigation.navigate('TripDetails', {tripId: response.trip_details.id});

         ToastAndroid.show
          ('Next of Kin Successfully Created ', ToastAndroid.SHORT);
      })
      // .catch(error => console.error('Error', error));
      .catch(error => ToastAndroid.show
        ('Trip not Successfully Created ', ToastAndroid.SHORT));
      }


      static navigationOptions = {
        title: 'Add Next of Kin',
      };

    render() {
        return (
            <View style={styles.MainContainer}>
       
            <View style={styles.Body}>
                        <Text style={styles.LabelText}>Full Name</Text>
                        <TextInput style = {styles.inputBox}
                            placeholder="Name"
                            placeholderTextColor="#313233" 
                            onChangeText={name => this.setState({name})}
                                value = {this.state.name}
                        />

                        <Text style={styles.LabelText}>Contact Number</Text>
                        <TextInput style = {styles.inputBox}
                            placeholder="e.g 08011111111"
                            placeholderTextColor="#313233"  
                            keyboardType="numeric"
                            onChangeText={phone => this.setState({phone})}
                                value = {this.state.phone}
                        />       

                        <Text style={styles.LabelText}>Email Address</Text>
                        <TextInput style = {styles.inputBox}
                            placeholder="e.g example@example.com"
                            placeholderTextColor="#313233"  
                            onChangeText={email => this.setState({email})}
                                value = {this.state.email}
                        /> 

                        <Text style={styles.LabelText}>Relationship</Text>
                        <TextInput style = {styles.inputBox}
                            placeholder="e.g Brother"
                            placeholderTextColor="#313233"  
                            onChangeText={relationship => this.setState({relationship})}
                                value = {this.state.relationship}
                        /> 

 
                    <TouchableOpacity onPress={() => this.SubmitNok()} style ={styles.button}>
                        <View style={styles.TripButtonWrapper}>
                            <View style={styles.TripRequestButton}>
                                <Text style={styles.TripRequestButtonText}>Submit</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                {  
                  this.state.isLoading ?  
                  <ActivityIndicator style={styles.ActivityIndicatorStyle} /> 
                  : null
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
      },

      LabelText:{
        marginTop:20,
        fontWeight:'bold',
      },

      TripDateTimeWrapper:{
        flexDirection: 'row',
         justifyContent: 'space-between',
    },

    TripTime: {
        flex: 1,
        paddingLeft: 4,
        borderRadius: 6,
      },

    TripDate: {
        flex: 1,
        paddingRight: 4,
        borderRadius: 6,
      },

      TripButtonWrapper:{
        flexDirection: 'row',
         justifyContent: 'space-between',
    },

    
    CheckBoxWrapper:{
        flexDirection: 'row',
        marginTop:20
    },

    CheckBoxText: {
        paddingTop:3,
        paddingLeft:3,
        color: '#4c4d4e',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
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
        fontSize: 16,
      },

     TripRequestButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
      },

      ActivityIndicatorStyle:{
        paddingTop:20
      },
});
