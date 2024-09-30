import * as React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Drawer>
      {/* Drawer navigates between these routes */}
      <Drawer.Screen name="home" options={{ drawerLabel: 'Home', headerShown: false }} />
      <Drawer.Screen name="settings" options={{ drawerLabel: 'Settings' }} />
    </Drawer>
  );
};

export default Layout;
