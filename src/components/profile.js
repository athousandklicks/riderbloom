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
    drawerLabel: 'Profile',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./compass.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
         <View style={styles.top}>
           <Text style={styles.headerText}> Profile </Text>

            <View>
                 <Image
                     source={require('../img/avatar.png')}
                     style={styles.CircleShapeView}
                 />
             </View>
              <Text style={styles.secondText}> Edit Profile </Text>
        </View>

      <View style= {styles.center}>
          
          <View style={styles.category}>

          <TouchableOpacity onPress={()=> this.props.navigation.navigate('EditName', 
          {UserId: this.state.user_Id})}>

          <Text style={styles.fNameTitle}> Name </Text>
              <TextInput style= {styles.fName}
                 value = {this.state.fname}
                 editable={false}
              />
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> this.props.navigation.navigate('EditPhone', 
              {UserId: this.state.user_Id})}>
              <Text style={styles.fNameTitle}> Phone </Text>
              <TextInput style= {styles.fName}
                 value = {this.state.phone}
                 editable={false}
              />
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> this.props.navigation.navigate('EditEmail', 
              {UserId: this.state.user_Id})}>
              <Text style={styles.fNameTitle}> Email </Text>
              <TextInput style= {styles.fName}
                 value = {this.state.email}
                 editable={false}
              />
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> this.props.navigation.navigate('EditPassword', 
              {UserId: this.state.user_Id})}>
              
              <Text style={styles.fNameTitle}
              placeholder="********"> Password</Text>
              <TextInput style= {styles.fName}
                 value = '********'
                 editable={false}
              />
              </TouchableOpacity>

          </View>
      </View>

        <View style= {styles.bottom}>
 
        <TouchableOpacity 
                onPress={() => this._signOutApp()} 
                style ={styles.button}>
               <Text style= {styles.buttonText}>Log Out</Text>
             </TouchableOpacity>

          </View>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor:'#ffffff'
  },
  top: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottom: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText:{
    fontSize: 20,
    color: '#011f54',
    marginVertical: 50,
    alignItems: 'center',
    fontWeight: '500',
 
  },
  secondText:{
    fontSize: 23,
    color: '#011f54',
    marginVertical: 50,
    alignItems: 'center',
    fontWeight: '500',
    marginTop: 10
  },
  CircleShapeView: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    backgroundColor: '#a7a7a7',
  
  },
  subText: {
    color: '#011f54',
    fontWeight: '300',
    marginLeft: 60,
    fontSize: 17
  },
  active: {
    color: '#cc0c0c',
    fontWeight: '500',
    marginLeft: 60,
    fontSize: 25
  },

  active2: {
    marginLeft: 60,
  }, 

  fName: {
    marginLeft:40,
    color: '#000000',
    fontWeight: '400',
    marginRight: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#dddddd',
    fontSize: 22,
    marginBottom: 30,
    paddingTop:1
   
  },

  fNameTitle: {
    marginLeft:40,
    color: '#011f54',
    fontWeight: '200',
    marginRight: 40,
    fontSize: 15,
    marginBottom: 2,

  },

category: {
    flexGrow: 1,
alignItems: 'stretch',
},
whereBox: {
  color: '#0e1011',
    marginLeft: 40,
    fontWeight: '100',
    fontSize: 17,
    marginBottom: 60,
},
logout:{
  marginRight: 300,
  marginTop: 20,
  resizeMode : 'stretch',
},


button: {
  width: 270,

  backgroundColor: '#12213a',
  marginVertical:20,
  marginBottom:30,
  paddingVertical: 15
},
buttonText: {
  fontSize: 16,
  fontWeight: '800',
  color: 'white',
  textAlign: 'center'
}, 

});
