import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const router = useRouter();

const CarDetailScreen = () => {
  const { carId } = useLocalSearchParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/cars/${carId}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
        setError('Failed to load car details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (carId) {
      fetchCarDetail();
    }
  }, [carId]);

  const handleContactSeller = () => {
    if (car && car.owner && car.owner.phoneNumber) {
      const phoneNumber = car.owner.phoneNumber;
      const url = `tel:${phoneNumber}`;
      Linking.openURL(url).catch((err) =>
        console.error('Failed to open dialer:', err)
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="red" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!car) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="red" />
        <Text style={styles.errorText}>Car details not available.</Text>
      </View>
    );
  }

  const renderImage = () => {
    if (car.images && Array.isArray(car.images) && car.images.length > 0) {
      return <Image source={{ uri: car.images[0] }} style={styles.image} />;
    } else if (typeof car.images === 'string') {
      return <Image source={{ uri: car.images }} style={styles.image} />;
    } else {
      return (
        <View style={[styles.image, styles.placeholderImage]}>
          <Ionicons name="car-outline" size={100} color="#cccccc" />
          <Text style={styles.placeholderText}>No image available</Text>
        </View>
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {renderImage()}
      <View style={styles.content}>
        <Text style={styles.title}>{car.model} . {car.year}</Text>
        <View style={styles.infoRow}>
          <Ionicons name="car-sport-outline" size={20} color="#007bff" />
          <Text style={styles.infoText}>{car.transmission || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="pricetag-outline" size={20} color="#007bff" />
          <Text style={styles.price}>₹{car.askableprice || 'N/A'} lakhs</Text>
        </View>

        <View style={styles.infrow}>
          <View style={styles.infItem}>
            <Ionicons name="calendar" size={20} color="Black" />
            <Text>{car.year}</Text>
          </View>
          <View style={styles.infItem}>
            <Ionicons name="speedometer" size={20} color="Black" />
            <Text>{car.km}</Text>
          </View>
          <View style={styles.infItem}>
            <Ionicons name="water-outline" size={20} color="Black" />
            <Text>{car.fuelType}</Text>
          </View>
          <View style={styles.infItem}>
            <Ionicons name="settings" size={20} color="Black" />
            <Text>{car.transmission}</Text>
          </View>
          <View style={styles.infItem}>
            <Ionicons name="location" size={20} color="Black" />
            <Text>Margao</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.makeOfferButton}>
          <Text style={styles.makeOfferText}>Make Offer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.calculateEmiButton} onPress={() => router.push("/root/tabs/EMI_Calculator")}>
          <Ionicons name="calculator-outline" size={20} color="#007bff" />
          <Text style={styles.calculateEmiText}>Calculate EMI</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specifications and Features</Text>
          <View style={styles.specificationsContainer}>
            <View style={styles.specRow}>
              <Ionicons name="checkmark-done" size={16} color="Black" />
              <Text style={styles.specTitle}>Engine</Text>
              <Text style={styles.specValue}>1462 cc</Text>
            </View>
            <View style={styles.specRow}>
              <Ionicons name="checkmark-done" size={16} color="Black" />
              <Text style={styles.specTitle}>Power</Text>
              <Text style={styles.specValue}>103.26 bhp</Text>
            </View>
            <View style={styles.specRow}>
              <Ionicons name="checkmark-done" size={16} color="Black" />
              <Text style={styles.specTitle}>Mileage</Text>
              <Text style={styles.specValue}>16 kmpl</Text>
            </View>
            <View style={styles.specRow}>
              <Ionicons name="checkmark-done" size={16} color="Black" />
              <Text style={styles.specTitle}>Seating Capacity</Text>
              <Text style={styles.specValue}>{car.seats}</Text>
            </View>
            <View style={styles.specRow}>
              <Ionicons name="checkmark-done" size={16} color="Black" />
              <Text style={styles.specTitle}>No. of Owners</Text>
              <Text style={styles.specValue}>{car.ownerNo}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.specTitle}>Owner: {car.owner.ownerName}</Text>
        <TouchableOpacity style={styles.contactSellerButton} onPress={handleContactSeller}>
          <Ionicons name="call-outline" size={24} color="#fff" />
          <Text style={styles.contactSellerText}>Contact Seller</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 13,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#007bff',
  },
  makeOfferButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 15,
  },
  makeOfferText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  calculateEmiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  calculateEmiText: {
    fontSize: 16,
    color: '#007bff',
    marginLeft: 10,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  specificationsContainer: {
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    padding: 15,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  specTitle: {
    fontWeight: 'bold',
  },
  specValue: {
    color: 'black',
  },
  infrow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e9e1f2',
    padding: 10,
  },
  infItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  contactSellerButton: {
    backgroundColor: '#007bff',
    padding: 15,
    alignItems: 'center',
    flex: 'center',
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contactSellerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholderText: {
    fontSize: 16,
    color: '#cccccc',
    marginTop: 10,
  },
});

export default CarDetailScreen;
