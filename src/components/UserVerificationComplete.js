/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground, 
  Image, 
  TouchableOpacity
} from 'react-native';


export default class UserVerificationComplete extends Component {

  static navigationOptions = { header: null, };
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
            <View style={styles.SquareShapeView}>

                <Image
                 source={require('../img/check.png')}
                style={styles.boy}
                />

                  <Text style={styles.firstText}> Thank You </Text>

                <Text style={styles.accountText}>Please be patient while we begin your verification process.
                 You will be contacted shortly.</Text>

                <TouchableOpacity style ={styles.button} onPress={()=> this.props.navigation.navigate('Landing')}>
                  <Text style= {styles.buttonText}> Done </Text>
                </TouchableOpacity>

            </View>
          </View>

          <View style= {styles.bottom}>

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
    color: 'grey',
  },
  SquareShapeView: {
    width: 300,
    height: 350,
    backgroundColor: '#fcfcfc',
    borderRadius: 10,
  },
  boy:{
    width: 60,
    height: 60,
    marginTop: 40,
    marginLeft: 110,
  },
  accountText: {
     fontSize: 15,
     marginRight: 40,
     marginLeft: 50,
     marginTop: 20,
     color: 'black',
  },
  firstText: {
    fontSize: 18,
    marginRight: 30,
    marginLeft: 90,
    marginTop: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  button: {
    width: 120,
    borderRadius: 25,
    backgroundColor: '#12213a',
    marginVertical: 30,
    paddingVertical: 10,
    marginLeft: 90
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center'
  },
});
