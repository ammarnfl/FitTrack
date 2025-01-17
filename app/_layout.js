// App.js
import React,{ useEffect }  from "react";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import EditProfileScreen from './screens/EditProfileScreen';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    // Menyembunyikan splash screen setelah 2 detik
    async function prepare() {
      console.log("Mencegah Splash Screen untuk disembunyikan");
      await SplashScreen.preventAutoHideAsync(); // Menunggu splash screen tetap muncul
      setTimeout(async () => {
        console.log("Splash Screen disembunyikan");
        await SplashScreen.hideAsync(); // Menyembunyikan splash screen setelah 5 detik
      }, 5000);
    }
  
    prepare();
    
  }, []);
  return (
    <NavigationIndependentTree>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
        </NavigationContainer>
    </NavigationIndependentTree>
  );
}
