/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { artistDetail , clearArtistDetail} from '../store/actions';
import { bindActionCreators } from 'redux';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


class Artist extends Component {

  componentDidMount(){
    
   const { navigation } = this.props;
   const itemId = navigation.getParam('itemId', 'NO-ID');
    this.props.artistDetail(itemId);
    // console.log('');
  }

  componentWillUnmount(){
    this.props.clearArtistDetail();
  }



  render() {
   // console.log(this.props.artists)
    return (
      <View style={styles.MainContainer}>
        {
        this.props.artists.artistData ?           
          <View style={styles.Body}>
              <View style={styles.TripDetailsContainer}>
                <View style={styles.TripInfoWrapper}>
                  <View style={styles.TripPickup}>
                      <Text style={styles.TripInfoTitle}>NAME: {this.props.artists.artistData[0].name}</Text>
                      <Text style={styles.TripInfoTitle}>USERNAME: {this.props.artists.artistData[0].username}</Text>
                      <Text style={styles.TripInfoTitle}>EMAIL: {this.props.artists.artistData[0].email}</Text>
                  </View>
                </View>
              </View>
          </View>
          : null
        }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  MainContainer: {
      flex: 1,
      backgroundColor: '#3756dc',
      alignSelf: 'stretch'
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


  TripDetailsContainer: {
    alignSelf: 'stretch'
  },

  TripInfoWrapper:{
    marginBottom: 10,
    alignItems: 'flex-start',

  },

  TripInfoTitle:{
    color: '#000000',
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 1,

  },
});




function mapStateToProps(state){
  return {
    artists: state.artists
  }
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({artistDetail, clearArtistDetail}, dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(Artist)