/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
//This is an example code for Navigation Drawer with Custom Side bar//
import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';
 
export default class CustomSidebarMenu extends Component {
  constructor() {
    super();
    
    //Setting up the Main Top Large Image of the Custom Sidebar
    // this.proileImage =
    //   'https://aboutreact.com/wp-content/uploads/2018/07/sample_img.png';

    //this.proileImage = './avatar.png';

      
    //Array of the sidebar navigation option with icon and screen to navigate
    //This screens can be any screen defined in Drawer Navigator in App.js
    //You can find the Icons from here https://material.io/tools/icons/
    this.items = [
      {
        navOptionThumb: 'person',
        navOptionName: 'Profile',
        screenToNavigate: 'NavScreenProfile',
      },
      {
        navOptionThumb: 'history',
        navOptionName: 'Ride History',
        screenToNavigate: 'NavScreenRideHistory',
      },
      {
        navOptionThumb: 'settings',
        navOptionName: 'Settings',
        screenToNavigate: 'SettingsScreen',
      },
    ];

    this.state = {
      fname: '',
      lname: '',
      phone:'',
      email:'',
      user_Id: null,
     
        }
      }
  


  getDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      const fname = await AsyncStorage.getItem('first_name');
      const phone = await AsyncStorage.getItem('phone_number');
      const email = await AsyncStorage.getItem('email');

      this.setState({ 
        fname: fname,
        phone: phone,
        email: email,
        user_Id: userId,

      });

    } catch (e) {
      this.props.navigation.navigate('Auth');
    }
  }

  componentDidMount(){
    this.getDetails();
  } 

  render() {
    return (
      <View style={styles.sideMenuContainer}>
      
        {/* <Image
          source={{ uri: this.proileImage }}
          style={styles.sideMenuProfileIcon}
        /> */}



        <Icon name='account-circle' size={90} color="#808080" />
        <Text style={styles.smallText}>{this.state.fname}</Text>


        {/*Divider between Top Image and Sidebar Option*/}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 15,
          }}
        />
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 14,
                paddingBottom: 14,
                backgroundColor: global.currentScreenIndex === key ? '#232a46' : '#ffffff',
              }}
              key={key}>
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                <Icon name={item.navOptionThumb} size={25} color="#808080" />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  color: global.currentScreenIndex === key ? '#ffffff' : 'black',
                }}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}>
                {item.navOptionName}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingTop: 20,
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 120,
    height: 120,
    marginTop: 20,
    borderRadius: 120 / 2,
  },

  CircleShapeView: {
    width: 110,
    height: 110,
    borderRadius: 110/2,
    backgroundColor: '#a7a7a7',
  
  },

  smallText:{
    fontSize:18
  }
});