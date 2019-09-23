/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-community/async-storage';

;
export default class TripDetails1 extends Component {

    static navigationOptions = {
        title: 'Trip Details',
      };


    constructor(props) {
        super(props)
        this.state = {
          date:'',
          pickup: '',
          destination: '',
          user_login_id: '',
          
      }
    }

    getUserId = async () => {
        try {
          const userId = await AsyncStorage.getItem('user_id');
          console.log('USER ID FROM ASYNC: ', userId);
          this.setState({ 
            user_login_id: userId, 
          });
        } catch (e) {
          this.props.navigation.navigate('Auth');
        }
      }

    
      componentDidMount () {
        
        const { navigation } = this.props;
           const userId = navigation.getParam('UserId', 'NO-ID');
           this.setState({ 
            user_login_id: userId, 
          });
           console.log('TRIP ID: '+ userId);
           console.log('TRIP ID: '+ this.state.user_login_id);
       // this.getUserId();
      }
          
        
    render() {
        return (
            <View style={styles.MainContainer}>
            <View style={styles.Body}>
                        <Text style={styles.LabelText}>Pick Up</Text>
                        <Text style={styles.TripInfoText}>Lagos</Text>
                        
                        <Text style={styles.LabelText}>Destination</Text>
                        <Text style={styles.TripInfoText}>Abuja</Text>       

                        <Text style={styles.LabelText}>Date</Text>
                        <Text style={styles.TripInfoText}>20.09.19</Text>  

                        <Text style={styles.LabelText}>Time</Text>
                        <Text style={styles.TripInfoText}>10:30AM</Text>  

                        
                   
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Landing3')} style ={styles.button}>
                        <View style={styles.TripButtonWrapper}>
                            <View style={styles.TripRequestButton}>
                                <Text style={styles.TripRequestButtonText}>Cancel Trip</Text>
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
    },

    TripInfoText: {
        fontSize: 22,
        color: '#12213a',
        paddingLeft: 15,
        alignItems: 'center',
        paddingBottom: 10,
        fontWeight: 'bold',
        },

      LabelText:{
        marginTop:15,
        paddingLeft: 15,
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
