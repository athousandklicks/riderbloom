import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableOpacity} from 'react-native';



type Props = {};
export default class ActiveTrip extends Component<Props> {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.headerText}> ABUJA </Text>
          <Text style={styles.secondHeaderText}> Pickup: 7:10 AM </Text>
          <View>
          <Image
              source={require('../img/Group.png')}
              resizeMode = 'cover'
             style={styles.map}
            />
            </View>

        </View>

      <View style= {styles.center}>

        </View>
        <View style= {styles.bottom}>
           <Text style= {styles.destinationText}> Your Trip Has Been Accepted </Text>

           <View style={styles.btn}>
         <TouchableOpacity style={styles.button}>
           <Text style={styles.buttonText}> Call </Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.redbutton}>
           <Text style={styles.buttonText}> Cancel </Text>
         </TouchableOpacity>
             </View>

        </View>
      </View>
    );
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
  btn: {
    flexDirection: 'row',
  },
  map: {
    height: 220,
    width: 290,
  },
  destinationText: {
    justifyContent: 'center',
    marginLeft: 70,
    marginTop: 30,
    fontSize: 20,
  },
  locationText: {
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
    marginLeft: 80
  },
  redbutton: {
    backgroundColor: '#12213a',
    width: 120,
    paddingVertical: 10,
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 40,
    borderRadius: 25,
    paddingBottom: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center'
  },
});
