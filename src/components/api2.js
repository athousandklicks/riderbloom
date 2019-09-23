import React, {Component} from 'react';
import {StyleSheet,View,AsyncStorage} from 'react-native';

import MyFunctions from '/functions.js';


export default class MyTrip extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource:[]
        };
    }


    tmpArray = [
        { 
        name: "Pankaj", 
        age: 10, 
        class: "M.C.A" 
        },

        { 
        name: "Rita", 
        age: 11, 
        class: "B.C.A" 
        },

        { 
        name: "Mohan", 
        age: 12, 
        class: "M.C.A" 
        },

        { 
        name: "Amit", 
        age: 13, class: "M.C.A" 
        },

        { 
        name: "Babulal", 
        age: 14, 
        class: "B.TECH" 
        },

      ];
    }

    componentDidMount(){
        fetch("http://localhost/share-a-ride/app/public/api/get-titan-trips/${titan_id}")
        .then(response => response.json())
        .then((responseJson)=> {
            var tripOptions = [];

            Object.keys(responseJson).forEach(function(value) {
                //tripOptions.push(<option value={key}>{trips[key]}</option>);

                if(value.status==1){
                    tripOptions.push(
                    '<View> 
                    <View style={styles.firstHalf}> 
                    <Text style={styles.location}>{value.pick_up}</Text> 
                    <Text style={styles.location}>{value.destination}</Text> 
                    </View>  <View style={styles.secondHalf}> 
                    <Text>{value.date}</Text> 
                    <Text style={styles.location}>{value.avg_rating}</Text> 
                    </View> 
                    </View>');
                }else{
                    tripOptions.push('<View> 
                    <View style={styles.firstHalf}> 
                    <Text style={styles.location}>{value.pick_up}</Text> 
                    <Text style={styles.location}>{value.destination}</Text> 
                    </View>  
                    <View style={styles.secondHalf}> 
                    <Text>{value.date}</Text> 
                    <Text style={styles.location}>{value.start_time}</Text> 
                    </View> 
                    </View>');
                }

            });

            this.setState({
                loading: false,
                dataSource: tripOptions
            })
        })
        .catch(error=>console.log(error)) //to catch the errors if any       
    }


    render() {

        if(this.state.loading){
            return(
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0c9"/>
              </View>
          )}

        return (
            <View style={styles.container}>
            <FlatList
                data= {this.state.dataSource}
                ItemSeparatorComponent = {this.FlatListItemSeparator}
                renderItem={item=> this.renderItem(item)}
                keyExtractor={item=>item.id.toString()}
            />
            </View>
        );
    }
}



const styles = StyleSheet.create({

});


private_trip / true or false