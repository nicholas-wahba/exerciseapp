import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useContext } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HomeScreen from './screens/HomeScreen'
import RepetitionExerciseScreen from './screens/RepetitionExerciseScreen';
import DurationExerciseScreen from './screens/DurationExerciseScreen';
import WeightRepetitionScreen from './screens/WeightRepetitionScreen';

export const DURATION_EXERCISE = "DurationExerciseScreen"
export const REPETITION_EXERCISE = "RepetitionExerciseScreen"
export const WEIGHT_REPETITION = "WeightRepetitionScreen"

let exerciseList = [
    {
    name: "Push-Ups",
    key: "1",
    type: REPETITION_EXERCISE,
    suggestedNextExercise: "2"
  },
  {
    name: "Sit-Ups",
    key: "2",
    type: REPETITION_EXERCISE,
    suggestedNextExercise: "3"
  },
  {
    name: "Running",
    key: "3",
    type: DURATION_EXERCISE,
    suggestedNextExercise: "4"
  },
  {
    name: "Dumbbells",
    key: "4",
    type: WEIGHT_REPETITION,
    suggestedNextExercise: "5"
  },
  {
    name: "Deadlifts",
    key: "5",
    type: WEIGHT_REPETITION,
    suggestedNextExercise: "1"
  }
]

export const ExerciseContext = React.createContext(exerciseList)


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <ExerciseContext.Provider value={exerciseList}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen options ={(({route}) => ({
          title: "Repetition: " + 
        route.params.exerciseList.find(ex => ex.key === route.params.exerciseKey).name
      }))} 
      name= {REPETITION_EXERCISE} component={RepetitionExerciseScreen}/>
        <Stack.Screen 
        options ={(({route}) => ({
          title: "Duration: " + 
        route.params.exerciseList.find(ex => ex.key === route.params.exerciseKey).name
      }))} 
        name= {DURATION_EXERCISE} component={DurationExerciseScreen}/>
        <Stack.Screen 
        options ={(({route}) => ({
          title: "Weight Repetition: " + 
        route.params.exerciseList.find(ex => ex.key === route.params.exerciseKey).name
      }))} 
        name= {WEIGHT_REPETITION} component={WeightRepetitionScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </ExerciseContext.Provider>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});