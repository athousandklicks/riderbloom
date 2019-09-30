/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    BackHandler
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';


export default class WelcomeActivePage extends Component {

    constructor(props){
        super(props)
    
        this.state = {
        name: '',
        user_Id: '',
        trip_id: '',
          }
        }
    
        getUserDetails = async () => {
          try {
            const userId = await AsyncStorage.getItem('user_id');
            console.log('USER ID FROM ASYNC: ' + userId);
            this.setState({ 
              user_Id: userId, 
            });
          } catch (e) {
            this.props.navigation.navigate('Auth');
          }
        }


        // componentWillMount(){
        //     BackHandler.addEventListener('hardwareBackPress', function() {
        //       return true;
        //     });
        //    }

        async componentDidMount () {

          //  this.getUserDetails();

            const userId = await AsyncStorage.getItem('user_id');
            console.log('USER ID FROM ASYNC: ' + userId);

            let new_user_id = userId;

            this.setState({ 
                user_Id: new_user_id, 
              });
      
              console.log('Passed ID: ' + this.state.user_Id);

            try {             
                 return fetch(`http://104.248.254.71/app/public/api/get-active-trip?user_id=${userId}`)
                //return fetch(`http://104.248.254.71/app/public/api/get-active-trip?user_id=1`)
               .then ((res) => res.json())
               .then(response => {
                   if(response.status == true){
        
                        if(response.request_details.status == 2){
                          console.log('ACTIVE TRIP DETAILS STATUS: ' + response.request_details.status);
      
                          let fullname = response.driver.firstname;
                          let phone_number = response.driver.phone;
                          let plate_number = response.vehicle.plate_number;
                          let car_make_name = response.vehicle.car_make_id;
                          let car_model_name = response.vehicle.car_model_id;
                          let car_colour = response.vehicle.colour;
                          let No_of_seats = response.vehicle.number_of_seats; 
                          let trip_id = response.trip_details.id; 
                          
                          this.setState({ 
                              name: fullname,
                              phone:phone_number,
                              plate: plate_number,
                              car_make: car_make_name,
                              car_model: car_model_name,
                              colour: car_colour,
                              seats: No_of_seats, 
                              tripId: trip_id
                            });

                            console.log('State Name' + this.state.name);
                        }
        
                   }
               }).catch((error) => {
                console.log(error);
               })
        
              } catch (e) {
                this.props.navigation.navigate('Auth');
              }

          
        //  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        }
    
    static navigationOptions = { header: null, };

    render() {
        return (
            <ImageBackground source={require('../img/new_map.png')} 
            style={styles.MainContainer}>    
                <View style={styles.Wrapper}>
                    <View style={styles.Top}>
                    
                    </View>
                    <View style={styles.Bottom}>
                    <View style={styles.Top2}>
                            <View style={styles.Icon}>
                            <Image
                                source={require('../img/avatar.png')}
                                style={styles.CircleShapeView}
                            />
                            </View>
                            <View style={styles.Post2}>
                                <Text style={styles.NameText}>{this.state.name}</Text>
                                <Text style={styles.VehicleText}>
                                {this.state.car_make} {this.state.car_model} - {this.state.plate}
                                    </Text>
                            </View>
                    </View>
                        <Text style={styles.StatusText}>Status:     <Text style={styles.RedText}>On a Trip</Text></Text>
                        
                        <View style={styles.BottonWrapper}>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('DriverDetails', 
                            {userId: this.state.user_Id})} style={styles.Botton}>
                            <View style={styles.Post}>
                                <Text style={styles.PostText}>Trip Details</Text>
                            </View>
                            
                            <View style={styles.Icon}>
                                <Image
                                    source={require('../img/post_arrow.png')}
                                    resizeMode = 'cover'
                                />
                            </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>

                
            </ImageBackground>
        );
    }
}



const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: 1, 
        alignSelf: 'stretch',
        width: null,
    },

    Wrapper: {
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: 1, 
        alignSelf: 'stretch',
        flexDirection: 'column',
    },

    Top: {
        flex: 3, 
    },

    Top2: {
        flex: 1, 
        flexDirection: 'row',
        borderRadius: 10,
        marginBottom:35,
        marginTop:20,
    },

    Post2:{
        flex: 5, 
        marginLeft: 30,
        paddingTop:8
    },

    Icon:{
        flex: 1, 
        marginLeft:20,
      
    },

    NameText:{
        color: '#000000',
        fontWeight:'bold',
        fontSize: 20,
    },

    CircleShapeView: {
        width: 70,
        height: 70,
        borderRadius: 70/2,
        backgroundColor: '#a7a7a7',
      },

    Bottom: {
        flex: 2, 
        backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        marginLeft:15,
        marginRight:15,
        marginBottom:30,
        borderRadius: 14

    },

    Name: {
    fontSize: 20,
    color: '#000000',
    paddingLeft: 30,
    alignItems: 'center',
    paddingTop: 20,
    fontWeight: 'bold',
    },

    Greeting: {
        fontSize: 22,
        color: '#12213a',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        fontWeight: 'bold',
        paddingBottom: 5
        },

        BottonWrapper: {
            flex: 1, 
            flexDirection: 'row',
            justifyContent: 'space-between',
          },

        Botton: {
        flex: 1, 
        flexDirection: 'row',
        backgroundColor: '#232a46',
        height:10,
        marginLeft:20,
        marginRight:20,
        marginTop:15,
        marginBottom:20,
        borderRadius: 10,
        paddingTop:17,
        height:65
        },

        Post:{
            flex: 3, 
        },

        PostText:{
            flex: 3, 
            color: '#ffffff',
            paddingLeft:23,
            fontWeight:'bold',
            fontSize: 18,
        },



        StatusText:{
            fontSize: 16,
            color: '#12213a',
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 10,
            paddingBottom:5,
            fontWeight: 'bold',
        },

        RedText:{
            color: '#1b9906',
            fontWeight:'bold'
        },
        

});
