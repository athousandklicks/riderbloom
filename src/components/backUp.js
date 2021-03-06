/* eslint-disable prettier/prettier */
import {
    TRIP_DETAILS
  } from '../types';
  
  import axios from 'axios';
  
  const URL = 'https://jsonplaceholder.typicode.com';
  
  
  const BLOOM_URL = 'http://104.248.254.71/app/public/api';
  
  export function isLoading(bool:Boolean){
    return{
      type:'LOGIN_ATTEMPT',
      isLoading:bool
    }
  }
    
    export function registerSuccess(userData:Object){
      return {
        type: LOGIN_SUCCESS,
        userData,
      }
    }
    
    export function registerFailed(error:Object){
      return {
        type: LOGIN_FAILED,
        error,
      }
    }
  
  
  //   export function register(data = {}){
  
  //     var url = 'http://104.248.254.71/app/public/api/register';
      
  //     return dispatch => {
  //       dispatch(isLoading());
  //       fetch(url, {
  //         method: 'POST', // or 'PUT'
  //         body: JSON.stringify(data), // data can be `string` or {object}!
  //         headers:{
  //           'Content-Type': 'application/json',
  //         }
  //         }).then(res => res.json())
  //         .then(response => {
  //           console.log(response.message);
  //             if (response.status === true){
  //                 dispatch(registerSuccess(response))
  //             } else {
  //                 console.log(response.status);
  //                 console.log(response.errors);
  //             }
  //         })
  //         .catch(error => console.error('Error', error));
  //       }
  //     }
    
  
  
  
    
    
    export function register(data:Object){
      console.log('REGISTER' + data);
      return dispatch => {
        dispatch(isLoading());
        return fetch(`${BLOOM_URL}/register`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(data)
        })
        .then((response) => {
          if (response.status === true){
            dispatch(isLoading(false))
            response.json().then((responseJSON) => {
              console.log("responseJSON", responseJSON);
              dispatch(registerSuccess(responseJSON))
            })
          }
          else {
            response.json().then((responseJSON) => {
              console.log("responseJSON",responseJSON);
              dispatch(isLoading(false))
              dispatch(registerFailed(responseJSON.message))
            })
          }
        })
        .catch((error) => {
          console.log("error",error);
          dispatch(isLoading(false))
          dispatch(registerFailed(error))
        })
      }
    }
    
  
  
  
  
    export function artistsListAll(){
      const request = axios.get(`${URL}/users`)
                      .then( response => response.data );
  
      return {
          type: GET_ARTISTS_ALL,
          payload: request
      }
  }
  
  export function artistDetail(id){
      const request = axios.get(`${URL}/users?id=${id}`)
                      .then(response => response.data )
      
      return {
          type: GET_ARTIST_DETAIL,
          payload: request
      }
  }
  
  export function clearArtistDetail(){
      return {
          type: CLEAR_ARTIST_DETAIL,
          payload:null
      }
  }


cancel-trip-request
param: trip_id



  /get-active-trip
  Param: User_id

  Response: 
  status
  TRIP_Details
  Vehicle
  Driver
  request_details







  /* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground, 
  Image,
  TextInput,
  TouchableOpacity, 
  Picker, Button, CheckBox
} from 'react-native';

import { connect } from 'react-redux';
import { getActiveTrip} from '../store/actions';
import { bindActionCreators } from 'redux';


import DateTimePicker from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-community/async-storage';
class PostTrip extends Component {
  constructor(props) {
      super(props)
      this.state = {
        date:"15-05-2018",
        Pickup: '',
        Destination: '',
        Calendar: '',
        time: "",
        isDateTimePickerVisible: false,
        user_login_id: '',
    }
  }

  getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      console.log('USER ID FROM ASYNC: ', userId);
      userId ? 
    this.props.getActiveTrip(this.state.user_login_id)
      :
      this.props.navigation.navigate('Auth');
    } catch (e) {
      this.props.navigation.navigate('Auth');
    }
  }


  componentDidMount () {
    this.getUserId();
  }

  _showDateTimePicker = () => 
  this.setState({ 
    isDateTimePickerVisible: true 
  });

  _hideDateTimePicker = () => 
  this.setState({ 
    isDateTimePickerVisible: false 
  });

  _handleDatePicked = (date) => {
    this.setState({ 
      date: date 
    });

    console.log('A date has been picked: ', date);
    console.log('A State date has been picked: ', this.state.date);
      this._hideDateTimePicker();
  };


    _handlePress = () => {
  let data={}
    data.user_id=3,
    data.from=this.state.Pickup,
    data.to=this.state.Destination,
    data.trip_date=this.state.date,
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
     this.props.navigation.navigate('TripDetails', {tripId: response.trip_details.id});
      if(response.status == true){
        // this.props.navigation.navigate('InterDetails');
      }else{
        console.log(response.status);
          console.log(response);
      }
  })
  .catch(error => console.error('Error', error));
  }

  static navigationOptions = { header: null, };


  render(){
    return (

      <View style={styles.container}>
      
        {
          this.props.active_trips.getActiveTrip.status ? 
          {}
           console.log('AAAAAAAAAA: '+this.props.active_trips.getActiveTrip.status
            + this.props.active_trips.getActiveTrip.message)
      //     <View style={styles.container}>
      //   <View style={styles.top}>
      //     <Text style={styles.headerText}> {this.props.active_trips.getActiveTrip.pick_up} </Text>
      //     <Text style={styles.secondHeaderText}> {this.props.active_trips.getActiveTrip.trip_date} </Text>
      //     <View>
      //     <Image
      //         source={require('../img/Group.png')}
      //         resizeMode = 'cover'
      //        style={styles.map}
      //       />
      //       </View>

      //   </View>

      // <View style= {styles.center}>

      //   </View>
      //   <View style= {styles.bottom}>
      //   <Text style={styles.secondHeaderText}> {this.props.active_trips.getActiveTrip.trip_date} </Text>
          
      //      <Text style= {styles.destinationText}> Your Trip Has Been Accepted </Text>

      //      <View style={styles.btn}>
      //    <TouchableOpacity style={styles.button}>
      //      <Text style={styles.buttonText}> Call </Text>
      //    </TouchableOpacity>

      //    <TouchableOpacity style={styles.redbutton}>
      //      <Text style={styles.buttonText}> Cancel </Text>
      //    </TouchableOpacity>
      //        </View>

      //   </View>
      // </View>

          : 
          
          <ImageBackground source={require('../img/map.jpg')} style={styles.container}>
          <View style={styles.menuItems}>
          <Image
          source={require('../img/menu.png')}
          style={styles.menu}
         />
         <Image
          source={require('../img/bell.png')}
          style={styles.bell}
         />
      </View>
     <View style= {styles.center}>

       </View>

       <View style= {styles.bottom}>
           <View style= {styles.rectangle}>

           <View>
           <Text style={styles.doneText}> POST A TRIP </Text>

           <View style= {styles.bluesection}>
           <Image
           source={require('../img/blueball.png')}
          style={styles.blueball}
           />
           <TextInput style = {styles.inputBox}
             placeholder="Set Pickup"
             placeholderTextColor="#000000"
             onChangeText={Pickup => this.setState({Pickup})}
             />
             <TouchableOpacity>
             <Image
             source={require('../img/gps.png')}
            style={styles.blueball}
             />
             </TouchableOpacity>
             </View>

             <View style= {styles.bluesection}>
             <Image
             source={require('../img/marker.png')}
            style={styles.blueball}
             />
             <TextInput style = {styles.inputBox}
               placeholder="Set Destination"
               placeholderTextColor="#000000"
               onChangeText={Destination => this.setState({Destination})}
               />
               </View>

               <View style= {styles.bluesection}>
               <TouchableOpacity onPress={this._showDateTimePicker}>
                 <Text>Show DatePicker</Text>
                   </TouchableOpacity>
                     <DateTimePicker
                         isVisible = {this.state.isDateTimePickerVisible}
                         onConfirm = {this._handleDatePicked}
                         onCancel = {this._hideDateTimePicker}
                         minimumDate = {new Date()}
                         mode =  "datetime"
                         timePickerModeAndroid = 'default'
                         is24Hour = {false}
                   />
               </View>
               <TouchableOpacity onPress={() => this._handlePress()} style ={styles.button}>
                   <Text style={styles.buttonText}> Submit </Text>
               </TouchableOpacity>
           </View>
         </View>
         </View>
         </ImageBackground>
        }

      
            
         </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItems: {
     height: '10%',
     marginBottom: 90,
     flexDirection: 'row',
   },
   menu : {
     height: 20,
     marginRight: 300,
   },
   center: {
     height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    height: '70%',
  },
  rectangle: {
    marginTop: 10,
    marginBottom: 40,
    width: 400,
    height: 600,
    backgroundColor: '#eaebed',
    borderRadius: 20,
    flexDirection: 'row',
  },
  circle:{
    width: 60,
    height: 60,
    borderRadius: 60/2,
    marginTop: 25,
    marginLeft: 120,
    flexDirection: 'row',
  },
  timeBase: {
    flexDirection: 'row',
  },
  text: {
     marginTop: 25,
     marginLeft: 65,
     fontWeight: '700',
  },
  Destination: {
    fontWeight: '900',
    marginTop: 10,
    color: 'black'
  },
  bold: {
    color: 'blue',
  },
  pending:{
    color: 'grey',
  },
  doneText: {
      fontWeight: 'bold',
      marginLeft: 150,
      marginTop: 20,
      color: 'black',
  },
  inputBox:{
    flex: 1,
    color: '#0e1011',
    marginLeft: 10,
    fontWeight: '100',
    fontSize: 17
  },
  blueball : {
    padding: 10,
    margin: 5,
    height: 10,
    width: 15,
    resizeMode : 'stretch',
    alignItems: 'center'
  },
  bluesection: {
    flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#fff',
   borderWidth: .5,
   borderColor: '#000',
   height: 50,
   width: 370,
   borderRadius: 5 ,
   margin: 7,
   marginLeft: 20,
   marginTop: 10
 },
 timesection: {
   flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#fff',
     borderWidth: .5,
     borderColor: '#000',
     height: 45,
     borderRadius: 5 ,
     margin: 5,
     width: 150,
     marginLeft: 20
},
 dateBox: {
   flex: 1,
   color: '#0e1011',
   marginLeft: 40,
   fontWeight: '100',
   fontSize: 17,
 },
 timeBox: {
   color: '#0e1011',
   marginLeft: 10,
   fontWeight: '100',
   fontSize: 14,
 },
 secondTimeBox:{
   marginLeft: 10,
   color: '#0e1011',
   fontWeight: '100',
   fontSize: 14,
 },
 btn:{
     flexDirection: 'row',
     marginRight: 180,
     marginLeft: 0
 },
 button: {
   width: 120,
   borderRadius: 25,
   backgroundColor: '#12213a',
   marginBottom: 40,
   paddingVertical: 12,
   marginLeft: 140,
   marginTop: 30,
   height: 50,
 },
 buttonText: {
   fontSize: 16,
   fontWeight: '800',
   color: 'white',
   textAlign: 'center'
 },
 setTime: {
   fontWeight: 'bold',
   color: '#010504',
   marginLeft: 17
 },
 toTime: {
   fontWeight: 'bold',
   color: '#010504',
   marginLeft: 9,
   marginTop: 13,
   fontSize: 19
 },
 secondTimesection: {
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#fff',
   borderWidth: .5,
   borderColor: '#000',
   height: 45,
   borderRadius: 5 ,
   margin: 10,
   width: 130,
   marginLeft: 80
 },
 private: {
   fontWeight: 'bold',
   color: '#010504',
   marginLeft: 50,
   marginTop: 20,
   fontSize: 17
 },
 priv: {
   flexDirection: 'row',
 },
 checkButton: {
   marginTop: 13
 },
});


function mapStateToProps(state){
  return {
    active_trips: state.active_trips,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getActiveTrip}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(PostTrip);
