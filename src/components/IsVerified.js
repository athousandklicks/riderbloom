/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground, 
  Image} from 'react-native';

export default class IsVerified extends Component {
  render(){
    return (
      <ImageBackground source={require('../img/map.jpg')} style={styles.container}>
      <View style={styles.menuItems}>
            <Image
             source={require('../img/menu.png')}
            style={styles.menu}
            />
            <Image
             source={require('../img/bell.png')}
            style={styles.bell}
            />
        </View>
        <View style= {styles.center}>

          </View>

          <View style= {styles.bottom}>
              <View style= {styles.rectangle}>
              <View>
              <Image
               source={require('../img/city-icon.png')}
              style={styles.circle}
              />
                 <Text style={styles.cityText}> Within City </Text>
              </View>

                  <View>
                  <Image
                   source={require('../img/compass.png')}
                  style={styles.compass}
                  />
                      <Text style={styles.stateText}> Other State </Text>

                  </View>
               </View>
            </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItems: {
     height: '10%',
     marginBottom: 90,
     flexDirection: 'row',
   },
   menu : {
     height: 20,
     marginRight: 300,
   },
   center: {
     height: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    height: '20%',
  },
  rectangle: {
    marginTop: 10,
    marginBottom: 40,
    width: 310,
    height: 140,
    backgroundColor: '#eaebed',
    borderRadius: 10,
    flexDirection: 'row',
  },
  circle:{
    width: 60,
    height: 60,
    marginTop: 25,
    marginLeft: 60,
    flexDirection: 'row',
  },
  compass: {
    width: 60,
    height: 60,
    marginTop: 25,
    marginLeft: 90,
    flexDirection: 'row',
  },
  stateText: {
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
      marginLeft: 85,
  },
  text: {
     marginTop: 25,
     marginLeft: 65,
     fontWeight: '700',
  },
  Destination: {
    fontWeight: '900',
    marginTop: 10,
    color: 'black'
  },
  bold: {
    color: 'blue',
  },
  pending:{
    color: 'green',
  },
  cityText: {
      fontWeight: 'bold',
      marginLeft: 50,
      marginTop: 10,
      color: 'black',
  },
});
