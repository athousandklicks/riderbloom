/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground, 
  Image, 
  TouchableOpacity
} from 'react-native';
import ImagePicker from 'react-native-image-picker';


export default class UploadSelfieVerification extends Component {

  state ={
    avatar : '',
    upload_file: {}
  }

  addAvatar = () => {
    ImagePicker.launchCamera({}, response=>{
      if (response.didCancel) {
       console.warn('Dont Do That')
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

  _handlePress = () => {

const body = new FormData();

body.append('user_id',1);
body.append('document_title','photo');
body.append('upload_file',{
  uri:this.state.avatar,
  type:this.state.upload_file.type,
  name:this.state.upload_file.fileName,
});

console.log(body);

var url = 'http://104.248.254.71/app/public/api/upload'

fetch(url, {
method: 'POST', // or 'PUT'
body: body, // data can be `string` or {object}!

}).then(res => res.json())
.then(response => {

  console.log(response);

  this.props.navigation.navigate('VerifiedThree');

  if(response.status == true){

     console.log(response.message);
     console.log(response.status)
    // this.props.navigation.navigate('InterDetails');
  }else{
    console.log(response.status);
      console.log(response);
  }
})
.catch(error => console.error('Error', error));
}


  static navigationOptions = { header: null, };
  render(){
    return (
      <ImageBackground source={require('../img/map.jpg')} style={styles.container}>
      <View style={styles.menuItems}>
            <Image
             source={require('../img/menu.png')}
            style={styles.menu}
            />
            <Image
             source={require('../img/bell.png')}
            style={styles.bell}
            />
        </View>
        <View style= {styles.center}>
            <View style={styles.SquareShapeView}>

              <TouchableOpacity onPress={()=> this.addAvatar()}>
                <Image
                 source={{uri:this.state.avatar}}
                style={styles.boy}
                />
                </TouchableOpacity>

                  <Text style={styles.firstText}>And finally...</Text>

                <Text style={styles.accountText}>Please take a selfie and
                dont forget too smile</Text>

                <TouchableOpacity style ={styles.button} onPress={() => this._handlePress()} >
                  <Text style= {styles.buttonText}> Upload Selfie </Text>
                </TouchableOpacity>

            </View>
          </View>

          <View style= {styles.bottom}>

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
    height: 350,
    backgroundColor: '#fcfcfc',
    borderRadius: 10,
  },
  boy:{
    width: 80,
    height: 80,
    marginTop: 40,
    marginLeft: 100
  },
  accountText: {
     fontSize: 15,
     marginRight: 30,
     marginLeft: 55,
     marginTop: 20
  },
  firstText: {
    fontSize: 18,
    marginRight: 30,
    marginLeft: 90,
    marginTop: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  button: {
    width: 120,
    borderRadius: 25,
    backgroundColor: '#12213a',
    marginVertical: 30,
    paddingVertical: 10,
    marginLeft: 90
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center'
  },
});
