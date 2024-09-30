import { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios"; // Import axios
import { Ionicons } from '@expo/vector-icons';

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter(); // Initialize useRouter to handle navigation

  const onSignInPress = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill out both email and password.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:8082/login-user", {
        email: form.email,
        password: form.password,
      });

      if (response.data.status === "ok") {
        Alert.alert("Success", "Login successful!");
        router.push("/root/tabs/homescreen");
      } else {
        setErrorMessage(response.data.data || "Invalid credentials.");
      }
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.message || JSON.stringify(error.response.data);
        setErrorMessage(`Server Error: ${errorMsg}`);
      } else if (error.request) {
        setErrorMessage("No response from server. Please check your network or server.");
        console.log("Error Request: ", error.request);
      } else {
        setErrorMessage(`Error: ${error.message}`);
      }
      console.error("Error details:", error);
    }

    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/images/signup-car.png")} style={styles.image} />
        <Text style={styles.welcomeText}>Welcome 👋</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Let's get started</Text>
          <Text style={styles.subHeaderText}>Sign up or log in to find out the best car for you</Text>
        </View>

        <View style={styles.inputField}>
          <Text>Email</Text>
          <TextInput
            placeholder="Enter email"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputField}>
          <Text>Password</Text>
          <TextInput
            placeholder="Enter password"
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            style={styles.textInput}
          />
        </View>

        <TouchableOpacity style={styles.fp}>
          <Text>Forgot password? Click here</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#1a75ff" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={onSignInPress}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        )}

        {errorMessage ? (
          <Text style={{ color: "red", textAlign: "center", marginTop: 20 }}>{errorMessage}</Text>
        ) : null}
       <View style={styles.fp}><Text>Or</Text></View>
        <TouchableOpacity style={styles.but} onPress={() => console.log("Sign In with Google")}>
          <Ionicons name="logo-google" size={24} color="#fff" style={styles.l} />
          <Text style={styles.butText}>Login with Google</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don't have an account?{" "}
            <TouchableOpacity onPress={() => router.push("/auth/sing-up")}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    width: "100%",
    height: 250,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  welcomeText: {
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  formContainer: {
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: "#858585",
    marginTop: 5,
    textAlign: 'center',
  },
  inputField: {
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  textInput: {
    height: 50,
    borderColor: "#021010",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 100,
    backgroundColor:"#e4e6e6"
  },
  button: {
    backgroundColor: "#24b0f4",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
    elevation: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  signupText: {
    fontSize: 16,
    color: "#858585",
  },
  signupLink: {
    color: "#6200ee",
    fontWeight: "bold",
  },
  but: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
     
  },
  butText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft:5,
    alignContent:"center",
  },
  fp: {
    alignItems: "center",
    marginVertical: 10,
  },
  l:{
    marginLeft:70,
  }
});

export default SignIn;
