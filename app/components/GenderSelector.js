import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const genderImages = {
  male: require('../assets/man.png'),
  female: require('../assets/woman.png'),
};

export default function GenderSelector({ gender, setGender }) {
  const toggleGender = () => {
    setGender(gender === 'male' ? 'female' : 'male');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleGender}>
        <AntDesign name="left" size={24} color="#82c4c3" />
      </TouchableOpacity>
      <Image source={genderImages[gender]} style={styles.image} />
      <TouchableOpacity onPress={toggleGender}>
        <AntDesign name="right" size={24} color="#82c4c3" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 20,
  },
});

