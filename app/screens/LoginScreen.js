// screens/LoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setMessage("Login Berhasil!");
        setTimeout(() => navigation.replace("Home"), 2000);
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          setMessage("Incorrect Email or Password");
        } else {
          setMessage("Account does not exist! Register first.");
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text onPress={() => navigation.navigate("Register")} style={styles.link}>
        Don't have an account? Sign up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f4f7f6" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { width: "80%", padding: 10, borderWidth: 1, borderRadius: 8, marginBottom: 10 },
  button: { backgroundColor: "#82c4c3", padding: 10, borderRadius: 8, width: "80%", alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16 },
  link: { marginTop: 10, color: "#82c4c3", textDecorationLine: "underline" },
  message: { color: "#ff0000", marginBottom: 10 },
});

export default LoginScreen;
