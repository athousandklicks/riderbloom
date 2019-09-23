/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Platform, 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    Image, 
    ImageBackground, 
    TextInput,
    ToastAndroid} from 'react-native';
    import AsyncStorage from '@react-native-community/async-storage';

const EMAIL = 'email';

export default class EditEmail extends Component {

  constructor(props) {
    super(props);
    //this.getPhone();
    this.state = {
      password: null,
      user_id: null,
          };
  }



  componentDidMount () {
    const { navigation } = this.props;
    const userId = navigation.getParam('UserId', 'NO-ID');
    this.state.user_id = userId;
    console.log('TRIP ID: '+ userId);
    console.log('TRIP ID: '+ this.state.user_id);
  }

 
  async updatePassword (){
    let data = {};
      data.value = this.state.password,
      data.type = 'password',
      data.user_id = this.state.user_id,
      console.log(data);

    var url = 'http://104.248.254.71/app/public/api/update-profile';

    fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json',
    }
    }).then(res => res.json())
    .then(response => {
        if (response.status === true){
          console.log('Password Updated Successfully');
          ToastAndroid.show
          ('Password Successfully Updated ', ToastAndroid.SHORT);

          this.props.navigation.goBack();
        } else {
            console.log('Error');
        }
    })
    .catch(error => console.error('Error', error));
  }

  static navigationOptions = {
    title: 'Update Password',
  };
      render() {
        return (

          <View style={styles.MainContainer}>
                    <View style={styles.Body}>
                        <TextInput style = {styles.inputBox}
                            placeholder="Enter New Password"
                            secureTextEntry={true}
                            placeholderTextColor="#313233"
                              onChangeText={password => this.setState({password})}
                              value = {this.state.password}
                        />

                            <TouchableOpacity onPress={() => this.updatePassword()} style ={styles.button}>
                                <View style={styles.TripButtonWrapper}>
                                    <View style={styles.TripRequestButton}>
                                        <Text style={styles.TripRequestButtonText}>Save</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            </View>

                            <View style= {styles.bottom}>
                                <Image source={require('../img/log.png')}  style={styles.backgroundImage} />
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
      marginTop:10,
      flex: 3,
    },

    bottom: {
      flex: 1,
    },
    
    inputBox: {
    alignSelf: 'stretch',
    height: 55,
    borderRadius:8,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#ffffff',
    marginTop:10,
    },
    
    LabelText:{
    marginTop:20,
    fontWeight:'bold',
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
    fontSize: 20,
    },
    
    TripRequestButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    },

    
    });


    