import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import GenderSelector from '../components/GenderSelector';
import BMICalculator from '../components/BMICalculator';
import ArticleSlider from '../components/ArticleSlider';

export default function HomeScreen() {
  const [gender, setGender] = useState('male');

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <GenderSelector gender={gender} setGender={setGender} />
        <BMICalculator gender={gender} />
        <ArticleSlider />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f6',
  },
  content: {
    padding: 20,
  },
});

