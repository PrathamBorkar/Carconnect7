import { useState } from "react";
import { Image, ScrollView, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const [nameVerify, setNameVerify] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);
  const [mobileVerify, setMobileVerify] = useState(false);
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  const handleName = (text) => {
    setName(text);
    setNameVerify(text.length > 1);
  };

  const handleEmail = (text) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailVerify(emailRegex.test(text));
  };

  const handleMobile = (text) => {
    setMobile(text);
    const mobileRegex = /^[0-9]{10}$/;
    setMobileVerify(mobileRegex.test(text));
  };

  const handlePassword = (text) => {
    setPassword(text);
    setPasswordVerify(text.length >= 6);
  };

  const onSignUpPress = async () => {
    if (!nameVerify || !emailVerify || !mobileVerify || !passwordVerify) {
      setSuccessMessage("Please fill all fields correctly.");
      return;
    }

    setLoading(true);
    setSuccessMessage('');

    try {
      const response = await fetch("http://localhost:8082/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          mobile,
          password, // Send the password as is (no hashing)
        }),
      });

      const data = await response.json();
      if (data.status === "ok") {
        setSuccessMessage("User created successfully!");
        
        // Navigate to the Sign In page
        setTimeout(() => {
          router.push("/auth/sing-in"); // Correct path to Sign In page
        }, 2000); // Delay to show success message
      } else {
        setSuccessMessage(data.data || "Something went wrong.");
      }
    } catch (error) {
      setSuccessMessage("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ width: "100%", height: 250, position: "relative" }}>
          <Image source={require("../assets/images/signup-car.png")} style={{ width: "100%", height: 250 }} />
          <Text style={{ fontSize: 24, color: "black", fontWeight: "600", position: "absolute", bottom: 20, left: 20 }}>
            Create Your Account
          </Text>
        </View>

        <View style={{ padding: 20 }}>
          <TextInput
            placeholder="Enter name"
            value={name}
            onChangeText={handleName}
            style={{
              borderBottomWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              marginBottom: 10,
            }}
          />
          {!nameVerify && name.length > 0 && (
            <Text style={{ color: "red", marginBottom: 20 }}>Name should be at least 2 characters long.</Text>
          )}

          <TextInput
            placeholder="Enter mobile number"
            value={mobile}
            onChangeText={handleMobile}
            keyboardType="numeric"
            style={{
              borderBottomWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              marginBottom: 10,
            }}
          />
          {!mobileVerify && mobile.length > 0 && (
            <Text style={{ color: "red", marginBottom: 20 }}>Mobile number must be exactly 10 digits long.</Text>
          )}

          <TextInput
            placeholder="Enter email"
            value={email}
            onChangeText={handleEmail}
            style={{
              borderBottomWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              marginBottom: 10,
            }}
          />
          {!emailVerify && email.length > 0 && (
            <Text style={{ color: "red", marginBottom: 20 }}>Enter a valid email address.</Text>
          )}

          <TextInput
            placeholder="Enter password"
            secureTextEntry={true}
            value={password}
            onChangeText={handlePassword}
            style={{
              borderBottomWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              marginBottom: 20,
            }}
          />
          {!passwordVerify && password.length > 0 && (
            <Text style={{ color: "red", marginBottom: 20 }}>Password should be at least 6 characters long.</Text>
          )}

          {loading ? (
            <ActivityIndicator size="large" color="#6200ee" />
          ) : (
            <TouchableOpacity
              onPress={onSignUpPress}
              style={{
                backgroundColor: "#1a75ff",
                padding: 15,
                borderRadius: 50,
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Sign Up</Text>
            </TouchableOpacity>
          )}

          {successMessage ? (
            <Text style={{ color: successMessage.includes("Success") ? "green" : "red", marginTop: 20, textAlign: "center" }}>
              {successMessage}
            </Text>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
