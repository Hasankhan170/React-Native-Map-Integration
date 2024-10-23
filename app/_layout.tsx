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
            title: 'overview',
          }}
        />
        <Drawer.Screen
          name="map/[id]"
          options={{
            drawerLabel: 'Map',
            title: 'Map View',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
