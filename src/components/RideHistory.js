/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View, 
  Image,
  TextInput, 
  TouchableOpacity
} from 'react-native';


export default class RideHistory extends Component {

  static navigationOptions = {
    drawerLabel: 'Trip History',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./compass.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
         <View style={styles.top}>
            <Text style={styles.titleText}> Ride History </Text>
         </View>

         <View style={styles.rectangleShape}>

         <View  style={styles.row}>
         <Image
             source={require('../img/mapmarker-icon.png')}
             style={styles.map}
         />
         <Text style={styles.mapText}> Misau Crescent </Text>

         <View style={styles.column}>
         <Text style={styles.mapDate}> 01 May 2019 </Text>

         <Image
             source={require('../img/star.png')}
             style={styles.star}
         />
          </View>
         </View>

         <View style={styles.row}>
         <Image
             source={require('../img/destination.png')}
             style={styles.destination}
         />
         <Text style={styles.destText}>Destination</Text>
         </View>
        </View>

        <View style={styles.rectangleShape}>

        <View  style={styles.row}>
        <Image
            source={require('../img/mapmarker-icon.png')}
            style={styles.map}
        />
        <Text style={styles.mapText}> Misau Crescent </Text>

        <View style={styles.column}>
        <Text style={styles.mapDate}> 01 May 2019 </Text>

        <Image
            source={require('../img/star.png')}
            style={styles.star}
        />
         </View>
        </View>

        <View style={styles.row}>
        <Image
            source={require('../img/destination.png')}
            style={styles.destination}
        />
        <Text style={styles.destText}>Destination</Text>
        </View>
       </View>

       <View style={styles.rectangleShape}>

       <View  style={styles.row}>
       <Image
           source={require('../img/mapmarker-icon.png')}
           style={styles.map}
       />
       <Text style={styles.mapText}> Misau Crescent </Text>

       <View style={styles.column}>
       <Text style={styles.mapDate}> 01 May 2019 </Text>

       <Image
           source={require('../img/star.png')}
           style={styles.star}
       />
        </View>
       </View>

       <View style={styles.row}>
       <Image
           source={require('../img/destination.png')}
           style={styles.destination}
       />
       <Text style={styles.destText}>Destination</Text>
       </View>
      </View>

      <View style={styles.rectangleShape}>

      <View  style={styles.row}>
      <Image
          source={require('../img/mapmarker-icon.png')}
          style={styles.map}
      />
      <Text style={styles.mapText}> Misau Crescent </Text>

      <View style={styles.column}>
      <Text style={styles.mapDate}> 01 May 2019 </Text>

      <Image
          source={require('../img/star.png')}
          style={styles.star}
      />
       </View>
      </View>

      <View style={styles.row}>
      <Image
          source={require('../img/destination.png')}
          style={styles.destination}
      />
      <Text style={styles.destText}>Destination</Text>
      </View>
     </View>

     <View style={styles.rectangleShape}>

     <View  style={styles.row}>
     <Image
         source={require('../img/mapmarker-icon.png')}
         style={styles.map}
     />
     <Text style={styles.mapText}> Misau Crescent </Text>

     <View style={styles.column}>
     <Text style={styles.mapDate}> 01 May 2019 </Text>

     <Image
         source={require('../img/star.png')}
         style={styles.star}
     />
      </View>
     </View>

     <View style={styles.row}>
     <Image
         source={require('../img/destination.png')}
         style={styles.destination}
     />
     <Text style={styles.destText}>Destination</Text>
     </View>
    </View>

    <View style={styles.rectangleShape}>

    <View  style={styles.row}>
    <Image
        source={require('../img/mapmarker-icon.png')}
        style={styles.map}
    />
    <Text style={styles.mapText}> Misau Crescent </Text>

    <View style={styles.column}>
    <Text style={styles.mapDate}> 01 May 2019 </Text>

    <Image
        source={require('../img/star.png')}
        style={styles.star}
    />
     </View>
    </View>

    <View style={styles.row}>
    <Image
        source={require('../img/destination.png')}
        style={styles.destination}
    />
    <Text style={styles.destText}>Destination</Text>
    </View>
   </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor:'#e0e0e0'
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
 marginLeft: 35,
 marginTop: 20,
 width: 180 * 2,
 height: 130,
 backgroundColor: '#ffffff',
 borderRadius: 10
},
map: {
  marginTop: 20,
  marginLeft: 20
},
mapText:{
  color: 'black',
  marginLeft: 20,
  marginTop: 18,
  fontSize: 15,
  fontWeight: '400'
},
row: {
  flexDirection: 'row'
},
mapDate: {
  color: 'black',
  marginLeft: 80,
  marginTop: 18,
  fontSize: 15
},
star: {
 marginTop: 10,
 marginLeft: 80
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
