/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Platform, 
  Button, 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground, 
  Image, 
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ToastAndroid
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { Icon } from 'react-native-elements';


export default class Rating extends Component{
    constructor() {
    super();
        this.state ={
            Default_Rating: 3,
            review:'',
            Max_Rating: 5,
            tripId:'',
            isLoading: false,
        }

        this.Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
        this.Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
        
        // this.Star = '<Icon name= "star" size={25} color="#808080" />'
        // this.Star_With_Border = '<Icon name= "star" size={25} color="#808080" />'
    }

    UpdateRating(key) {
        this.setState({ Default_Rating: key});
    }

ShowHideActivityIndicator = () =>{
  if(this.state.isLoading == true)
  {
    this.setState({isLoading: false})
  }
  else
  {
    this.setState({isLoading: true})
  }
}

getDetails = async () => {
  try {
    const userId = await AsyncStorage.getItem('user_id');
    console.log('User ID:' + userId);
    this.setState({ 
      userId: userId,
    });

  } catch (e) {
   // this.props.navigation.navigate('Auth');
  }
}


  componentDidMount(){
    this.getDetails();
    }


    postRating = () => {
        let data={}
          data.user_id =  1,
          data.trip_id = 1,
          // data.rating = 4,
          // data.review = 'Good',
         // data.user_Id =  this.state.userId
          //data.trip_Id = this.state.tripId,
         data.rating = this.state.Default_Rating,
          data.review = this.state.review,

  
          this.ShowHideActivityIndicator();
          //data.trip_date=this.state.Time,
          console.log(data)
      
        //var url = 'https://example.com/profile';
        var url = 'http://104.248.254.71/app/public/api/rate-user';
      
        fetch(url, {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json',
          }
          }).then(res => res.json())
          .then(response => {
            console.log(response);
              if (response.status === true){
    
                console.log(response.status);
                this.ShowHideActivityIndicator();
                this.props.navigation.navigate('WelcomePage');
                ToastAndroid.show
                ('Trip Rating Successfully Saved ', ToastAndroid.SHORT);
     
              } else {
                this.ShowHideActivityIndicator();
                ToastAndroid.show
                ('Trip Rating Not Successfully Saved ', ToastAndroid.SHORT);
              }
          })
          
          .catch(error => console.error('Error', error));
          this.ShowHideActivityIndicator();
          ToastAndroid.show
            ('Trip Rating Not Successfully Saved ', ToastAndroid.SHORT);
        }
 

   static navigationOptions = { header: null, };
  render(){

    {
        let React_Native_Rating_Bar = [];
        let rating_meaning = '';

        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
          React_Native_Rating_Bar.push(
            <TouchableOpacity
              activeOpacity={0.7}
              key={i}
              onPress={this.UpdateRating.bind(this, i)}>
              <Image
                style={styles.StarImage}
                source={
                  i <= this.state.Default_Rating
                    ? { uri: this.Star }
                    : { uri: this.Star_With_Border }
                }
              />
            </TouchableOpacity>
          );
        }

        if(this.state.Default_Rating === 1){
            rating_meaning = "Terrible"
        }else if(this.state.Default_Rating === 2){
            rating_meaning = "Bad"
        }else if(this.state.Default_Rating === 3){
            rating_meaning = "Okay"
        }else if(this.state.Default_Rating === 4){
            rating_meaning = "Good"
        }else{
            rating_meaning = "Great"
        }

     

    
    return (
      <ImageBackground source={require('../img/new_map.png')} style={styles.container}>

            <View style= {styles.center}>
                <View style={styles.SquareShapeView}>
                    <Text style={styles.accountText}>Please Rate Your Trip</Text>

                    <View style={styles.childView}>
                        {React_Native_Rating_Bar}
                    </View>



                    <Text style={styles.smallText}>
                        {rating_meaning}
                    </Text>

                    <Text style={styles.LabelText}>Write a Review</Text>
                        <TextInput style = {styles.inputBox}
                            placeholderTextColor="#313233"  
                            multiline={true}
                            onChangeText={review => this.setState({review})}
                                value = {this.state.review}
                        /> 

                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.button}
                        onPress={() => this.postRating()}>
                        <Text style={styles.uploadButton}>Submit</Text>
                    </TouchableOpacity>

                </View>
            </View>

          <View style= {styles.bottom}>
            {
            // Here the ? Question Mark represent the ternary operator.   
                this.state.isLoading ?  
                <ActivityIndicator style={styles.ActivityIndicatorStyle} /> 
                : null
            }
        </View>



      </ImageBackground>
    );
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItems: {
     height: '10%',
     marginBottom: 90,
     flexDirection: 'row',
   },

   inputBox: {
    borderRadius:6,
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#e6e6e7',
    marginTop:3,
    marginLeft:15,
    marginRight:15,
    height:200,
    textAlignVertical: "top"
 
  },

   childView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },

  StarImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },

   ActivityIndicatorStyle:{
    paddingTop:50
  },

  
  LabelText:{
    marginTop:14,
    fontWeight:'bold',
    marginLeft:20
  },

   center: {
     height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:100
  },
  bottom: {
    height: '20%',
  },

  text: {
     marginTop: 25,
     marginLeft: 65,
     fontWeight: '700',
  },

  SquareShapeView: {
    width: 300,
    height: 500,
    backgroundColor: '#fcfcfc',
    borderRadius: 10,
  },

  accountText: {
     fontSize: 18,
     marginRight: 30,
     marginLeft: 30,
     textAlign: 'center',
     marginTop:35
  },

  smallText:{
    fontSize: 15,
    textAlign: 'center',
    marginTop:5,
    marginBottom:10
  },

  button: {
    width: 180,
    borderRadius: 6,
    backgroundColor: '#12213a',
    height:50,
    marginTop:20,
    marginLeft: '20%',
    marginRight: '20%'

  },

  uploadButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    paddingTop:12
  },
});
