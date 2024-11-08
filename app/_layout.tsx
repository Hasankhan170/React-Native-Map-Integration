

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"  
          options={{
            drawerLabel: 'Home',
            title: 'Overview',
          }}
        />
        <Drawer.Screen
          name="map/[id]"  
          options={{
            drawerLabel: 'Map',
            title: 'Map View',
          }}
        />
         <Drawer.Screen
          name="profile/[id]"  
          options={{
            drawerLabel: 'profile',
            title: 'Profile',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
