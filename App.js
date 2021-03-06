import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { API_KEY } from './config/index.js';
import axios from "axios";
import * as Location from 'expo-location';
import Weather from './Weather';
import { database } from './firebase';

export default function App() {
  const [firstCondition, setFirstCondition] = useState();
  const [firstTemp, setFirstTemp] = useState();
  const [firstDt_txt, setFirstDt_txt] = useState();

  const [secondCondition, setSecondCondition] = useState();
  const [secondTemp, setSecondTemp] = useState();
  const [secondDt_txt, setSecondDt_txt] = useState();

  const [thirdCondition, setThirdCondition] = useState();
  const [thirdTemp, setThirdTemp] = useState();
  const [thirdDt_txt, setThirdDt_txt] = useState();

  const [fourthCondition, setFourthCondition] = useState();
  const [fourthTemp, setFourthTemp] = useState();
  const [fourthDt_txt, setFourthDt_txt] = useState();

  const [Loaded, setLoaded] = useState(false);

  const getWeatherForecast = async (city, country) => {
    const { data:{
      list
    } 
  } = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=${API_KEY}&units=metric`
    );
    setFirstCondition(list[0].weather[0].main)
    setFirstTemp(list[0].main.temp)
    setFirstDt_txt(list[0].dt_txt)

    setSecondCondition(list[2].weather[0].main)
    setSecondTemp(list[2].main.temp)
    setSecondDt_txt(list[2].dt_txt)

    setThirdCondition(list[4].weather[0].main)
    setThirdTemp(list[4].main.temp)
    setThirdDt_txt(list[4].dt_txt)

    setFourthCondition(list[6].weather[0].main)
    setFourthTemp(list[6].main.temp)
    setFourthDt_txt(list[6].dt_txt)

    setLoaded(true);

    if(Loaded){
      saveWeatherData(
        firstCondition,
        firstTemp,
        firstDt_txt,
  
        secondCondition,
        secondTemp,
        secondDt_txt,
  
        thirdCondition,
        thirdTemp,
        thirdDt_txt,
  
        fourthCondition,
        fourthTemp,
        fourthDt_txt,
  
        city
      )  
    }
  }

  const saveDataCity = (city, country) => {
    const db = database.ref(`/test`);
    db.update({
      cities: {city}
    });
    saveDataCountry(city, country)
  }
  const saveDataCountry = (city, country) => {
    const db = database.ref(`/test/cities/${city}`);
    db.update({
      country: country
    });
  }

  const saveWeatherData = (
    firstCondition,
    firstTemp,
    firstDt_txt,

    secondCondition,
    secondTemp,
    secondDt_txt,

    thirdCondition,
    thirdTemp,
    thirdDt_txt,

    fourthCondition,
    fourthTemp,
    fourthDt_txt,

    city
  ) => {
    const db = database.ref(`/test/cities/${city}`);
    db.update({
      weather: {    
        firstCondition,
        firstTemp,
        firstDt_txt,

        secondCondition,
        secondTemp,
        secondDt_txt,

        thirdCondition,
        thirdTemp,
        thirdDt_txt,

        fourthCondition,
        fourthTemp,
        fourthDt_txt
    }
    });  
  }
  
  const getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      const city = await Location.reverseGeocodeAsync({latitude, longitude});

      if(checkCity(city[0].city)){
        getWeatherForecast(city[0].city, city[0].isoCountryCode);
        saveDataCity(city[0].city, city[0].isoCountryCode);  
      } else{
        console.log('same city')
      }
    } catch (error) {
      Alert.alert("Please allow us to get your place");
    }
  };  

  const checkCity = (currentCity) => {
    const cities = database.ref(`/test/cities`);
    cities.on('value', (snapshot) => {
      const cityName = Object.entries(snapshot.val())[0][0];
      return cityName !== currentCity
    });
  }

  useEffect (() => {
    getLocation();
  });

  return (
    <View style={styles.container}>
      <Weather 
        firstCondition={firstCondition} 
        firstTemp={firstTemp} 
        firstDt_txt={firstDt_txt}

        secondCondition={secondCondition}
        secondTemp={secondTemp}
        secondDt_txt={secondDt_txt}

        thirdCondition={thirdCondition}
        thirdTemp={thirdTemp}
        thirdDt_txt={thirdDt_txt}

        fourthCondition={fourthCondition}
        fourthTemp={fourthTemp}
        fourthDt_txt={fourthDt_txt}
      />
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
