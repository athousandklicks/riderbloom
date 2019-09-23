/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-community/async-storage';

;
export default class PostTrip1 extends Component {

    static navigationOptions = {
        title: 'Post a Trip',
      };


    constructor(props) {
        super(props)
        this.state = {
          date:'',
          pickup: '',
          destination: '',
          rawTime: '',
          timeWithZeros: '',
          isDateTimePickerVisible: false,
          user_login_id: '',
          
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
           console.log('TRIP ID: '+ userId);
           console.log('TRIP ID: '+ this.state.user_login_id);
       // this.getUserId();
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

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let time = `${hours}:${minutes}:${seconds}`;

        this.setState({ 
          date: date,
          rawTime: time,
        });

       // this.state.date.JSON.stringify();

      //  console.log('A date has been picked: ', this.state.date.JSON.stringify());
        console.log('A State date has been picked: ', this.state.date);
        console.log('A State Time has been picked: ', this.state.rawTime);
          this._hideDateTimePicker();
          
      };

      postTrip = () => {
        let data={}
          data.user_id=this.state.user_login_id,
          data.from=this.state.pickup,
          data.to=this.state.destination,
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
          // this.props.navigation.navigate('TripDetails', {tripId: response.trip_details.id});
           this.props.navigation.navigate('TripAccepted', {tripId: response.trip_details.id});
            if(response.status == true){
              // this.props.navigation.navigate('InterDetails');
            }else{
              console.log(response.status);
                console.log(response);
            }
        })
        .catch(error => console.error('Error', error));
        }

        
        
    render() {
        return (
            <View style={styles.MainContainer}>
            <View style={styles.Body}>
                        <Text style={styles.LabelText}>Pick Up</Text>
                        <TextInput style = {styles.inputBox}
                            placeholder="e.g Abuja"
                            placeholderTextColor="#313233" 
                        />

                        <Text style={styles.LabelText}>Destination</Text>
                        <TextInput style = {styles.inputBox}
                            placeholder="e.g Lagos"
                            placeholderTextColor="#313233"  
                        />       

                        <TouchableOpacity onPress={this._showDateTimePicker}>
                        <View style={styles.TripDateTimeWrapper}>
                        
                                <View style={styles.TripDate}>
                                <Text style={styles.LabelText}>Date</Text>
                                    <TextInput style = {styles.inputBox}
                                    placeholder="e.g Lagos"
                                    placeholderTextColor="#313233" 
                                    // editable={false} 
                                    onChange={date => this.setState({date})}
                                    value = {this.state.date}
                                /> 
                                </View>

                                <View style={styles.TripTime}>
                                <Text style={styles.LabelText}>Time</Text>
                                    <TextInput style = {styles.inputBox}
                                    placeholder="e.g Lagos"
                                    placeholderTextColor="#313233" 
                                    editable={false} 
                                /> 
                                </View>
                            </View>  
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

                           
                   
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Landing3')} style ={styles.button}>
                        <View style={styles.TripButtonWrapper}>
                            <View style={styles.TripRequestButton}>
                                <Text style={styles.TripRequestButtonText}>Post a Trip</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
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
});
