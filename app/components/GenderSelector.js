import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const genderImages = {
  male: require("../assets/man.png"),
  female: require("../assets/woman.png"),
};

const GenderSelector = ({ gender, setGender }) => {
  const toggleGender = () => {
    setGender(gender === "male" ? "female" : "male");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleGender}>
        <AntDesign name="left" size={24} color="#82c4c3" />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image source={genderImages[gender]} style={styles.genderImage} />
        <Text style={styles.genderText}>{gender === "male" ? "Male" : "Female"}</Text>
      </View>
      <TouchableOpacity onPress={toggleGender}>
        <AntDesign name="right" size={24} color="#82c4c3" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  genderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  genderText: {
    marginTop: 5,
    fontSize: 16,
    color: '#333',
  },
});

export default GenderSelector;

