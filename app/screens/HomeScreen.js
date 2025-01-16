import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, push, serverTimestamp } from "firebase/database";
import { auth, database } from "../firebaseConfig";
import GenderSelector from "../components/GenderSelector";
import BMICalculator from "../components/BMICalculator";
import ArticleList from "../components/ArticleList";
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [gender, setGender] = useState("male");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const authInstance = getAuth();
    const currentUser = authInstance.currentUser;
    if (!currentUser) {
      navigation.replace("Login");
    } else {
      setUser(currentUser);
    }
  }, []);

  const logActivity = (action, data = {}) => {
    if (!user) return;
    push(ref(database, "UserActivities"), {
      userId: user.uid,
      email: user.email,
      action,
      timestamp: serverTimestamp(),
      ...data,
    });
  };

  const handleLogout = () => {
    signOut(auth).then(() => navigation.replace("Login"));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to FitTrack</Text>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setIsDropdownVisible(!isDropdownVisible)}
        >
          <AntDesign name="menu-fold" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      {isDropdownVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.dropdownItem}>
            <Text>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.dropdownItem}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GenderSelector gender={gender} setGender={setGender} />
        <BMICalculator gender={gender} logActivity={logActivity} />
        <ArticleList />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7f6",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#82c4c3',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  menuButton: {
    padding: 5,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
});

export default HomeScreen;

