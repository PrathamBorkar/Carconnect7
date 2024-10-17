import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const FormRent = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [adhaarno, setAdhaarno] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [vin, setVin] = useState("");
  const [licenseno, setLicenseno] = useState("");
  const [fueltype, setFueltype] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (
      !name ||
      !adhaarno ||
      !email ||
      !phone ||
      !model ||
      !price ||
      !vin ||
      !licenseno ||
      !fueltype ||
      !image
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const formdata = {
      name,
      adhaarno,
      email,
      phone,
      model,
      price,
      vin,
      licenseno,
      fueltype,
      image,
    };

    console.log("Form Data:", formdata);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8082/api/products",
        formdata
      );

      if (response.status === 201) {
        alert("Product Added Successfully");
        router.push("/root/tabs/Rent/homerent");
      } else {
        alert(`Failed to Add Product: ${response.data.message}`);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("Error request:", error.request);
        alert("Server did not respond. Please try again later.");
      } else {
        console.error("Error:", error.message);
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <GestureHandlerRootView style={styles.leftArrowBox}>
          <TouchableOpacity
            style={styles.leftArrow}
            onPress={() => router.push("/root/tabs/Rent/homerent")}
          >
            <FeatherIcon name="arrow-left" size={24} color="#007AFF" />
            <Text style={styles.backText}>Rent Your Car</Text>
          </TouchableOpacity>
        </GestureHandlerRootView>

        <View style={styles.titleBox}>
          <Text style={styles.title}>Owner's Information</Text>
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Aadhaar Number</Text>
          <TextInput
            style={styles.input}
            value={adhaarno}
            onChangeText={setAdhaarno}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <View style={styles.titleBox1}>
            <Text style={styles.title}>Vehicle Information</Text>
          </View>

          <Text style={styles.label}>Car Model</Text>
          <TextInput
            style={styles.input}
            value={model}
            onChangeText={setModel}
          />

          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Vehicle Identification Number</Text>
          <TextInput
            style={styles.input}
            value={vin}
            onChangeText={setVin}
          />

          <Text style={styles.label}>License Number</Text>
          <TextInput
            style={styles.input}
            value={licenseno}
            onChangeText={setLicenseno}
          />

          <Text style={styles.pickerLabel}>Fuel Type</Text>
          <Picker
            selectedValue={fueltype}
            onValueChange={(itemValue) => setFueltype(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Fuel Type" value="" />
            <Picker.Item label="Diesel" value="diesel" />
            <Picker.Item label="Petrol" value="petrol" />
            <Picker.Item label="CNG" value="cng" />
            <Picker.Item label="EV" value="ev" />
          </Picker>

          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={image}
            onChangeText={setImage}
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
    justifyContent: "center",
  },
  titleBox: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },
  titleBox1: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  leftArrowBox: {
    position: "absolute",
    top: -7,
    left: -3,
    flexDirection: "row",
    alignItems: "center",
  },
  leftArrow: { flexDirection: "row", alignItems: "center" },
  backText: { marginLeft: 8, fontSize: 16, color: "#007AFF" },
  inputBox: { marginVertical: 20 },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 15,
  },
  picker: {
    height: 50,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
    width: "90%",
  },
  submitButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default FormRent;
