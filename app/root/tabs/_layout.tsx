import * as React from 'react';
import { Drawer } from 'expo-router/drawer';

const Layout = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Home',
          headerShown: false,
          title: 'Home'
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          title: 'Settings'
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'Profile',
          title: 'Profile'
        }}
      />
      <Drawer.Screen
        name="rent"
        options={{
          drawerLabel: 'Rent Car',
          title: 'Rent Car'
        }}
      />
      <Drawer.Screen
        name="service"
        options={{
          drawerLabel: 'Service',
          title: 'Service'
        }}
      />
      <Drawer.Screen
        name="buy"
        options={{
          drawerLabel: 'Buy Car',
          title: 'Buy Car'
        }}
      />
      <Drawer.Screen
      name="EMI_Calculator"
      options={{draweLable:'Buy Car'}}/>
    </Drawer>
  );
};

export default Layout;