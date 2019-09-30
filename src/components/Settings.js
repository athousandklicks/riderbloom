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


export default class Settings extends Component {

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


render() {
  return (
      <View style={styles.MainContainer}>
          <View style={styles.Body}>
                  

                          <View style={styles.ProfileWrapper}>
                              <View style ={styles.IconBG}>
                                <Icon name='account-circle' size={90} color="#808080" />
                              </View>
                              <View style ={styles.NameBG}>
                              <Text style={styles.BigText}>{this.state.fname}</Text>
                              <Text style={styles.smallText}>{this.state.phone}</Text>
                              </View>
                          </View>

                          <View style={styles.ProfileWrapper}>
                              <View style ={styles.WarningIconBG}>
                                <Icon name='warning' size={20} color="#d3930b" />
                              </View>
                              <View style ={styles.WarningNameBG}>
                              <TouchableOpacity onPress={()=> this.props.navigation.navigate('EditEmail', 
                                {UserId: this.state.user_Id})}>
                                <Text style={styles.WarningsmallText}>
                                For added security, please verify your email address!
                                </Text>
                              </TouchableOpacity>
                              </View>
                          </View>

                          <View style ={styles.AddNextOfKin}>
                              <Text style={styles.NextofKinHeaderText}>
                              Family
                              </Text>
                          </View>

                          <View style={styles.ProfileWrapper}>
                              <View style ={styles.NoKIcone}>
                                <Icon name='face' size={20} color="#000000" />
                              </View>
                              <View style ={styles.WarningNameBG}>
                              <TouchableOpacity onPress={()=> this.props.navigation.navigate('NextOfKin', 
                                {UserId: this.state.user_Id})}>
                              <Text style={styles.AddNokText}>
                              Add Next of Kin
                              </Text>
                              </TouchableOpacity>
                              </View>
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
  marginLeft: 15,
  marginRight: 18,
  flex: 1,
  paddingTop: 10,
  marginBottom:5
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


ProfileWrapper:{
  flexDirection: 'row',
  borderBottomColor: '#bbb1b3',
  borderBottomWidth: 1,
  paddingBottom:5
},


IconBG: {
  flex: 2,
  borderRadius: 6,
  marginTop: 5,
  borderColor: '#bcc0c6',
  borderStyle: 'solid',
},

NameBG: {
  flex: 5,
  borderRadius: 6,
  marginTop: 12,
  borderColor: '#bcc0c6',
  borderStyle: 'solid',
  paddingLeft:8,
  paddingTop:15
  
},

WarningIconBG: {
  flex: 1,
  borderRadius: 6,
  marginTop: 5,
  borderColor: '#bcc0c6',
  borderStyle: 'solid',
  paddingTop:15
},



WarningNameBG: {
  flex: 8,
  borderRadius: 6,
  borderColor: '#bcc0c6',
  borderStyle: 'solid',
  paddingBottom:5,
  paddingTop:5
 
},

WarningsmallText:{
  paddingTop:6,
  fontSize:14,
  color:'#d3930b',
  paddingLeft:10
},

NextofKinHeaderText:{
  paddingTop:6,
  fontSize:12,
  color:'#363531',
  paddingLeft:12,
  paddingBottom:8
},

smallText:{
  fontSize:10
},

BigText:{
  fontSize:18
},

NoKIcone:{
  flex: 1,
  borderRadius: 6,
  marginTop: 5,
  borderColor: '#bcc0c6',
  borderStyle: 'solid',
  paddingTop:6
},

AddNextOfKin:{
  marginTop:20,
  marginBottom:10
},

AddNokText:{
  paddingTop:4,
  fontSize:14,
  color:'#363531',
  paddingLeft:8
}

});



