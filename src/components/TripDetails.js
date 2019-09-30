/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Platform, 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    ImageBackground,
    BackHandler,
    ToastAndroid,
    Alert,
    TouchableOpacity,
    ActivityIndicator
  } from 'react-native';

import { connect } from 'react-redux';
import { activeTripDetails} from '../store/actions';
import { bindActionCreators } from 'redux';


class TripDetails extends Component {

    constructor(props){
        super(props);
         this.state = {
         pickUp: '',
         destination: '',
         pickup_time:'',
         pickup_date:'',
         trip_id:'',
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

        //  componentWillMount(){
        //   BackHandler.addEventListener('hardwareBackPress', function() {
        //     return true;
        //   });
        //  }

         componentDidMount () {
            const { navigation } = this.props;
            const tripId = navigation.getParam('tripId', 'NO-ID');

            this.setState({ 
              trip_id: tripId, 
           });

            console.log('TRIP ID: '+ tripId);
            console.log('STATE TRIP ID: '+ this.state.trip_id);
             this.props.activeTripDetails(tripId);
          }

        cancelTripAlert(){
          Alert.alert(
            'Exit',
            'Do You Want to Cancel this trip?',
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

        cancelTrip = () => {
            let data={}
              data.trip_id = this.state.trip_id
              this.ShowHideActivityIndicator();
      
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
                if(response.status === true){
                  this.ShowHideActivityIndicator();
                  ToastAndroid.show
                  ('Trip Request has been cancelled successfully', ToastAndroid.SHORT);
                  this.props.navigation.navigate('WelcomePage');

                }else{
                  console.log(response.status);
                    console.log(response);
                }
            })
            .catch(error => console.error('Error', error));
            }

            static navigationOptions = {
              title: 'Trip Details',
              header: null,
            };
    
    render() {
        return (
            <View style={styles.MainContainer}>
        {  
          this.state.isLoading ?  <ActivityIndicator style={styles.ActivityIndicatorStyle} /> : null
        }
              <View style={styles.Title}>
              <Text style={styles.TitleText}>Trip Details</Text>
              </View>
        {
            this.props.active_trips.activeTripDetails 
        ?       
            <View style={styles.Body}>
                        <Text style={styles.LabelText}>Pick Up</Text>
                        <Text style={styles.TripInfoText}>
                        {this.props.active_trips.activeTripDetails.pick_up}</Text>
                        
                        <Text style={styles.LabelText}>Destination</Text>
                        <Text style={styles.TripInfoText}>
                        {this.props.active_trips.activeTripDetails.destination}</Text>       

                        <Text style={styles.LabelText}>Date</Text>
                        <Text style={styles.TripInfoText}>
                        {this.props.active_trips.activeTripDetails.trip_date.slice(0,10)}</Text>  

                        <Text style={styles.LabelText}>Time</Text>
                        <Text style={styles.TripInfoText}>
                        {this.props.active_trips.activeTripDetails.trip_date.slice(12,21)}</Text>  

                        
                   
                    <TouchableOpacity onPress={() => this.cancelTripAlert()} style ={styles.button}>
                        <View style={styles.TripButtonWrapper}>
                            <View style={styles.TripRequestButton}>
                                <Text style={styles.TripRequestButtonText}>Cancel Trip</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    </View>
                    : null
                }

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
        marginTop:10
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

      Title:{
         marginTop:25,
        alignItems: 'center',
        justifyContent: 'center',
      },
      
      TitleText:{
        fontSize: 22,
        color: '#12213a',
        fontWeight: 'bold',
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

      ActivityIndicatorStyle:{
        paddingTop:20
      },
});


function mapStateToProps(state){
  return {
    active_trips: state.active_trips,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({activeTripDetails}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(TripDetails);
