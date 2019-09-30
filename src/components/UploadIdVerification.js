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
  ActivityIndicator
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

import { Icon } from 'react-native-elements';


export default class UploadIdVerification extends Component{

  state ={
    avatar : null,
    upload_file : {},
    userId:'',
    isLoading: false,
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

// getDetails = async () => {
//   try {
//     const userId = await AsyncStorage.getItem('user_id');
//     console.log('UploadIdVerification.js User ID:' + userId);
//     this.setState({ 
//       userId: userId,
//     });

//   } catch (e) {
//    // this.props.navigation.navigate('Auth');
//   }
// }



  componentDidMount(){
    const { navigation } = this.props;
            const user_Id = navigation.getParam('userId', 'NO-ID');
            this.setState({ 
              userId: user_Id, 
           });
    // this.getDetails();
    }

  addAvatar = () => {
    ImagePicker.showImagePicker({}, response=>{
      if (response.didCancel) {
       console.warn('Action Cancelled')
     }else if (response.error) {
       console.warn(response.error)
      }
      else{
        this.setState({
          avatar:response.uri,
          upload_file: response
        })
      }
      console.log(response);
    })
  }

  setIsIdCardVerified = async () => {
    try {
        await AsyncStorage.setItem('idCardVerified', '1' );
        console.log('ID Card verified successfull');
    } catch (e) {
    }
  }

  _handlePress = () => {
    this.ShowHideActivityIndicator();
const body = new FormData();

body.append('user_id', this.state.userId);
body.append('document_title','id_card');
body.append('upload_file',{
  uri:this.state.avatar,
  type:this.state.upload_file.type,
  name:this.state.upload_file.fileName,
});

console.log(body);

//var url = 'https://example.com/profile';
var url = 'http://104.248.254.71/app/public/api/upload';

fetch(url, {
method: 'POST', // or 'PUT'
body: body, // data can be `string` or {object}!

}).then(res => res.json())
.then(response => {

  console.log(response);

  if(response.status == true){
    this.ShowHideActivityIndicator();
    this.setIsIdCardVerified();
     this.props.navigation.navigate('UploadSelfieVerification', {userId: this.state.user_id});
     console.log(response.message);
     console.log(response.status)
  }else{
    this.ShowHideActivityIndicator();
    console.log(response.status);
      console.log(response);
  }
})
.catch(error => console.error('Error', error));
this.ShowHideActivityIndicator();
}


   static navigationOptions = { header: null, };
  render(){
    return (
      <ImageBackground source={require('../img/new_map.png')} style={styles.container}>
      <View style={styles.menuItems}>

            
        </View>
        <View style= {styles.center}>
            <View style={styles.SquareShapeView}>

            

              <TouchableOpacity onPress={()=> this.addAvatar()}>
                <Image
                source={{uri:this.state.avatar}}
                style={styles.boy}
                />
                </TouchableOpacity>

                {
                  this.state.avatar !== null 
                  ?
                  <Text style={styles.accountText}>Please click on the button below to Upload 
                  your Identity Card Image</Text>
                  :
                  <Text style={styles.accountText}>Please tap on the Icon below to add 
                  an Identity Card Image</Text>
                }

                {
                  this.state.avatar !== null 
                  ? 
                  <TouchableOpacity style ={styles.button2} 
                  onPress={() => this._handlePress()}>
                    <Icon name='cloud-upload' size={65} color="#232a46" />
                    <Text style= {styles.smallText}> Upload photo </Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style ={styles.button2} 
                    onPress={() => this.addAvatar()}>
                  <Icon name='add-a-photo' size={65} color="#232a46" />
                  <Text style={styles.smallText}>Add a photo</Text>
                </TouchableOpacity>
                
                }
            </View>
          </View>

          <View style= {styles.bottom}>
          {
          // Here the ? Question Mark represent the ternary operator.   
        this.state.isLoading ?  <ActivityIndicator style={styles.ActivityIndicatorStyle} /> : null
      }
              </View>



      </ImageBackground>
    );
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

   ActivityIndicatorStyle:{
    paddingTop:50
  },

   menu : {
     height: 20,
     marginRight: 300,
   },
   center: {
     height: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    height: '20%',
  },
  rectangle: {
    marginTop: 10,
    marginBottom: 40,
    width: 310,
    height: 140,
    backgroundColor: '#eaebed',
    borderRadius: 10,
    flexDirection: 'row',
  },
  text: {
     marginTop: 25,
     marginLeft: 65,
     fontWeight: '700',
  },
  Destination: {
    fontWeight: '900',
    marginTop: 10,
    color: 'black'
  },
  bold: {
    color: 'blue',
  },
  pending:{
    color: 'grey',
  },
  SquareShapeView: {
    width: 300,
    height: 400,
    backgroundColor: '#fcfcfc',
    borderRadius: 10,
  },
  boy:{
    width: 180,
    height: 100,
    marginTop: 40,
    marginLeft: 60,
  },
  accountText: {
     fontSize: 20,
     marginRight: 30,
     marginLeft: 30,
     marginTop: 10,
     textAlign: 'center'
  },

  smallText:{
    fontSize: 10,
    textAlign: 'center'
  },

  button: {
    width: 120,
    borderRadius: 25,
    backgroundColor: '#12213a',
    marginVertical: 30,
    paddingVertical: 10,
    marginLeft: 90
  },

  button2: {
    marginTop: 40,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center'
  },
  uploadButton: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
  },
});
