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
export default class PostTrip extends Component {

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
          checked: false,
          textinputtime:'',
          textinputdate:'',
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
        this.setState({ 
          date: date,
          textinputdate: date.toString().slice(4,15),
          textinputtime: date.toString().slice(16,24),
        });
        console.log('A State date has been picked: ', this.state.date);

          this._hideDateTimePicker();
      };
      
    postTrip = () => {
      let data={}
        data.user_id=this.state.user_login_id,
        data.from=this.state.pickup,
        data.to=this.state.destination,
        data.trip_date=this.state.date,
        data.private_trip=this.state.checked,

        this.ShowHideActivityIndicator();
        //data.trip_date=this.state.Time,
        console.log(data);
        console.log('Date Year: '+data.trip_date.getFullYear());
        console.log('Date Month: '+data.trip_date.getMonth());
        console.log('Date Time: '+data.trip_date.getFullYear());
    
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
          ('Trip Successfully Created ', ToastAndroid.SHORT);
      })
      // .catch(error => console.error('Error', error));
      .catch(error => ToastAndroid.show
        ('Trip not Successfully Created ', ToastAndroid.SHORT));
      }

      changeCheckBoxValue(){
          this.setState({
              checked: !this.state.checked,
          })
          console.log('checked Value:' + !this.state.checked);
      }


      static navigationOptions = {
        title: 'Post a Trip',
      };

    render() {
        return (
            <View style={styles.MainContainer}>
       
            <View style={styles.Body}>
                        <Text style={styles.LabelText}>Pick Up</Text>
                        <TextInput style = {styles.inputBox}
                            placeholder="e.g Abuja"
                            placeholderTextColor="#313233" 
                            onChangeText={pickup => this.setState({pickup})}
                                value = {this.state.pickup}
                        />

                        <Text style={styles.LabelText}>Destination</Text>
                        <TextInput style = {styles.inputBox}
                            placeholder="e.g Lagos"
                            placeholderTextColor="#313233"  
                            onChangeText={destination => this.setState({destination})}
                                value = {this.state.destination}
                        />       

                        {/* <TouchableOpacity onPress={this._showDateTimePicker}> */}
                        <View style={styles.TripDateTimeWrapper}>
                        
                                <View style={styles.TripDate}>
                                <Text style={styles.LabelText}>Date</Text>
                                    <TextInput style = {styles.inputBox}
                                    placeholder="Enter Date"
                                    placeholderTextColor="#313233" 
                                    // editable={false} 
                                    onChange={
                                        textinputdate => this.setState({textinputdate})}
                                    value = {this.state.textinputdate}
                                    onFocus={this._showDateTimePicker}
                                    
                                   
                                /> 
                                </View>

                                <View style={styles.TripTime}>
                                <Text style={styles.LabelText}>Time</Text>
                                    <TextInput style = {styles.inputBox}
                                    placeholder="Time"
                                    placeholderTextColor="#313233" 
                                    onChange={textinputtime => this.setState({textinputtime})}
                                    value = {this.state.textinputtime}
                                    editable={false} 
                                /> 
                                </View>
                            </View>  
                            {/* </TouchableOpacity>  */}

                            <DateTimePicker
                                            isVisible = {this.state.isDateTimePickerVisible}
                                            onConfirm = {this._handleDatePicked}
                                            onCancel = {this._hideDateTimePicker}
                                            minimumDate = {new Date()}
                                            mode =  "datetime"
                                            timePickerModeAndroid = 'default'
                                            is24Hour = {false}
                                 />

                    <View style={styles.CheckBoxWrapper}>
                        <View>
                        <CheckBox value = {this.state.checked} 
                            onChange={()=>this.changeCheckBoxValue()}/>
                        </View>

                        <View>
                            <Text style={styles.CheckBoxText}>Private Trip?</Text>
                        </View>
                    </View>
                            
                    <TouchableOpacity onPress={() => this.postTrip()} style ={styles.button}>
                        <View style={styles.TripButtonWrapper}>
                            <View style={styles.TripRequestButton}>
                                <Text style={styles.TripRequestButtonText}>Post a Trip</Text>
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
