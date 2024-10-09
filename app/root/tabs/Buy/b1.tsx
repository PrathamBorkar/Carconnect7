import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CarListingScreen = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState(20); // Maximum budget in lakhs
  const navigation = useNavigation();

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
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.images[0] }} style={styles.carImage} />
        <TouchableOpacity style={styles.heartIcon}>
          <Ionicons name="heart-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.price}>₹{item.price} lakhs</Text>
      </View>
      <View style={styles.carInfo}>
        <Text style={styles.carModel}>{item.model}</Text>
        <Text style={styles.carDetails}>{item.mileage}km • {item.transmission}</Text>
        <Text style={styles.carDetails}>{item.fuelType} • {item.ownerNo} owner</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('cardetail', { carId: item._id })}
        >
          <Text style={styles.buttonText}>GET SELLER DETAILS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Find cars</Text>
        <Ionicons name="heart" size={24} color="black" />
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="location-outline" size={24} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Location"
          placeholderTextColor="gray"
        />
        <Ionicons name="search" size={24} color="gray" />
      </View>
      <View style={styles.budgetContainer}>
        <Text style={styles.budgetLabel}>Choose your Budget</Text>
        <View style={styles.budgetSlider}>
          <Text>Any</Text>
          <View style={styles.sliderLine}>
            <View style={[styles.sliderFill, { width: `${(budget / 20) * 100}%` }]} />
          </View>
          <Text>20+ lakhs</Text>
        </View>
      </View>
      <FlatList
        data={cars}
        renderItem={renderCarItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    padding: 8,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
  },
  budgetContainer: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  budgetLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  budgetSlider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderLine: {
    flex: 1,
    height: 4,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  sliderFill: {
    height: 4,
    backgroundColor: 'blue',
  },
  listContainer: {
    padding: 16,
  },
  carCard: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 10,
  },
  carImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  price: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 2,
    paddingHorizontal: 4,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  carInfo: {
    flex: 1,
  },
  carModel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  carDetails: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 2,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  heartIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 2,
  },
});

export default CarListingScreen;