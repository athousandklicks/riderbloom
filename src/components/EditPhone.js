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

const PHONE_NUMBER = 'phone_number';

export default class EditEmail extends Component {

  constructor(props) {
    super(props);
    //this.getPhone();
    this.state = {
              cur_phone:'',
              phone: null,
              user_id: null,
          };
  }



  componentDidMount () {
    const { navigation } = this.props;
    const userId = navigation.getParam('UserId', 'NO-ID');
    this.state.user_id = userId;
    console.log('TRIP ID: '+ userId);
    console.log('TRIP ID: '+ this.state.user_id);
    this.getDetails();
  }

  getDetails = async () => {
    try {
      const current_phone = await AsyncStorage.getItem('phone_number');

      this.setState({ 
        cur_phone: current_phone,
      });

    } catch (e) {
      this.props.navigation.navigate('Auth');
    }
  }


  removeValue = async () => {
    try {
      await AsyncStorage.removeItem('phone_number');
      console.log('User phone_number Removed successfull');
    } catch(e) {
      // remove error
    }
    console.log('Done.')
  }


  async updateUserPhone(phone_number) {
    try {
        await AsyncStorage.setItem(PHONE_NUMBER, phone_number);
        console.log('User phone stored successfull');
    } catch (error) {
        console.log('Something went wrong');
    }
  }
 
  async updatePhone (){
    let data = {};
      data.value = this.state.phone,
      data.type = 'phone',
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

          console.log(response.user_details.phone);

          let new_phone = response.user_details.phone;

          this.removeValue();
          this.updateUserPhone(new_phone);

          ToastAndroid.show
          ('Phone Number Successfully Updated ', ToastAndroid.SHORT);

          this.props.navigation.goBack();

         this.props.navigation.navigate('Profile');
         console.log('Updated phone: '+ new_phone);

        } else {
            console.log('Error');
    
        }
    })
    .catch(error => console.error('Error', error));
  }

  static navigationOptions = {
    title: 'Update Phone',
  };
   
       render() {
            return (
              <View style={styles.MainContainer}>
                    <View style={styles.Body}>
                                <Text style={styles.LabelText}>Phone</Text>
                                <TextInput style = {styles.inputBox}
                                placeholder= {this.state.cur_phone}
                                keyboardType="numeric"
                                placeholderTextColor="#313233"
                                  onChangeText={phone => this.setState({phone})}
                                  value = {this.state.phone}
                                />
                                
                            <TouchableOpacity onPress={() => this.updatePhone()} style ={styles.button}>
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
            