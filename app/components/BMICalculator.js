import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Canvas, Path, runTiming, useValue, useComputedValue, Circle } from '@shopify/react-native-skia';

export default function BMICalculator({ gender }) {
  const [height, setHeight] = useState(150);
  const [weight, setWeight] = useState(70);
  const [bmi, setBMI] = useState(null);

  const pointX = useValue(150);
  const pointY = useValue(150);

  const updatePoint = (x, y) => {
    runTiming(pointX, x, { duration: 100 });
    runTiming(pointY, y, { duration: 100 });
  };

  useEffect(() => {
    const x = (height - 100) / 150 * 200 + 100;
    const y = 280 - (weight - 20) / 150 * 250;
    updatePoint(x, y);
  }, [height, weight]);

  const calculateBMI = () => {
    const bmiValue = (weight / ((height / 100) ** 2)).toFixed(1);
    setBMI(bmiValue);
  };

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <Path
          path="M 100 30 L 100 280 M 100 280 L 300 280"
          color="#4a4a4a"
          style="stroke"
          strokeWidth={2}
        />
        <Circle cx={pointX} cy={pointY} r={5} color="#82c4c3" />
      </Canvas>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text>Height (cm):</Text>
          <TextInput
            style={styles.input}
            value={height.toString()}
            onChangeText={(text) => setHeight(parseInt(text) || 0)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text>Weight (kg):</Text>
          <TextInput
            style={styles.input}
            value={weight.toString()}
            onChangeText={(text) => setWeight(parseInt(text) || 0)}
            keyboardType="numeric"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={calculateBMI}>
        <Text style={styles.buttonText}>Calculate BMI</Text>
      </TouchableOpacity>
      {bmi && (
        <View style={styles.result}>
          <Text style={styles.bmiText}>BMI: {bmi}</Text>
          <Text style={styles.bmiDescription}>
            {bmi < 18.5 ? 'Underweight' :
             bmi < 24.9 ? 'Normal weight' :
             bmi < 29.9 ? 'Overweight' : 'Obesity'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  canvas: {
    width: 300,
    height: 300,
    backgroundColor: '#eef6f7',
    borderRadius: 10,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    width: 60,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#82c4c3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    alignItems: 'center',
  },
  bmiText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bmiDescription: {
    fontSize: 16,
    color: '#4a4a4a',
  },
});

