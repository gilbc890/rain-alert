import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App(
  {
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
  }) {
  return (
    <View style={styles.container}>
      <Text>Weather page</Text>
      <View>
        <Text>First</Text>
        <Text>{firstCondition}</Text>
        <Text>{firstTemp}</Text>
        <Text>{firstDt_txt}</Text>
      </View>
      <View>
        <Text>Second</Text>
        <Text>{secondCondition}</Text>
        <Text>{secondTemp}</Text>
        <Text>{secondDt_txt}</Text>
      </View>
      <View>
        <Text>Third</Text>
        <Text>{thirdCondition}</Text>
        <Text>{thirdTemp}</Text>
        <Text>{thirdDt_txt}</Text>
      </View>
      <View>
        <Text>Fourth</Text>
        <Text>{fourthCondition}</Text>
        <Text>{fourthTemp}</Text>
        <Text>{fourthDt_txt}</Text>
      </View>

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
