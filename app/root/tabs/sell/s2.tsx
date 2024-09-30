import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, CheckBox, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function VehicleDetailsForm() {
    const [isChecked, setChecked] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Function to handle image selection
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.uri);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Enter more details about vehicle</Text>
            </View>

            {/* Form Inputs */}
            <View style={styles.formContainer}>
                <TextInput style={styles.input} placeholder="Car Model" />
                <TextInput style={styles.input} placeholder="Year" keyboardType="number-pad" />
                <TextInput style={styles.input} placeholder="No. of owners" keyboardType="number-pad" />
                <TextInput style={styles.input} placeholder="Vehicle Identification Number (VIN)" />
                <TextInput style={styles.input} placeholder="VIN" />
                <TextInput style={styles.input} placeholder="Fuel Type" />
                <TextInput style={styles.input} placeholder="Transmission" />
                <TextInput style={styles.input} placeholder="No. of seats" keyboardType="number-pad" />
                <TextInput style={styles.input} placeholder="Askable price" keyboardType="decimal-pad" />

                {/* Upload Image Section */}
                <Text style={styles.uploadText}>Upload image upto 1MB</Text>
                <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                    <Text style={styles.uploadButtonText}>+</Text>
                </TouchableOpacity>

                {selectedImage && (
                    <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
                )}

                {/* Terms and Conditions */}
                <View style={styles.termsContainer}>
                    <CheckBox value={isChecked} onValueChange={setChecked} />
                    <Text style={styles.termsText}>I accept the terms</Text>
                </View>

                <TouchableOpacity onPress={() => { /* Navigate to Terms */ }}>
                    <Text style={styles.tcLink}>Read our T&Cs</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Save</Text>
            </TouchableOpacity>

            </View>

            {/* Submit Button */}
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F9FC',
    },
    header: {
        backgroundColor: '#A7C7E7',
        width: '100%',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        color: '#black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    formContainer: {
        width: '100%',
        backgroundColor: '#F1F3FB',
        padding: 20,
        borderRadius: 10,
        borderColor: '#6f5ef1',
        borderWidth: 2,
    },
    input: {
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
        backgroundColor: '#F7F9FC',
    },
    uploadText: {
        marginBottom: 5,
        fontSize: 14,
        color: '#4A4A4A',
    },
    uploadButton: {
        borderColor: '#007AFF',
        borderWidth: 1,
        borderRadius: 8,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    uploadButtonText: {
        fontSize: 24,
        color: '#007AFF',
    },
    imagePreview: {
        width: 100,
        height: 100,
        marginBottom: 15,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    termsText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#4A4A4A',
    },
    tcLink: {
        color: '#007AFF',
        fontSize: 14,
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        paddingHorizontal: 80,
        borderRadius: 25,
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign :"center"
    },
});

