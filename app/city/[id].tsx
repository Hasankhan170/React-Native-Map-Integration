import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

interface SinglePlace {
  latitude: number;
  longitude: number
}

interface AllPlaces {
  fsq_id: string;
  name: string
}

const map = () => {
  const data = [
    { id: '1', name: 'Moto', icon: 'motorcycle' },
    { id: '2', name: 'Ride Mini', icon: 'car' },
    { id: '3', name: 'Ride A/C', icon: 'snowflake-o' },
    { id: '4', name: 'Auto', icon: 'taxi' },
    { id: '5', name: 'City to city', icon: 'road' },
    { id: '6', name: 'Couriers', icon: 'envelope' },
    { id: '7', name: 'Freight', icon: 'truck' },
  ];
  const [icons, setIcons] = useState(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [places, setPlaces] = useState<AllPlaces[] | null>(null);
  const [singlesearchPlace, setsinglesearchPlace] = useState<SinglePlace | null>(null);
  const [region, setRegion] = useState<any>(null);

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
      });
      setAddress(`${geoAddress.name}, ${geoAddress.city}, ${geoAddress.region}, ${geoAddress.country}`);
    })();
  }, []);

  useEffect(() => {
    if (search) {
      searchPlaces();
    }else{
      setPlaces(null);
    }
  }, [search]);

  const handlePress = (id) => {
    setIcons(id === icons ? null : id);
  };

  const searchPlaces = () => {
    if (!search || !location) return;
    const options = {
      method: "GET",
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3qbL9ORBTq2ZaS6TUHxpAQZNDJjTlkT2lBeAynwmhZ8I='
      }
    };

    fetch(`https://api.foursquare.com/v3/places/search?query=${search}&ll=${location.coords.latitude}%2C${location.coords.longitude}&radius=100000`, options)
      .then(res => res.json())
      .then(res => {
        console.log("Places fetched:", res.results);
        setPlaces(res.results);
      })
      .catch(err => console.error(err));
  }

  const handleSelectPlace = (item: any) => {
    setSearch(item.name); 
    setPlaces(null); 
    const selectedPlace = {
      latitude: item.geocodes.main.latitude,
      longitude: item.geocodes.main.longitude
    };
    setsinglesearchPlace(selectedPlace);
    setRegion({
      latitude: selectedPlace.latitude,
      longitude: selectedPlace.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }

  return (
    <View style={styles.container}>
      {location && (
        <MapView style={styles.map} region={region}>
          <Marker coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }} />
          {singlesearchPlace && (
            <Marker
              coordinate={{
                latitude: singlesearchPlace.latitude,
                longitude: singlesearchPlace.longitude,
              }}
            />
          )}
        </MapView>
      )}

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              { backgroundColor: item.id === icons ? '#add8e6' : 'white' }, 
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
        contentContainerStyle={styles.flatlistContent}
        style={styles.flatcontainer}
      />

      {address && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>Current Location: {address}</Text>
        </View>
      )}

      <View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setSearch(text)}
          value={search}
          placeholder="Search"
        />
        {search && places && (
          <FlatList
            data={places}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectPlace(item)}>
                <View style={styles.list}>
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.fsq_id} 
            style={styles.scrolballist}
            scrollEnabled={true}
          />
        )}
      </View>
    </View>
  );
}

export default map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: 'white'
  },
  flatcontainer: {
    flexGrow: 0,
  },
  flatlistContent: {
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  scrolballist :{
    width: 320,
    maxHeight: 200, 
  },
  input: {
    height: 40,
    width: 320,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
  list: {
    backgroundColor: '#f6f5f4',
    padding: 10,
    width: 350 ,
    marginLeft:20,
    marginBottom:5,
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
    borderRadius: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 16,
    color: '#333',
  },
  map: {
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
