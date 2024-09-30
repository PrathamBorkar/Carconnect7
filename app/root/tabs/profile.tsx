import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons

const profile = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="arrow-left" size={24} color="black" />
        <FontAwesome name="edit" size={24} color="black" />
      </View>

      {/* Profile Section */}
      <View style={styles.profile}>
        <Image
          style={styles.profileImage}
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc_bkm4G3VJ7HnDZr-LHhVsu-zWc0bbz9EVg&s',
          }}
        />
        <Text style={styles.profileName}>Pratham</Text>
        <Text style={styles.profileDetails}>9370063183</Text>
        <Text style={styles.profileDetails}>PLemmwe@gmail.com</Text>
      </View>

      {/* Menu Section */}
      <View style={styles.menu}>
        <MenuItem icon="chart-line" label="My Activity" />
        <MenuItem icon="car" label="Shortlisted vehicle" />
        <MenuItem icon="question-circle" label="Question and answer" />
        <MenuItem icon="car-side" label="My vehicles" />
        <MenuItem icon="cog" label="Profile settings" />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// MenuItem component for reusability
const MenuItem = ({ icon, label }) => {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <FontAwesome name={icon} size={24} color="#666" />
        <Text style={styles.menuItemText}>{label}</Text>
      </View>
      <FontAwesome name="chevron-right" size={24} color="#666" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#d3c4f3',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile: {
    alignItems: 'center',
    backgroundColor: '#e6e6fa',
    paddingVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 18,
    marginVertical: 10,
  },
  profileDetails: {
    fontSize: 14,
    color: '#666',
  },
  menu: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Use shadow for iOS, elevation for Android
    elevation: 4, // For Android shadow
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#d3c4f3',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 50,
    marginVertical: 20,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#000',
  },
});

export default profile;
