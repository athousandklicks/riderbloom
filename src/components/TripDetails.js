/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Platform, 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TextInput, 
    TouchableOpacity} from 'react-native';

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
       }
     }

     componentDidMount () {
       const { navigation } = this.props;
       const tripId = navigation.getParam('tripId', 'NO-ID');
       this.state.trip_id = tripId;
       console.log('TRIP ID: '+ tripId);
       console.log('TRIP ID: '+ this.state.trip_id);
        this.props.activeTripDetails(tripId);
    // console.log('');
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
         this.props.navigation.navigate('PostTrip');
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

      <View style={styles.container}>

      {
        this.props.active_trips.activeTripDetails ? 
        
        <View style={styles.top}>
          <Text style={styles.headerText}>Pick Up: {this.props.active_trips.activeTripDetails.pick_up}</Text>
          <Text style={styles.secondHeaderText}>Trip Date: {this.props.active_trips.activeTripDetails.trip_date.slice(0,10)} </Text>
          <Text style={styles.secondHeaderText}>Trip Time: {this.props.active_trips.activeTripDetails.trip_date.slice(12,21)} </Text>
          <View>
            <Image
              source={require('../img/Group.png')}
              resizeMode = 'cover'
             style={styles.map}
            />
          </View>

          

          <View style= {styles.center}>

        </View>
        <View style= {styles.bottom}>
           <Text style= {styles.destinationText}> Destination </Text>
           <Text style= {styles.locationText}> Lagos </Text>
           <Text style= {styles.timeoutText}> Timeout </Text>
           <Text style= {styles.timeText}> 30:05 </Text>
           

           <TouchableOpacity onPress={() => this.cancelTrip()} style ={styles.button}>
             <Text style= {styles.buttonText}> Cancel </Text>
           </TouchableOpacity>

           
        </View>

          

        </View>

        : null
      } 
      </View>
      )
    }
  }

        



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor:'#e8e9ed'
  },
  top: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1767eb',
  },
  bottom: {
    height: '50%',
  },
  headerText:{
    fontSize: 20,
    color: 'white',
    marginVertical: 10,
    alignItems: 'center',
    fontWeight: '500',
      paddingRight: 250
  },
  secondHeaderText: {
    fontSize: 15,
    color: 'white',
    marginVertical: 0,
    paddingBottom: 10,
    paddingRight: 200
  },
  map: {
    height: 220,
    width: 290,

  },
  destinationText: {
    justifyContent: 'center',
    marginLeft: 70,
    marginTop: 30,
  },
  locationText: {
    fontWeight: 'bold',
    marginLeft: 70,
    color: 'black'
  },
  timeoutText: {
    justifyContent: 'center',
    marginLeft: 70,
    marginTop: 20,
  },
  timeText: {
    fontWeight: 'bold',
    marginLeft: 70,
    color: 'black'
  },
  button: {
    width: 120,
    borderRadius: 25,
    backgroundColor: '#12213a',
    marginVertical: 40,
    paddingVertical: 12,
    marginLeft: 140
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center'
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
