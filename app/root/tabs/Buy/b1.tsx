import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function BuyCar() {
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState([0, 20]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Find Cars</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter Your Location"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      {/* Budget Slider */}
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderText}>Choose your Budget</Text>
        {/* Placeholder for a real slider */}
        <View style={styles.sliderPlaceholder}>
          <Text>Any</Text>
          <Text>20+ Lakhs</Text>
        </View>
      </View>

      {/* Car List */}
      <ScrollView style={styles.scrollView}>
        {/* Car Card */}
        <TouchableOpacity style={styles.card}>
          <Image
           // source={require('./path-to-image.jpg')} // Replace with actual image path
            style={styles.carImage}
          />
          <View style={styles.carDetails}>
            <Text style={styles.carName}>Hundai Creta</Text>
            <Text style={styles.carSpecs}>20000km • Manual • Petrol • 1st Owner</Text>
            <Text style={styles.carPrice}>₹10.6 Lakhs</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>GET SELLER DETAILS</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Repeat similar cards for other cars */}
        <TouchableOpacity style={styles.card}>
          <Image
            //source={require('./path-to-image2.jpg')} // Replace with actual image path
            style={styles.carImage}
          />
          <View style={styles.carDetails}>
            <Text style={styles.carName}>KIA Celtos</Text>
            <Text style={styles.carSpecs}>45000km • Automatic • Petrol • 1st Owner</Text>
            <Text style={styles.carPrice}>₹22 Lakhs</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>GET SELLER DETAILS</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Another car */}
        <TouchableOpacity style={styles.card}>
          <Image
            //source={require('./path-to-image3.jpg')} // Replace with actual image path
            style={styles.carImage}
          />
          <View style={styles.carDetails}>
            <Text style={styles.carName}>Mahindra Thar</Text>
            <Text style={styles.carSpecs}>20000km • Manual • Petrol • 1st Owner</Text>
            <Text style={styles.carPrice}>₹15.9 Lakhs</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>GET SELLER DETAILS</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#e8e8e8',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  sliderContainer: {
    padding: 20,
  },
  sliderText: {
    fontSize: 16,
    marginBottom: 10,
  },
  sliderPlaceholder: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  scrollView: {
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  carImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  carDetails: {
    marginTop: 10,
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  carSpecs: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  carPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
