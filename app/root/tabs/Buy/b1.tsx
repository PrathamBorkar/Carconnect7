import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CarListingScreen = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch all cars from the backend
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8082/cars');
        setCars(response.data);  // Assume response.data contains the array of cars
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
      <View style={styles.carInfo}>
        <Text style={styles.carModel}>{item.model}</Text>
        <Text style={styles.carDetails}>{item.price} lakhs</Text>
        <Text style={styles.carDetails}>{item.year}</Text>
        <Text style={styles.carDetails}>Transmission: {item.transmission}</Text>
        <Text style={styles.carDetails}>Fuel Type: {item.fuelType}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BuyCarScreen', { carId: item._id })}
        >
          <Text style={styles.buttonText}>GET SELLER DETAILS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={cars}
      renderItem={renderCarItem}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  carCard: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  carImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  carInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  carModel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  carDetails: {
    fontSize: 14,
    marginVertical: 2,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default CarListingScreen;
