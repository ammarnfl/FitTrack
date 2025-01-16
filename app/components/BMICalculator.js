import React, { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Svg, { Line, Circle, Text as SvgText } from "react-native-svg";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, runOnJS } from "react-native-reanimated";
import Button from "./Button";

const BMICalculator = ({ gender, logActivity }) => {
  const [height, setHeight] = useState(150);
  const [weight, setWeight] = useState(70);
  const [bmi, setBmi] = useState("");
  const [bmiDescription, setBmiDescription] = useState("");

  const pointX = useSharedValue(150);
  const pointY = useSharedValue(150);

  const updateValues = (x, y) => {
    const newHeight = Math.round((x - 50) / 250 * 150 + 100);
    const newWeight = Math.round(170 - (y - 50) / 200 * 150);
    setHeight(newHeight);
    setWeight(newWeight);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = pointX.value;
      ctx.startY = pointY.value;
    },
    onActive: (event, ctx) => {
      let newX = ctx.startX + event.translationX;
      let newY = ctx.startY + event.translationY;

      newX = Math.max(50, Math.min(300, newX));
      newY = Math.max(50, Math.min(250, newY));

      pointX.value = newX;
      pointY.value = newY;

      runOnJS(updateValues)(newX, newY);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: pointX.value - 8 },
        { translateY: pointY.value - 8 },
      ],
    };
  });

  const calculateBMI = () => {
    const heightMeters = height / 100;
    const calculatedBmi = (weight / (heightMeters * heightMeters)).toFixed(1);
    setBmi(calculatedBmi);

    let description = "";
    if (calculatedBmi < 18.5) {
      description = "Underweight";
    } else if (calculatedBmi < 24.9) {
      description = "Normal weight";
    } else if (calculatedBmi < 29.9) {
      description = "Overweight";
    } else {
      description = "Obesity";
    }
    setBmiDescription(description);

    logActivity("bmiCalculation", { weight, height, calculatedBmi, description });
  };

  return (
    <View style={styles.container}>
      <Svg height="300" width="350" style={styles.canvas}>
        {/* X-axis (Height) */}
        <Line x1="50" y1="250" x2="300" y2="250" stroke="black" strokeWidth="2" />
        <SvgText x="175" y="290" fontSize="12" textAnchor="middle">Height (cm)</SvgText>
        
        {/* Y-axis (Weight) */}
        <Line x1="50" y1="50" x2="50" y2="250" stroke="black" strokeWidth="2" />
        <SvgText x="10" y="150" fontSize="12" rotation="-90" textAnchor="middle">Weight (kg)</SvgText>
        
        {/* X-axis labels */}
        {[100, 150, 200, 250].map((value, index) => (
          <React.Fragment key={`x-${index}`}>
            <Line x1={50 + index * 62.5} y1="250" x2={50 + index * 62.5} y2="255" stroke="black" strokeWidth="1" />
            <SvgText x={50 + index * 62.5} y="270" fontSize="10" textAnchor="middle">
              {value}
            </SvgText>
          </React.Fragment>
        ))}
        
        {/* Y-axis labels */}
        {[20, 70, 120, 170].map((value, index) => (
          <React.Fragment key={`y-${index}`}>
            <Line x1="45" y1={250 - index * 50} x2="50" y2={250 - index * 50} stroke="black" strokeWidth="1" />
            <SvgText x="35" y={255 - index * 50} fontSize="10" textAnchor="end">
              {value}
            </SvgText>
          </React.Fragment>
        ))}

        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.point, animatedStyle]} />
        </PanGestureHandler>
      </Svg>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            value={String(height)}
            onChangeText={(text) => {
              const newHeight = Number(text);
              setHeight(newHeight);
              pointX.value = ((newHeight - 100) / 150) * 250 + 50;
            }}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={String(weight)}
            onChangeText={(text) => {
              const newWeight = Number(text);
              setWeight(newWeight);
              pointY.value = 250 - ((newWeight - 20) / 150) * 200;
            }}
            keyboardType="numeric"
          />
        </View>
      </View>

      <Button title="Calculate BMI" onPress={calculateBMI} style={styles.button} />

      {bmi && (
        <View style={styles.resultContainer}>
          <Text style={styles.bmiText}>BMI: {bmi}</Text>
          <Text style={[styles.bmiDescription, { color: bmiDescription === "Obesity" ? "#e74c3c" : "#2ecc71" }]}>
            {bmiDescription}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f4f7f6",
    padding: 15,
    borderRadius: 10,
  },
  canvas: {
    borderWidth: 1,
    borderColor: "#bdc3c7",
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "white",
  },
  point: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#3498db",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  inputWrapper: {
    width: "48%",
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#bdc3c7",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    backgroundColor: "white",
  },
  button: {
    width: "100%",
    marginTop: 10,
  },
  resultContainer: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    width: "100%",
  },
  bmiText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bmiDescription: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BMICalculator;

