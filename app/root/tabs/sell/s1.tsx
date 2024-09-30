import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import OwnerInfoForm  from './userd';
import VehicleDetailsForm from './s2';

export default function Sell() {
    const router = useRouter();

    return (
        <ScrollView>
            {/* Background Image */}
            <ImageBackground
                source={require('../../../assets/images/back.png')} // Add actual image path here
                style={styles.backimage}
            >
                {/* Header Section */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.backArrow}>←</Text>
                    </TouchableOpacity>
                </View>

                {/* Banner Text */}
                <View style={styles.banner}>
                    <Text style={styles.bannerText}>
                        Turn keys into cars{'\n'}Sell your car at best price
                    </Text>
                </View>
            </ImageBackground>

            {/* Car Registration Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Enter your car registration</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Reg.no.(GA 08 E 0171)"
                />
            </View>

            {/* Select Brand Button */}
            <TouchableOpacity style={styles.selectBrandButton}>
                <Text style={styles.buttonText}>Select your brand</Text>
            </TouchableOpacity>

            {/* Brand Logos */}
            <View style={styles.brandContainer}>
                {['Hyundai', 'Renault', 'Honda', 'Volkswagen', 'Mahindra', 'Maruti'].map((brand, index) => (
                    <View key={index} style={styles.brandItem}>
                        <Image
                            source={{ uri: `https://example.com/${brand.toLowerCase()}-logo.png` }} // Replace with actual logo path or URL
                            style={styles.brandLogo}
                        />
                        <Text>{brand}</Text>
                    </View>
                ))}
            </View>

           <VehicleDetailsForm/>
           
            
            <OwnerInfoForm/>

            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>submit</Text>

            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    backimage: {
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        padding: 15,
        alignSelf: 'flex-start',
    },
    backArrow: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    banner: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    bannerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#252F40',
        marginLeft: 4,
        marginBottom: 2,
        textAlign: 'left',
        alignSelf:"flex-end"
    },
    inputContainer: {
        alignSelf: 'center',
        width: '80%',
        marginTop: 20,
        backgroundColor: '#d6eef9',
        borderRadius: 20,
        paddingVertical: 20,
        alignItems: 'center',
        borderColor: '#6f5ef1',
        borderWidth: 2,
      
        
    },
    inputLabel: {
        fontSize: 16,
        color: '#252F40',
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#fff',
        padding: 10,
        borderRadius: 10,
        fontSize: 16,
        width: 300,
        backgroundColor: '#fff',
    },
    selectBrandButton: {
        backgroundColor: '#b3ebff',
        padding: 15,
        margin: 20,
        borderRadius: 20,
        width: '70%',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: '#17202a',
    },
    buttonText: {
        color: '#17202a',
        fontSize: 16,
        fontWeight:"bold"
    },
    brandContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        padding: 10,
    },
    brandItem: {
        width: '30%',
        alignItems: 'center',
        marginVertical: 10,
    },
    brandLogo: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    nextContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    nextButton: {
        backgroundColor: '#8CB8FB',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButton: {
      backgroundColor: '#f4750d',
      paddingVertical: 15,
      paddingHorizontal: 80,
      borderRadius: 25,
      marginTop: 20,
      marginBottom:30,
      width:300,
      alignSelf:"center",
  },
  submitButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign:"center",

  },
});
