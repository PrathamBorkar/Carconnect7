import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const CarListingScreen = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8082/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const renderCarItem = ({ item }) => (
    <View style={styles.carCard}>
      <Image source={{ uri: item.images[0] }} style={styles.carImage} />
      <View style={styles.carInfoContainer}>
        <View style={styles.carInfo}>
          <Text style={styles.carModel}>{item.model}</Text>
          <Text style={styles.carDetails}>{item.mileage} km • {item.transmission}</Text>
          <Text style={styles.carDetails}>{item.fuelType} • {item.ownerNo} owner</Text>
          <Text style={styles.price}>₹{item.askableprice} </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => router.push(`/root/tabs/Buy/cardetail?carId=${item._id}`)}>
  <Text style={styles.buttonText}>GET SELLER DETAILS</Text>
</TouchableOpacity>

        <TouchableOpacity style={styles.heartIcon}>
          <Ionicons name="heart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BUY CARS </Text>
      </View>
      <FlatList
        data={cars}
        renderItem={renderCarItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  listContainer: {
    padding: 16,
  },
  carCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 20,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  carImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  carInfoContainer: {
    marginTop: 10,
  },
  carInfo: {
    marginBottom: 10,
  },
  carModel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  carDetails: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  price: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#6fa6ed',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  heartIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 5,
  },
});

export default CarListingScreen;
