/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Platform, 
    StyleSheet, 
    Text, View, 
    Image,
    BackHandler,
    ToastAndroid,
    TouchableOpacity,
    PermissionsAndroid,
    Linking,
    Alert,
    } from 'react-native';

  import Contacts from 'react-native-contacts';

  import AsyncStorage from '@react-native-community/async-storage';




export default class DriverDetails extends Component {

  constructor(props){
    super(props)

    this.state = {
    name: '',
    phone:'',
    plate: '',
    car_make: '',
    car_model: '',
    colour: '',
    seats: '',
    user_Id: null,
    tripId: '',
    pickup:'',
    destination:'',
    date:'',
    time:'',
      }
    }

    cancelTripAlerts(){
    Alert.alert(
      'Cancel Trip',
      'Do You Want to Cancel this Trip?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.cancelTrip()},
      ],
      {cancelable: false},
    );

    }
 

    dialCall = () => {
 
      let phoneNumber = '';
   
      if (Platform.OS === 'android') {
        phoneNumber = `tel:${this.state.phone}`;
        console.log('Phone Number: ' + phoneNumber); 
      }
      else {
        phoneNumber = `telprompt:${this.state.phone}`;
        console.log('Phone Number: ' + phoneNumber);
      }
   
      Linking.openURL(phoneNumber);
    };



    //  componentWillUnmount() {
    //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // }
  
  //   handleBackButton() {
  //    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
  //     return true;
  // }


    async componentDidMount() {
    //  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        const { navigation } = this.props;
           const userId = navigation.getParam('UserId', 'NO-ID');
           this.setState({ 
            user_Id: userId, 
          });
  
      try {
          
          return fetch(`http://104.248.254.71/app/public/api/get-active-trip?user_id=${userId}`)
         .then ((res) => res.json())
         .then(response => {
             if(response.status == true){
  
                  if(response.request_details.status == 2){
                    console.log('ACTIVE TRIP DETAILS STATUS: ' + response.request_details.status);

                    let fullname = response.driver.firstname;
                    let phone_number = response.driver.phone;
                    let plate_number = response.vehicle.plate_number;
                    let car_make_name = response.vehicle.car_make_id;
                    let car_model_name = response.vehicle.car_model_id;
                    let car_colour = response.vehicle.colour;
                    let No_of_seats = response.vehicle.number_of_seats; 
                    let trip_id = response.trip_details.id; 

                    let _pickup = response.request_details.pick_up;
                    let _destination = response.request_details.destination;
                    let _date = response.request_details.trip_date;
                    let _time = response.request_details.trip_date;
                    
                    this.setState({ 
                        name: fullname,
                        phone:phone_number,
                        plate: plate_number,
                        car_make: car_make_name,
                        car_model: car_model_name,
                        colour: car_colour,
                        seats: No_of_seats, 
                        tripId: trip_id,

                      pickup: _pickup,
                      destination: _destination,
                      date: _date.slice(0,10),
                      time: _time.slice(12,19),
                      });
                  }
  
             }
         }).catch((error) => {
          console.log(error);
         })
  
        } catch (e) {
          this.props.navigation.navigate('Auth');
        }
    }


    // cancelTrip = () => {
    //   let data={}
    //     data.trip_id = this.state.tripId;
    //     console.log('CANCEL TRIP DATA: '+ data.trip_id)
    //   }

    cancelTrip = () => {
      let data={}
        data.trip_id = this.state.tripId;

        console.log('CANCEL TRIP DATA: '+ data.trip_id)

      var url = 'http://104.248.254.71/app/public/api/cancel-trip-request';
    
      fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
      }).then(res => res.json())
      .then(response => {
        // console.log(response.message);
        // console.log(response.trip_details.id)
        //  this.props.navigation.navigate('Landing');
          if(response.status == true){
            ToastAndroid.show
            ('Trip Request has been cancelled successfully', ToastAndroid.SHORT);
            this.props.navigation.navigate('welcomePage');
          }else{
            console.log(response.status);
              console.log(response);
          }
      })
      .catch(error => console.error('Error', error));
      }


    static navigationOptions = {
      title: 'Titan Details',
    };

render() {
  return (
      <View style={styles.MainContainer}>
      
              <View style={styles.Top}>
                      <View style={styles.Icon}>
                      <Image
                          source={require('../img/avatar.png')}
                          style={styles.CircleShapeView}
                      />
                      </View>
                      <View style={styles.Post}>
                          <Text style={styles.NameText}>{this.state.name}</Text>
                          <Text style={styles.VehicleText}>{this.state.phone}</Text>
                          <Text style={styles.VehicleText}>
                          {this.state.colour} {this.state.car_make} {this.state.car_model}
                          </Text>
                          <Text style={styles.VehicleText}>
                          {this.state.plate}
                          </Text>
                      </View>
              </View>

     
              <View style={styles.Body}>
                  <Text style={styles.LabelText}>Pick Up</Text>
                  <Text style={styles.TripInfoText}>{this.state.pickup}</Text>
                  
                  <Text style={styles.LabelText}>Destination</Text>
                  <Text style={styles.TripInfoText}>{this.state.destination}</Text>       

                  <Text style={styles.LabelText}>Date</Text>
                  <Text style={styles.TripInfoText}>{this.state.date}</Text>  

                  <Text style={styles.LabelText}>Time</Text>
                  <Text style={styles.TripInfoText}>{this.state.time}</Text>  

                  
             
              
              <View style={styles.TripButtonWrapper}>
                      <TouchableOpacity onPress={() => this.dialCall()}  
                        style ={styles.TripRequestButton}>
                          <View>
                            <Text style={styles.TripRequestButtonText}>Call</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.cancelTripAlerts()} style ={styles.TripCancelButton}>
                          <View>
                              <Text style={styles.TripCancelButtonText}>Cancel Trip</Text>
                          </View>
                          </TouchableOpacity>
                      </View>
              </View>
              
             
          
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
  flex: 5,
  marginLeft: 18,
  marginRight: 18,
},

Top: {
  flex: 1, 
  flexDirection: 'row',
  borderRadius: 10,
  marginBottom:35,
  marginTop:10
},

bottom: {
  flex: 1,
},

Post:{
  flex: 5, 
  marginLeft: 20,
},

NameText:{
 
  color: '#000000',
  paddingLeft:40,
  fontWeight:'bold',
  fontSize: 20,
  paddingTop: 8,
},

VehicleText:{
 
  color: '#000000',
  paddingLeft:40,
  fontWeight:'bold',
  fontSize: 12,

},

Icon:{
  flex: 1, 
  marginLeft:20,

},

CircleShapeView: {
  width: 100,
  height: 100,
  borderRadius: 100/2,
  backgroundColor: '#a7a7a7',
},

TripInfoText: {
  fontSize: 22,
  color: '#12213a',
  paddingLeft: 15,
  alignItems: 'center',
  paddingBottom: 10,
  fontWeight: 'bold',
  },

LabelText:{
  marginTop:15,
  paddingLeft: 15,
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
   height:80
},


TripCancelButton: {
  flex: 1,
  backgroundColor: '#232a46',
  padding: 8,
  borderRadius: 6,
  marginTop: 20,
  marginLeft: 5,
  borderColor: '#bcc0c6',
  borderStyle: 'solid',
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
},

TripRequestButton: {
  flex: 1,
  backgroundColor: '#08733d',
  padding: 8,
  borderRadius: 6,
  marginTop: 20,
  marginRight: 5,
  borderColor: '#bcc0c6',
  borderStyle: 'solid',
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
},

TripCancelButtonText: {
  color: '#ffffff',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 18,
},

TripRequestButtonText: {
  color: '#ffffff',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 18,
},
});

