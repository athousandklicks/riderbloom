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
    TouchableOpacity} from 'react-native';

import { connect } from 'react-redux';
import { activeTripDetails} from '../store/actions';
import { bindActionCreators } from 'redux';


export default class TripDetails2 extends Component {

    constructor(props){
        super(props);
         this.state = {
         pickUp: '',
         destination: '',
         pickup_time:'',
         pickup_date:'',
         trip_id:'',
           }
         }

         componentDidMount () {
            const { navigation } = this.props;
            const tripId = navigation.getParam('tripId', 'NO-ID');
            this.setState({ 
             trip_id: tripId, 
           });
            console.log('TRIP ID: '+ tripId);
            console.log('TRIP ID: '+ this.state.trip_id);
             this.props.activeTripDetails(tripId);
     
             BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
         // console.log('');
          }

          componentWillUnmount() {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
          }
      
          handleBackButton() {
            ToastAndroid.show('Sorry, Cancel the trip before going to post trip again', ToastAndroid.SHORT);
            return true;
        }

        cancelTrip = () => {
            let data={}
              data.trip_id = this.state.trip_id
      
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
              console.log(response.message);
              console.log(response.trip_details.id)
               this.props.navigation.navigate('Landing');
                if(response.status == true){
                  // this.props.navigation.navigate('InterDetails');
                }else{
                  console.log(response.status);
                    console.log(response);
                }
            })
            .catch(error => console.error('Error', error));
            }

            static navigationOptions = { header: null, }

    render() {
        return (
            <View style={styles.MainContainer}>

        <View style={styles.Header}>

        <View style={styles.TripDetailsContainer}>
            <View style={styles.TripDetailsHeading}>
                <Text style={styles.TripDetailsText}>Trip Details</Text>
            </View>
        </View> 

        {
            this.props.active_trips.activeTripDetails 
            ? 

            <View style={styles.TripFromToConatainer}>

                <View style={styles.TripDetailsFrom}>
                    <Text style={styles.TripFromDestinationTitles}>From</Text>
                    <Text style={styles.TripFromDestinationText}
                    >{this.props.active_trips.activeTripDetails.pick_up}</Text>
                </View>

                <View style={styles.TripDetailsArrow}>
                    <Text style={styles.ForwardArrow}>>></Text>
                </View>

                <View style={styles.TripDetailsDestination}>
                    <Text style={styles.TripToDestinationTitles}>Destination</Text>
                    <Text style={styles.TripToDestinationText}>
                    {this.props.active_trips.activeTripDetails.destination}</Text>
                </View>

            </View> 

            : null
        }
    </View>



    
    <View style={styles.Body}>

    {
        this.props.active_trips.activeTripDetails 
        ?

        <View style={styles.TripDetailsContainer}>

            <View style={styles.TripInfoWrapper}>

                    <View style={styles.TripPickup}>
                    <Text style={styles.TripInfoTitle}>Pick Up</Text>
                    <Text style={styles.TripInfoText}>
                    {this.props.active_trips.activeTripDetails.pick_up}</Text>
                </View>

                <View style={styles.TripDate}>
                    <Text style={styles.TripInfoTitle}>Date</Text>
                    <Text style={styles.TripInfoText}>
                    {this.props.active_trips.activeTripDetails.trip_date.slice(0,10)} 
                    </Text>
                </View>
                <View style={styles.TripTime}>
                    <Text style={styles.TripInfoTitle}>Time</Text>
                    <Text style={styles.TripInfoText}>
                    {this.props.active_trips.activeTripDetails.trip_date.slice(12,21)}
                    </Text>
                </View>
            </View>

            <View style={styles.TripTagsWrapper}>
                <View style={styles.TagsMeta}>
                    <View style={styles.TagTitle}>
                    <Text style={styles.TripInfoTitle}>Tags</Text>
                    </View>
                    <View style={styles.TagIcon}>
                    <Text style={styles.TripInfoTitle}>?</Text>
                    </View>
                </View> 

                <View style={styles.DestinationTagNames}>
                    <View style={styles.TagDestination}>
                        <Text style={styles.TripTagText}>Benin</Text>
                    </View>
                    <View style={styles.TagDestination}>
                        <Text style={styles.TripTagText}>Ewu</Text>
                    </View>
                    <View style={styles.TagDestination}>
                        <Text style={styles.TripTagText}>Agbor</Text>
                    </View>
                   
                </View>

            </View>

            <View style={styles.TripDriversNote}>
            <Text style={styles.TripInfoTitle}>Driver's Note</Text>
            <Text style={styles.DriverNoteText}>Integer scelerisque diam 
            vitae aliquam fringilla. In vitae eros ac libero mattis 
            molestie nec in magna... It is a long established fact 
            that a reader will be </Text>

            </View>

            <View style={styles.TripButtonWrapper}>
                <View style={styles.TripRequestButton}>
                    <Text style={styles.TripRequestButtonText}>Request</Text>
                </View>
                <View style={styles.TripCancelButton}>
                    <Text style={styles.TripCancelButtonText}>Cancel</Text>
                </View>
            </View>
        </View>
        : null
    }

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
        flex: 1,
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
        marginBottom: 10,
        alignItems: 'flex-start',

    },

    TripInfoTitle:{
        color: '#000000',
        fontSize: 12,
        textAlign: 'left',
        marginBottom: 1,

    },

    TripInfoText:{
        color: '#31353a',
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 18,
    },

    TripInfoTextLastChild:{
        color: '#31353a',
        fontSize: 23,
        textAlign: 'left',
    },

    TripTagsWrapper:{
        alignSelf: 'stretch',
        marginBottom: 18
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
         justifyContent: 'space-between',
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
        flex: 1,
        backgroundColor: '#222a46',
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
