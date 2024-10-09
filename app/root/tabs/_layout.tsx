import * as React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Drawer>
      {/* Drawer navigates between these routes */}
      <Drawer.Screen name="home" options={{ drawerLabel: 'Home', headerShown: false }} />
      <Drawer.Screen name="settings" options={{ drawerLabel: 'Settings' }} />
      <Drawer.Screen name="profile" options={{ drawerLabel: 'Profile' }} />
      <Drawer.Screen name="RentCar" options={{ drawerLabel: 'Rent Car' }} />
      <Drawer.Screen name="Service" options={{ drawerLabel: 'Service' }} />
      <Drawer.Screen name="b1" options={{ drawerLabel: 'Buy Car' }} />
    </Drawer>
  );
};

export default Layout;
