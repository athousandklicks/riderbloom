  /* eslint-disable prettier/prettier */
  import React, { Component } from 'react';
  import { connect } from 'react-redux';
  //import { artistsListAll } from '../store/actions';
  //import { bindActionCreators } from 'redux';
  import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Button
  } from 'react-native';

  import AsyncStorage from '@react-native-community/async-storage';


  export default class Home extends Component {

    // componentDidMount(){
    //   this.props.artistsListAll();
    // }


  //   navigateToArtistDetailsWithId = (item) => {
  //     this.props.navigation.navigate('Artist', {itemId: item.id});
  // }

 
  _signOutApp = async () => {
    try {
      await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
    } catch(e) {
      // clear error
    }
    console.log('Done.');
  }


    render() {
      return (
        
      <View style={styles.albumContainer}>
        <ScrollView vertical={true}>
          {/* {
            this.props.artists.artistList ?
              this.props.artists.artistList.map((item)=>(
                <TouchableOpacity
                      key = {item.id}
                      style = {styles.albumContainer}
                      onPress = {() => this.navigateToArtistDetailsWithId(item)}>
                        <View style={styles.Body}>

                          <View style={styles.TripDetailsContainer}>
                            <View style={styles.TripInfoWrapper}>
                              <View style={styles.TripPickup}>
                                  <Text style={styles.TripInfoTitle}>NAME: {item.name}</Text>
                                  <Text style={styles.TripInfoTitle}>USERNAME: {item.username}</Text>
                                  <Text style={styles.TripInfoTitle}>EMAIL: {item.email}</Text>
                              </View>
                            </View>
                          </View>
                        </View>          
                </TouchableOpacity>
              ))
            : null
          } */}

      <Button title='Sign Out' onPress={this._signOutApp} />
          
        </ScrollView>
        
    
        
      </View>
    );
  }
}


  const styles = StyleSheet.create({
    albumContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start' // if you want to fill rows left to right
    },
    
    imageContainer: {
      flex: 1,
    },

    albumImage: {
      width: '100%' // is 50% of container width
    },

    artistName: {
      textAlign: 'center',
    },

    artistStyle:{
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'right'
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

  })



  // function mapStateToProps(state){
  //   return {
  //     artists: state.artists,
  //   }
  // }

  // function mapDispatchToProps(dispatch){
  //   return bindActionCreators({artistsListAll}, dispatch)
  // }


  // export default connect(mapStateToProps, mapDispatchToProps)(Home)