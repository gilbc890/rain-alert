import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from "axios";
import * as Location from 'expo-location';
import Weather from './Weather';

const API_KEY = "b33559a795955c42d473b21c749e214a";

export default function App() {
  const [condition, setCondition] = useState();
  const [temp, setTemp] = useState();

  const getWeather = async (latitude, longitude) => {
    const { data:{
      main : {temp},
      weather
    } 
  } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
    setCondition(weather[0].main);
    setTemp(temp);
  }

  const getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      getWeather(latitude, longitude)
    } catch (error) {
      Alert.alert("Please allow us to get your place");
    }
  };  

  useEffect(() => {
    getLocation();
    console.log(temp, 'did')
    console.log(condition, 'did condition')
  });

  return (
    <View style={styles.container}>
      <Weather />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
