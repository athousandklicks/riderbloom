/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-community/async-storage';



export default class RiderInfoSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
          date:'',
          Pickup: '',
          Destination: '',
          Calendar: '',
          time: "",
          isDateTimePickerVisible: false,
          user_login_id: '',
          isTestVisible: false,
          
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
          isTestVisible: true,
        });

       // this.state.date.JSON.stringify();

      //  console.log('A date has been picked: ', this.state.date.JSON.stringify());
        console.log('A State date has been picked: ', this.state.date);
          this._hideDateTimePicker();
          this.ShowHideText();
      };

      
      ShowHideText = () =>{
        if(this.state.isTestVisible == true)
        {
          this.setState({isTestVisible: false})
        }
        else
        {
          this.setState({isTestVisible: true})
        }
      }
      
    
    
        _handlePress = () => {
      let data={}
        data.user_id=this.state.user_login_id,
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


    render() {
        return (
            <View style={styles.MainContainer}>

                <View style={styles.Header}>

                    


                </View>

                <View style={styles.Body}>

                    <View style={styles.TripDetailsContainer}>

                        <View style={styles.TripInfoWrapper}>

                            <View style={styles.TripPickup}>

                            <TextInput style = {styles.inputBox}
                                placeholder="Enter Pick Up City"
                                placeholderTextColor="#313233"
                                onChangeText={name => this.setState({name})}
                                value = {this.state.name}
                                onSubmitEditing={()=> this.phone.focus()}
                            />

                            <TextInput style = {styles.inputBox}
                                placeholder="Enter Destination City"
                                placeholderTextColor="#313233"
                                onChangeText={name => this.setState({name})}
                                value = {this.state.name}
                                onSubmitEditing={()=> this.phone.focus()}
                            />            
                            </View>
                            
                            <View style={styles.TripTagsWrapper}>

                                             
                            <TouchableOpacity onPress={this._showDateTimePicker}>
                                <View style={styles.DestinationTagNames}>
                                    <Image
                                    source={require('../img/datetime.png')}
                                    style={styles.menu}
                                    />
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

                                <View style={styles.TripInfoWrapper}>
                                <View style={styles.TripDate}>
                                    { 
                                        this.state.isTestVisible ? 
                                        <Text style={styles.TripInfoTitle}>Date</Text>
                                         : null
                                    }
                                    <Text style={styles.TripInfoText}> 
                                    {this.state.date.toString().slice(0,15)}</Text>
                                </View>
                                <View style={styles.TripTime}>
                                    { 
                                        this.state.isTestVisible ? 
                                        <Text style={styles.TripInfoTitle}>Time</Text>
                                         : null
                                    }
                                    <Text style={styles.TripInfoText}>
                                    {this.state.date.toString().slice(17,24)}</Text>
                                </View>
                                    
                                </View>
                                   
                            </View>
                        </View>
                        <View style={styles.TripButtonWrapper}>
                            <View style={styles.TripRequestButton}>
                                <Text style={styles.TripRequestButtonText}>Post Trip</Text>
                            </View>
                        </View>
                        </View>

                        

                    </View>

                </View>

        );
    }
}



const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#3756dc',
        alignSelf: 'stretch'
    },

    Header:{
        flex: 2,
        backgroundColor: '#3756dc',
        padding: 23
    },

    TripDetailsHeading:{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    Body:{
        flex: 4,
        backgroundColor: '#ffffff',
        padding: 23,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14
    },

    TripDetailsText:{
        color: '#ffffff',
        fontSize: 16
    },

    TripFromToConatainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },

    TripDetailsFrom:{
        flex: 1,
        justifyContent: 'center',

    },
    TripDetailsDestination:{
        flex: 1,
        justifyContent: 'center',

    },

    TripDetailsArrow:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    TripFromDestinationTitles:{
        color: '#dfe5ec',
        fontSize: 12,
        marginBottom: 5,
        textAlign: 'left'
    },

    TripToDestinationTitles:{
        color: '#dfe5ec',
        fontSize: 12,
        marginBottom: 5,
        textAlign: 'right'
    },

    TripForwardArrow:{
        color: '#dfe5ec',  
    },

    ForwardArrow:{
        color: '#ffffff',
    },

    TripFromCityNameToCityName:{
        
    },

    TripFromDestinationText:{
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'left'
    },

    TripToDestinationText:{
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right'
    },


    TripDetailsContainer: {
        alignSelf: 'stretch'
    },

    TripInfoWrapper:{
        marginBottom: 5,
        alignItems: 'flex-start',
        marginLeft:15

    },

    TripInfoTitle:{
        color: '#000000',
        fontSize: 12,
        textAlign: 'left',
        marginBottom: 1,
        fontWeight: 'bold',

    },

    TripInfoText:{
        color: '#31353a',
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 8,
    },

    TripInfoTextLastChild:{
        color: '#31353a',
        fontSize: 23,
        textAlign: 'left',
    },

    TripTagsWrapper:{
        alignSelf: 'stretch',
        flexDirection:'row'
    },

    TagsMeta:{
        flexDirection: 'row',
        marginBottom: 8
    },

    TagTitle:{
        marginRight: 8
    },

    DestinationTagNames:{
        flexDirection: 'row',
    },
    
    TagDestination:{
        borderRadius: 6,
        backgroundColor: '#3756dc',
        marginRight: 8,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        paddingBottom:6,
    },

    TripTagText:{
        color: '#ffffff',
        fontSize: 16,
    },

    DriverNoteText:{
        color: '#000000',
        fontSize: 13,
    },

    TripButtonWrapper:{
        flexDirection: 'row',
         justifyContent: 'center',
        alignItems: 'center',
    },

    TripCancelButton: {
        flex: 1,
        backgroundColor: '#ffffff',
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
        backgroundColor: '#222a46',
        padding: 8,
        borderRadius: 6,
        marginTop: 20,
        width:200,
        marginRight: 5,
        borderColor: '#bcc0c6',
        borderStyle: 'solid',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

      TripRequestButton2: {
        backgroundColor: '#ffffff',
        padding: 8,
        borderRadius: 6,
        marginTop: 20,
        width:200,
        marginRight: 5,
        borderColor: '#222a46',
        borderStyle: 'solid',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

      TripRequestButtonText2: {
        color: '#222a46',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
      },

      inputBox: {
        alignSelf: 'stretch',
        margin: 15,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        fontSize: 18,
        width: 280,
        alignItems: 'center',
        justifyContent: 'center',
        
      },

});
