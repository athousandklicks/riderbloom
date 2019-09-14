/* eslint-disable prettier/prettier */
import React, {Component}  from 'react';
import { 
    View, 
    Text, 
    BackHandler,
    ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Splash extends Component {




   componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
  //  ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
}


  async componentDidMount() {

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    try {
        const userId = await AsyncStorage.getItem('user_id');
        console.log('USER ID FROM ASYNC: ', userId);
        
        return fetch(`http://104.248.254.71/app/public/api/get-active-trip?user_id=${userId}`)
       .then ((res) => res.json())
       .then(response => {
           if(response.status == true){

                if(response.response.request_details.status == 2){
                  console.log('ACCEPTED TRIP: ' + response.request_details.status);
                this.props.navigation.navigate('TripDetails', {tripId: response.trip_details.id});
                }else{
                  console.log('RESPONSE: ' + response.trip_details.id);
                this.props.navigation.navigate('TripDetails', {tripId: response.trip_details.id});
                }

           }else{
            this.props.navigation.navigate('Landing');
           }
       }).catch((error) => {
        console.log(error);
       })

      } catch (e) {
        this.props.navigation.navigate('Auth');
      }
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Text style={styles.textStyles}>
          Bloom Riders
        </Text>
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  }
}

