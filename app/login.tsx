import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { auth } from "@/config/config";

const Login = () => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginUser = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      router.push('/city/city[id]')
    } catch (error: any) {
      alert("Error during login: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <Text style={{ textAlign: "center", fontSize: 20, margin: 20 }}>Login User</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        placeholder="Enter your Email"
        value={email}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Enter your password"
        secureTextEntry
      />
      <View style={{ margin: 10 }}>
        <Button title="Login" onPress={loginUser} />
      </View>

      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 12,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default Login;
