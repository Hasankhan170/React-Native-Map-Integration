import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Image,View, Linking, StyleSheet, Text} from 'react-native';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { auth } from '@/config/config';


export default function Layout() {
  
  const [Login,setLoign] = useState(false)

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user=>{
      setLoign(!!user)
    })
    return unsubscribe;
  },[])


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
      <Drawer.Screen
  name="profile/[id]"
  options={{
    drawerLabel: 'Profile',
    title: 'Profile',
    drawerIcon: () => (
      <Image
        source={{
          uri: 'data:image/png;base64,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', 
        }}
        style={{ width: 60, height: 60, borderRadius: 50 }} 
      />
    ),
    drawerLabelStyle: {
      marginLeft: -30,
    }
  }}
/>
        <Drawer.Screen
          name="city/[id]"
          options={{
            drawerLabel: 'City',
            title: 'City View',
          }}
        />

        <Drawer.Screen
          name="request/[id]"
          options={{
            drawerLabel: 'Request history',
            title: 'Request',
          }}
        />
        <Drawer.Screen
          name="couriers/[id]"
          options={{
            drawerLabel: 'Couriers',
            title: 'Couriers',
          }}
        />
        <Drawer.Screen
          name="citytocity/[id]"
          options={{
            drawerLabel: 'City to City',
            title: 'City to City',
          }}
        />
        <Drawer.Screen
          name="freight/[id]"
          options={{
            drawerLabel: 'Freight',
            title: 'Freight',
          }}
        />
        <Drawer.Screen
          name="safety/[id]"
          options={{
            drawerLabel: 'Safety',
            title: 'Safety',
          }}
        />
        <Drawer.Screen
          name="setting/[id]"
          options={{
            drawerLabel: 'Setting',
            title: 'Setting',
          }}
        />

        <Drawer.Screen
          name="help/[id]"
          options={{
            drawerLabel: 'Help',
            title: 'Help',
          }}
        />  
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Overview',
          }}
        />
        <Drawer.Screen
          name="login"
          options={{
            drawerLabel: 'login',
            title: 'Login',
          }}
        />
         <Drawer.Screen
          name="driver/[id]"
          options={{
            drawerLabel: () => (
              <View>
                <Link href={'https://react-in-driver.vercel.app'} style={styles.button}>  
                <Text style={styles.buttonText}>Driver Mode</Text>
              </Link>
              </View>
            ),
            title: 'Driver',
          }}
        />
       
      </Drawer>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    backgroundColor: '#b8fc03',
    borderRadius: 5,
    textAlign:'center'
    
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign:'center'
  },

});
