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

class InterDetails extends Component {

  constructor(props){
    super(props);
     this.state = {
     pickUp: '',
     destination: '',
     pickup_time:'',
     pickup_date:'',
       }
     }

     componentDidMount () {
       const { navigation } = this.props;
       const tripId = navigation.getParam('tripId', 'NO-ID');
       console.log('TRIP ID: '+ tripId);
        this.props.activeTripDetails(tripId);
    // console.log('');
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


export default connect(mapStateToProps,mapDispatchToProps)(InterDetails);
