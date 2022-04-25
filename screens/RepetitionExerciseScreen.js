import { StatusBar } from "expo-status-bar"
import { useCallback, useContext, useState } from "react"
import {FlatList, StyleSheet, View } from "react-native"
import { Button, Text} from "react-native-elements"
import { ExerciseContext, REPETITION_EXERCISE, styles } from "../App"

export default function RepetitionExerciseScreen({route, navigation}){
  let {exerciseKey} = route.params
  let [count, setCount] = useState(0)
  let exerciseList = useContext(ExerciseContext)
  let currentExercise = exerciseList.find(ex => ex.key === exerciseKey)
  let suggestedExercise = exerciseList.find(ex => ex.key == currentExercise.suggestedNextExercise)
  return(
    <View style={styles.container}>
      <Text style = {repStyles.reps}>{count}</Text>
      <Button 
      buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
      onPress ={() => setCount(ct => ct+1)} title = "+"></Button>
      <Button onPress ={() => setCount(0)} title = "Reset"></Button>
      <Button onPress ={() => navigation.navigate(suggestedExercise.type,
      {exerciseKey: currentExercise.suggestedNextExercise, exerciseList})} 
      title = {`Suggested Next Exercise: ${suggestedExercise.name}`}></Button>
      <Button onPress ={() => navigation.navigate("Home")} title = "Return Home"></Button>
      <StatusBar style="auto" />
    </View>
  )
}

let repStyles = StyleSheet.create({
    button:{
        height: 50
    },
    repsTitle: {
        fontSize: 35
    },
    reps: {
        fontSize: 45
    }
})