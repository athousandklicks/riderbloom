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

import { connect } from 'react-redux';
import { activeTripDetails} from '../store/actions';
import { bindActionCreators } from 'redux';


class PendingTrip extends Component {

    constructor(props){
        super(props)
    
        this.state = {
        name: '',
        user_Id: null,
        trip_id: '',
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
            const { navigation } = this.props;
            const tripId = navigation.getParam('tripId', 'NO-ID');
            this.setState({ 
             trip_id: tripId, 
           });
            console.log('TRIP ID: '+ tripId);
            console.log('TRIP ID: '+ this.state.trip_id);

          this.getUserDetails();
        //  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        }

        // componentWillMount(){
        //     BackHandler.addEventListener('hardwareBackPress', function() {
        //       return true;
        //     });
        //    }
    
    
        static navigationOptions = { header: null, };


    
    render() {
        return (
            <ImageBackground source={require('../img/new_map.png')} 
            style={styles.MainContainer}>    
                <View style={styles.Wrapper}>
                    <View style={styles.Top}>
                    
                    </View>
                    <View style={styles.Bottom}>
                        <Text style={styles.Name}>Hello {this.state.name},</Text>
                        <Text style={styles.Greeting}>You have a Pending Trip yet to be Accepted</Text>
                        <Text style={styles.StatusText}>Status:    <Text style={styles.RedText}>pending...</Text></Text>
                        
                        <View style={styles.BottonWrapper}>
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate('TripDetails', 
                            {tripId: this.state.trip_id})} style={styles.Botton}>
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
        //position: 'absolute',
      //  resizeMode: Image.resizeMode.stretch,
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
        fontSize: 16,
        color: '#12213a',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        fontWeight: 'bold',
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
        height:65,
        marginLeft:20,
        marginRight:20,
        marginTop:15,
        marginBottom:20,
        borderRadius: 10,
        paddingTop:17,
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

        Icon:{
            flex: 1, 
            marginLeft:50
        },

        StatusText:{
            fontSize: 16,
            color: '#12213a',
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 10,
            fontWeight: 'bold',
        },

        RedText:{
            color: '#e8021d',
            fontWeight:'bold'
        },
        

});

function mapStateToProps(state){
    return {
      active_trips: state.active_trips,
    }
  }
  
  function mapDispatchToProps(dispatch){
    return bindActionCreators({activeTripDetails}, dispatch);
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(PendingTrip);
