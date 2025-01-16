// screens/RegisterScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth, database } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        set(ref(database, `UserProfile/${user.uid}`), {
          username,
          fullname: { firstname, lastname },
          email,
        })
          .then(() => {
            setMessage("Akun Berhasil Dibuat!");
            setTimeout(() => navigation.replace("Login"), 2000);
          })
          .catch(() => setMessage("Gagal menyimpan data!"));
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setMessage("Email Sudah Digunakan!!");
        } else {
          setMessage("Tidak Bisa Membuat User");
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <TextInput style={styles.input} placeholder="Username" onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="First Name" onChangeText={setFirstname} />
      <TextInput style={styles.input} placeholder="Last Name" onChangeText={setLastname} />
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text onPress={() => navigation.navigate("Login")} style={styles.link}>
        Already have an account? Sign in
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
  link: { marginTop: 10, color: "#82c4c3", textDecorationLine: "underline" }, // ✅ Tambahkan style untuk link
  message: { color: "#ff0000", marginBottom: 10 },
});

export default RegisterScreen;
