/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-community/async-storage';

;
export default class Profile2 extends Component {

    static navigationOptions = {
        title: 'Profile 2',
      };



    render() {
        return (
            <View style={styles.MainContainer}>
                <View style={styles.Body}>
                        <View style={styles.Top}>
                            <Image
                                source={require('../img/avatar.png')}
                                style={styles.CircleShapeView}
                            />
                        </View>

                        <View style={styles.Centre}>
                            <Text style={styles.LabelText}>Name</Text>
                            <TextInput style = {styles.inputBox}
                                placeholder="e.g Abuja"
                                placeholderTextColor="#313233" 
                            />

                            <Text style={styles.LabelText}>Phone</Text>
                            <TextInput style = {styles.inputBox}
                                placeholder="e.g Lagos"
                                placeholderTextColor="#313233"  
                            />  
                            <Text style={styles.LabelText}>Email</Text>
                            <TextInput style = {styles.inputBox}
                                placeholder="e.g Abuja"
                                placeholderTextColor="#313233" 
                            />

                            <Text style={styles.LabelText}>Password</Text>
                            <TextInput style = {styles.inputBox}
                                placeholder="e.g Lagos"
                                placeholderTextColor="#313233"  
                            />
                        </View>
                        <View style={styles.Bottom}>
                            <View style={styles.Icon}>
                                <Image
                                    source={require('../img/logout1.png')}
                                    resizeMode = 'cover'
                                />
                            </View>
                            <View style={styles.Post}>
                                <Text style={styles.PostText}>Logout</Text>
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
        flex: 1, 
        flexDirection: 'row',
        backgroundColor: '#ff0310',
        marginTop:50,
        borderRadius: 10,
        paddingTop:12,
        marginBottom:5
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
        flex: 5, 
        paddingLeft: 30,
    },

    PostText:{
        flex: 3, 
        color: '#ffffff',
        paddingLeft:40,
        fontWeight:'bold',
        fontSize: 18,
    },

    Icon:{
        flex: 1, 
        marginLeft:20,
        paddingTop: 3,
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
