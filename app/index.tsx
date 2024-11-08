import { useState, useEffect, SetStateAction } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function index() {

  const data = [
    { id: '1', name: 'Moto', icon: 'motorcycle' },
    { id: '2', name: 'Ride Mini', icon: 'car' },
    { id: '3', name: 'Ride A/C', icon: 'snowflake-o' },
    { id: '4', name: 'Auto', icon: 'taxi' },
    { id: '5', name: 'City to city', icon: 'road' },
    { id: '6', name: 'Couriers', icon: 'envelope' },
    { id: '7', name: 'Freight', icon: 'truck' },
  ];
  const [icons,setIcons] = useState(null)
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [address,setAddress] = useState(null)

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const [geoAddress] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
      setAddress(`${geoAddress.name}, ${geoAddress.city}, ${geoAddress.region}, ${geoAddress.country}`);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  const handlePress = (id) => {
    setIcons(id === icons ? null : id); 
  };

  return (
    <View style={styles.container}>
      {
        location && <MapView style={styles.map} initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0001,
          longitudeDelta: 0.0001,
        }}>
          <Marker coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}/>
        </MapView>
      }

<View style={styles.container}>
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={[
          styles.item,
          { backgroundColor: item.id === icons ? '#add8e6' : 'white' }, // Light blue background if selected
        ]}
        onPress={() => handlePress(item.id)}
      >
     <View>
  <View style={styles.iconContainer}>
    <Icon name={item.icon} size={24} style={styles.icon} />
    {item.id === icons && (
      <Icon name="exclamation-circle" size={24} style={styles.errorIcon} />
    )}
  </View>
  <View>
    <Text style={styles.itemText}>{item.name}</Text>
  </View>
     </View>

       
      </TouchableOpacity>
    )}
    keyExtractor={(item) => item.id}
    horizontal={true}
    showsHorizontalScrollIndicator={true}
    contentContainerStyle={styles.flatlistContent} // Use this to add padding/margin
    style={styles.flatcontainer}
  />
  
  {address && (
    <View style={styles.addressContainer}>
      <Text style={styles.addressText}>Current Location: {address}</Text>
    </View>
  )}
</View>

   

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  flatcontainer: {
    flexGrow: 0,
  },
  flatlistContent: {
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
  addressContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 16,
    color: '#333',
  },
  map:{
    height: '50%',
    width: '100%',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  icon: {
    color: '#000',
  },
  errorIcon: {
    marginLeft: 20, 
    
    color: 'blue',
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  
});