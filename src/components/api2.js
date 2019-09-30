<View style={styles.container}>
<FlatList
  data={this.state.dataSource}
  renderItem={({item})=> 

  <View style={styles.rectangleShape}>
   <View style={styles.row}>
        <View style = {styles.firstRow}>
            <View style={styles.info1}>
              <Image
                  source={require('../img/mapmarker-icon.png')}              
              />
            </View>
            <View style={styles.info2}>
              <Text style={styles.mapText}> {item.from} </Text>
            </View>
            <View style={styles.info3}>
              <Text style={styles.mapDate}> {item.trip_date} </Text>
            </View>
        </View>
  
     <View style={styles.secondRow}>
          <View style={styles.info1}>
              <Image
                  source={require('../img/destination.png')}
                  style={styles.map}
              />
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