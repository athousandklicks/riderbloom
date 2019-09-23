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

export default class TripAccepted1 extends Component {

    static navigationOptions = {
        title: 'Trip Accepted',
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

                    <View style={styles.Top}>
                            <View style={styles.Icon}>
                            <Image
                                source={require('../img/avatar.png')}
                                style={styles.CircleShapeView}
                            />
                            </View>
                            <View style={styles.Post}>
                                <Text style={styles.NameText}>Ome Itotoh</Text>
                                <Text style={styles.VehicleText}>Toyota Corolla . ABC 213 AA</Text>
                            </View>
                    </View>

                    <View style={styles.Body}>
                        <Text style={styles.LabelText}>Pick Up</Text>
                        <Text style={styles.TripInfoText}>Lagos</Text>
                        
                        <Text style={styles.LabelText}>Destination</Text>
                        <Text style={styles.TripInfoText}>Abuja</Text>       

                        <Text style={styles.LabelText}>Date</Text>
                        <Text style={styles.TripInfoText}>20.09.19</Text>  

                        <Text style={styles.LabelText}>Time</Text>
                        <Text style={styles.TripInfoText}>10:30AM</Text>  

                        
                   
                    
                    <View style={styles.TripButtonWrapper}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Landing3')} style ={styles.TripRequestButton}>
                                <View>
                                	<Text style={styles.TripRequestButtonText}>Call</Text>
                                </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Landing3')} style ={styles.TripCancelButton}>
                                <View>
                                    <Text style={styles.TripCancelButtonText}>Cancel Trip</Text>
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
        flex: 5,
        marginLeft: 18,
        marginRight: 18,
    },

    Top: {
        flex: 1, 
        flexDirection: 'row',
        borderRadius: 10,
        marginBottom:35,
        marginTop:10
    },

    bottom: {
        flex: 1,
      },

    Post:{
        flex: 5, 
        marginLeft: 20,
    },

    NameText:{
        flex: 3, 
        color: '#000000',
        paddingLeft:40,
        fontWeight:'bold',
        fontSize: 20,
        paddingTop: 28,
    },

    VehicleText:{
        flex: 3, 
        color: '#000000',
        paddingLeft:40,
        fontWeight:'bold',
        fontSize: 12,
    },

    Icon:{
        flex: 1, 
        marginLeft:20,
      
    },

    CircleShapeView: {
        width: 100,
        height: 100,
        borderRadius: 100/2,
        backgroundColor: '#a7a7a7',
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
         height:80
    },


    TripCancelButton: {
        flex: 1,
        backgroundColor: '#232a46',
        padding: 8,
        borderRadius: 6,
        marginTop: 20,
        marginLeft: 5,
        borderColor: '#bcc0c6',
        borderStyle: 'solid',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

    TripRequestButton: {
        flex: 1,
        backgroundColor: '#08733d',
        padding: 8,
        borderRadius: 6,
        marginTop: 20,
        marginRight: 5,
        borderColor: '#bcc0c6',
        borderStyle: 'solid',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

    TripCancelButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
      },

     TripRequestButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
      },
});
