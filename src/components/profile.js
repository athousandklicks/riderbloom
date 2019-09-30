/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, View, 
  Image,
  TextInput, 
  ScrollView,
  TouchableOpacity} from 'react-native';

  import AsyncStorage from '@react-native-community/async-storage';
  import { Icon } from 'react-native-elements';


export default class Profile extends Component {

  constructor(props){
    super(props)

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
        const lname = await AsyncStorage.getItem('first_name');
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

    componentDidMount () {
       this.getDetails();
     } 
     
     _signOutApp = async () => {
      try {
        await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
      } catch(e) {
        // clear error
      }
      console.log('Done.');
    }



  static navigationOptions = {
    drawerLabel: 'Profile 1',
    // drawerIcon: ({ tintColor }) => (
    //   <Image
    //     source={require('./compass.png')}
    //     style={[styles.icon, { tintColor: tintColor }]}
    //   />
    // ),
  };

static navigationOptions = {
  title: 'Profile 2',
};



render() {
  return (
      <View style={styles.MainContainer}>
          <View style={styles.Body}>
                  <View style={styles.Top}>
                  <Icon name='account-circle' size={110} color="#808080" />
                  </View>

                  <View style={styles.Centre}>
                  <TouchableOpacity onPress={()=> this.props.navigation.navigate('EditName', 
                  {UserId: this.state.user_Id})}>
                      <Text style={styles.LabelText}>Name</Text>
                      <TextInput style = {styles.inputBox}
                      placeholder={this.state.fname}
                      placeholderTextColor="#000000" 
                          editable={false} 
                      />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=> this.props.navigation.navigate('EditPhone', 
                    {UserId: this.state.user_Id})}>
                      <Text style={styles.LabelText}>Phone</Text>
                      <TextInput style = {styles.inputBox}
                      placeholder={this.state.phone}
                      placeholderTextColor="#000000" 
                          editable={false} 
                      />  
                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=> this.props.navigation.navigate('EditEmail', 
                      {UserId: this.state.user_Id})}>
                      <Text style={styles.LabelText}>Email</Text>
                      <TextInput style = {styles.inputBox}
                      placeholder={this.state.email}
                      placeholderTextColor="#000000" 
                      editable={false}
                      />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=> this.props.navigation.navigate('EditPassword', 
                      {UserId: this.state.user_Id})}>
                      <Text style={styles.LabelText}>Password</Text>
                      <TextInput style = {styles.inputBox}
                          placeholder="********"
                          placeholderTextColor="#000000" 
                          editable={false} 
                      />
                      </TouchableOpacity>
                  </View>


                  
              <View style ={styles.Bottom}>
                  <TouchableOpacity onPress={() => this._signOutApp()} style={styles.Botton}>
                      <View style={styles.Icon}>
                          <Image
                              source={require('../img/logout1.png')}
                              resizeMode = 'cover'
                          />
                      </View>
                      
                      <View style={styles.Post}>
                          <Text style={styles.PostText}>Logout</Text>
                      </View>
                  </TouchableOpacity>
              </View>
                  
                  
          </View>
      </View>
  );
}
}



const styles = StyleSheet.create({
MainContainer: {
  flex: 1,
  backgroundColor: '#dfe2ee',
  alignSelf: 'stretch'
},

Body: {
  marginLeft: 18,
  marginRight: 18,
  flex: 1,
  paddingTop: 10,
  marginBottom:5
},

Top: {
  flex: 3,
  backgroundColor: '#dfe2ee',
  alignItems: 'center',
  justifyContent: 'center',
},

Centre: {
  flex: 8,
  backgroundColor: '#dfe2ee',
  //marginBottom:15
},

Bottom: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},

Botton: {
  flex: 1, 
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: '#ff0310',
  marginTop:50,
  borderRadius: 10,
  paddingTop:13,
  marginBottom:5,
  height:55
},


CircleShapeView: {
  width: 120,
  height: 120,
  borderRadius: 120/2,
  backgroundColor: '#a7a7a7',

},

inputBox: {
  alignSelf: 'stretch',
  height: 50,
  borderRadius:8,
  fontSize: 16,
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: 20,
  paddingRight: 20,
  backgroundColor: '#ffffff',
  marginTop:5,
},

Post:{
  flex:3, 
 
},

Icon:{
  flex: 1, 
  marginLeft:20,
  paddingTop: 3,
},

PostText:{

  color: '#ffffff',
  paddingLeft:40,
  fontWeight:'bold',
  fontSize: 18,
},



LabelText:{
  marginTop:10,
  fontWeight:'bold',
},

TripDateTimeWrapper:{
  flexDirection: 'row',
   justifyContent: 'space-between',
},

TripTime: {
  flex: 1,
  paddingLeft: 4,
  borderRadius: 6,
},

TripDate: {
  flex: 1,
  paddingRight: 4,
  borderRadius: 6,
},

TripButtonWrapper:{
  flexDirection: 'row',
   justifyContent: 'space-between',
},


TripRequestButton: {
  flex: 1,
  backgroundColor: '#222a46',
  padding: 8,
  borderRadius: 6,
  marginTop: 30,
  borderColor: '#bcc0c6',
  borderStyle: 'solid',
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
  height: 55,
  
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



