/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground, Image,
  TextInput,TouchableOpacity, Picker, Button, CheckBox} from 'react-native';

  import AsyncStorage from '@react-native-community/async-storage';

export default class Landing extends Component{

  constructor(props){
    super(props)

    this.state = {
    name: '',
    user_Id: null,
      }
    }


    getUserDetails = async () => {
      try {
        const userId = await AsyncStorage.getItem('user_id');
        const firstName = await AsyncStorage.getItem('first_name');
        console.log('USER ID FROM ASYNC: ' + userId);
        console.log('USER Name FROM ASYNC: ' + firstName);
        this.setState({ 
          user_Id: userId, 
          name: firstName,
        });
      } catch (e) {
        this.props.navigation.navigate('Auth');
      }
    }


    componentDidMount () {
      this.getUserDetails();
    }


  static navigationOptions = { header: null, };

  render(){
    return (
      <ImageBackground source={require('../img/map.jpg')} style={styles.container}>



          <View style= {styles.bottom}>
              <View style= {styles.rectangle}>

              <View style={styles.nameText}>
              <Text style={styles.doneText}> Good Day, {this.state.name} </Text>

              <TouchableOpacity onPress={()=> this.props.navigation.navigate('PostTrip', 
              {UserId: this.state.user_Id})}>
              <TextInput style= {styles.whereBox}
                 placeholder="Where To?"
                 placeholderTextColor="#313233"
                 editable={false}
              />
              </TouchableOpacity>
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
     height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    height: '70%',
  },
  rectangle: {
    marginTop: 250,
    width: 500,
    height: 250,
    backgroundColor: '#eaebed',
    borderRadius: 20,
    flexDirection: 'row',
  },
  circle:{
    width: 60,
    height: 60,
    borderRadius: 60/2,
    marginTop: 25,
    marginLeft: 120,
    flexDirection: 'row',
  },
  timeBase: {
    flexDirection: 'row',
  },
  whereBox: {
    backgroundColor: '#c6c6c6',
    marginTop: 30,
    width: 300,
    marginLeft: 110,
    padding: 10
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
  nameText:{
    flexGrow: 1,
    alignItems: 'stretch',
  },
  doneText: {
      textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:15,
    borderBottomWidth: 2,
    borderBottomColor:'#0a1a75',
    marginTop: 20,
    color: 'black',
    fontSize: 20,
  },
  inputBox:{
    flex: 1,
    color: '#0e1011',
    marginLeft: 10,
    fontWeight: '100',
    fontSize: 17
  },
  blueball : {
    padding: 10,
    margin: 5,
    height: 10,
    width: 15,
    resizeMode : 'stretch',
    alignItems: 'center'
  },
  bluesection: {
    flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#fff',
   borderWidth: .5,
   borderColor: '#000',
   height: 50,
   width: 370,
   borderRadius: 5 ,
   margin: 7,
   marginLeft: 20,
   marginTop: 10
 },
 timesection: {
   flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#fff',
     borderWidth: .5,
     borderColor: '#000',
     height: 45,
     borderRadius: 5 ,
     margin: 5,
     width: 150,
     marginLeft: 20
},
 dateBox: {
   flex: 1,
   color: '#0e1011',
   marginLeft: 40,
   fontWeight: '100',
   fontSize: 17,
 },
 timeBox: {
   color: '#0e1011',
   marginLeft: 10,
   fontWeight: '100',
   fontSize: 14,
 },
 secondTimeBox:{
   marginLeft: 10,
   color: '#0e1011',
   fontWeight: '100',
   fontSize: 14,
 },
 btn:{
     flexDirection: 'row',
     marginRight: 180,
     marginLeft: 0
 },
 button: {
   width: 120,
   borderRadius: 25,
   backgroundColor: '#12213a',
   marginBottom: 40,
   paddingVertical: 12,
   marginLeft: 140,
   marginTop: 30,
   height: 50,
 },
 buttonText: {
   fontSize: 16,
   fontWeight: '800',
   color: 'white',
   textAlign: 'center'
 },
 setTime: {
   fontWeight: 'bold',
   color: '#010504',
   marginLeft: 17
 },
 toTime: {
   fontWeight: 'bold',
   color: '#010504',
   marginLeft: 9,
   marginTop: 13,
   fontSize: 19
 },
 secondTimesection: {
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#fff',
   borderWidth: .5,
   borderColor: '#000',
   height: 45,
   borderRadius: 5 ,
   margin: 10,
   width: 130,
   marginLeft: 80
 },
 private: {
   fontWeight: 'bold',
   color: '#010504',
   marginLeft: 50,
   marginTop: 20,
   fontSize: 17
 },
 priv: {
   flexDirection: 'row',
 },
 checkButton: {
   marginTop: 13
 }
});
