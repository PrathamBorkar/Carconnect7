import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, CheckBox, Linking, ScrollView } from 'react-native';

export default function OwnerInfoForm() {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [formData, setFormData] = useState({
        ownerName: '',
        contactNumber: '',
        emailAddress: '',
        adhaarNumber: '',
        whatsappNumber: '',
        ownerComments: ''
    });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Form Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Owners Information</Text>
            </View>

            {/* Input Fields */}
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Owners Name"
                    value={formData.ownerName}
                    onChangeText={(value) => handleInputChange('ownerName', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contact Number"
                    value={formData.contactNumber}
                    onChangeText={(value) => handleInputChange('contactNumber', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    value={formData.emailAddress}
                    onChangeText={(value) => handleInputChange('emailAddress', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Adhaar Number"
                    value={formData.adhaarNumber}
                    onChangeText={(value) => handleInputChange('adhaarNumber', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Whatsapp Number"
                    value={formData.whatsappNumber}
                    onChangeText={(value) => handleInputChange('whatsappNumber', value)}
                />

                {/* Terms and Conditions */}
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={termsAccepted}
                        onValueChange={setTermsAccepted}
                    />
                    <Text style={styles.checkboxLabel}>I accept the terms</Text>
                </View>

                <TouchableOpacity onPress={() => Linking.openURL('https://example.com/terms')}>
                    <Text style={styles.termsText}>Read our T&Cs</Text>
                </TouchableOpacity>

                {/* Comments */}
                <TextInput
                    style={styles.commentInput}
                    placeholder="Owners comments"
                    value={formData.ownerComments}
                    onChangeText={(value) => handleInputChange('ownerComments', value)}
                    multiline
                />

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    headerContainer: {
        backgroundColor: '#A6C7FF',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    formContainer: {
        backgroundColor: '#F1F3FB',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        borderWidth:2,
        borderColor:"#6f5ef1"
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxLabel: {
        marginLeft: 10,
        fontSize: 14,
        color: '#333',
    },
    termsText: {
        color: '#6B8EFC',
        textDecorationLine: 'underline',
        marginBottom: 20,
    },
    commentInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        height: 100,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: '#ccc',
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
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:"center",
    },
});
