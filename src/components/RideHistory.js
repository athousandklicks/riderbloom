/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View, 
  Image,
  TextInput, 
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

import { connect } from 'react-redux';
import { getRideHistoryAll} from '../store/actions';
import { bindActionCreators } from 'redux';

import AsyncStorage from '@react-native-community/async-storage';

import { Icon } from 'react-native-elements';

export default class RideHistory extends Component {

  constructor(props){
    super(props)

    this.state = {
         pickUp: '',
         destination: '',
         pickup_time:'',
         pickup_date:'',
         trip_id:'',
         user_Id: null,
         dataSource:[],
         loading: true,
         Default_Rating: 3,
         Max_Rating: 5,
      }

      this.Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
      this.Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
      
    }

    UpdateRating(key) {
      this.setState({ Default_Rating: key});
  }

    async componentDidMount() {
 
      try {
          const userId = await AsyncStorage.getItem('user_id');
          console.log('USER ID FROM ASYNC: ', userId);

        
         return fetch(`http://104.248.254.71/app/public/api/trip-history?user_id=${userId}`)
          //return fetch(`http://104.248.254.71/app/public/api/trip-history?user_id=1`)
         .then ((res) => res.json())
         .then(response => {
             if(response.status == true){
  
                  if(response.status == true){
                    console.log('RIDE HISTORY STATUS: ' + response.status);

                    let rider_trips = [];
                    rider_trips = response.trips;
                        
                    this.setState({ 
                      dataSource: rider_trips,
                        loading: false,
                      });

                  }else{
                    console.log('RESPONSE: ' + response.trips.status);
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

  
  // componentDidMount = async () => {
  //   try {
  //     const userId = await AsyncStorage.getItem('user_id');
  //     this.setState({ 
  //       user_Id: userId,
  //     });
  //     this.props.getRideHistoryAll(this.state.user_Id);
  //     this.props.getRideHistoryAll(1);
  //   } catch (e) {
  //     this.props.navigation.navigate('Auth');
  //   }
  // }

  static navigationOptions = {
    drawerLabel: 'Trip History',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./compass.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  // render(){
  //   return (
  //        <View style={styles.rectangleShape}>

  //         {
  //           this.state.dataSource.map((item, key) => (

  //          <View style={styles.row}>
  //               <View style = {styles.firstRow}>
  //                   <View style={styles.info1}>
  //                     <Image
  //                         source={require('../img/mapmarker-icon.png')}              
  //                     />
  //                   </View>
  //                   <View style={styles.info2}>
  //                     <Text style={styles.mapText}> {item.from} </Text>
  //                   </View>
  //                   <View style={styles.info3}>
  //                     <Text style={styles.mapDate}> {item.trip_date} </Text>
  //                   </View>
  //               </View>
          
  //            <View style={styles.secondRow}>
  //                 <View style={styles.info1}>
  //                     <Image
  //                         source={require('../img/destination.png')}
  //                         style={styles.map}
  //                     />
  //                 </View>
  //                 <View style={styles.info2}>
  //                     <Text style={styles.mapText}> {item.destination}  </Text>
  //                 </View>
  //                 <View style={styles.info3}>
  //                     <Text style={styles.mapDate}>{item.start_time}  </Text>
  //                 </View>
  //            </View>
  //          </View>
  //           ))
  //         }
  //         </View>
  //   );
  // }

  render() {

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

    
    return(
    <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item})=> 

          <View style={styles.rectangleShape}>
           <View style={styles.row}>
                <View style = {styles.firstRow}>
                    <View style={styles.info1}>
                    <Icon name='person-pin' size={20} color="#808080" />
                      {/* <Image
                          source={require('../img/mapmarker-icon.png')}              
                      /> */}
                    </View>
                    <View style={styles.info2}>
                      <Text style={styles.mapText}> {item.from} </Text>
                    </View>
                    <View style={styles.info3}>
                      <Text style={styles.mapDate}> 
                      {item.trip_date} | 
                      {item.start_time.toString().slice(0,5)} </Text>
                    </View>
                </View>
          
             <View style={styles.secondRow}>
                  <View style={styles.info1}>
                  <Icon name='near-me' size={20} color="#73acf9" />
                      {/* <Image
                          source={require('../img/destination.png')}
                          style={styles.map}
                      /> */}
                  </View>
                  <View style={styles.info2}>
                      <Text style={styles.mapText}> {item.destination}  </Text>
                  </View>
                  <View style={styles.info3}>
                      <Text style={styles.mapDate}>{item.start_time}  </Text>
                  </View>
             </View>
           </View>

          </View>
          }
          keyExtractor={item=>item.id.toString()}
        />
    </View>
    );
        }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfe2ee',
    alignSelf: 'stretch'
  },
  top: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    marginTop: 20,
    color: 'black',
    fontSize: 17,
  },
  rectangleShape: {
  marginLeft: 10,
  marginRight: 10,
  marginTop: 10,
  paddingBottom:5,
  paddingTop:5,
  backgroundColor: '#ffffff',
  borderRadius: 6,
  alignItems: 'center',
  justifyContent: 'center',
},

row: {
  alignItems: 'center',
  justifyContent: 'center',
  
},

firstRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  
},

secondRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},

info1: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
},

info2: {
  flex: 4,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft:1
},

info3: {
  flex: 5,
  paddingTop: 10,
  paddingBottom: 10,
  alignItems: 'flex-end',
  paddingRight:10,

},

imagemap: {
  marginTop: 5,

  width: 20,
  height: 25,
},


map: {
  marginTop: 5,

  width: 20,
  height: 25,
},
mapText:{
  color: 'black',
  // marginLeft: 10,
  // marginTop: 8,
  // fontSize: 15,
  // fontWeight: '400'
},

mapDate: {
  color: 'black',
  // marginTop: 10,
  // fontSize: 15
},
star: {
 marginTop: 10,
 marginLeft: 10
},
column: {
  flexDirection: 'column'
},
destination:{
  height: 25,
  width: 25,
  marginLeft:15,
  marginTop: 15
},
destText: {
  color: 'black',
  marginLeft: 17,
  marginTop: 18,
  fontSize: 15,
  fontWeight: '400'
}
});

