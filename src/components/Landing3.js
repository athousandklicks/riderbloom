/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
} from 'react-native';


export default class Landing3 extends Component {

     static navigationOptions = { header: null, };


    
    render() {
        return (
            <ImageBackground source={require('../img/new_map.png')} 
            style={styles.MainContainer}>    
                <View style={styles.Wrapper}>
                    <View style={styles.Top}>
                    
                    </View>
                    <View style={styles.Bottom}>
                        <Text style={styles.Name}>Hello Ome,</Text>
                        <Text style={styles.Greeting}>You have a Pending Trip yet to be Accepted</Text>
                        <Text style={styles.StatusText}>Status:    <Text style={styles.RedText}>pending...</Text></Text>
                        
                        <View style={styles.Botton}>
                            <View style={styles.Post}>
                                <Text style={styles.PostText}>Trip Details</Text>
                            </View>
                            <View style={styles.Icon}>
                                <Image
                                    source={require('../img/post_arrow.png')}
                                    resizeMode = 'cover'
                                    
                                />
                            </View>
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
