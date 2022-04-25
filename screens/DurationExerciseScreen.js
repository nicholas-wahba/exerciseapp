import { StatusBar } from "expo-status-bar"
import { useCallback, useContext, useEffect, useState } from "react"
import {FlatList, StyleSheet, View } from "react-native"
import { Button, Text} from "react-native-elements"
import { ExerciseContext, styles } from "../App"

export default function DurationExerciseScreen({route, navigation}){
  let {exerciseKey} = route.params
  let exerciseList = useContext(ExerciseContext)
  let currentExercise = exerciseList.find(ex => ex.key === exerciseKey)
  let suggestedExercise = exerciseList.find(ex => ex.key == currentExercise.suggestedNextExercise)
    let [startTime, setStartTime] = useState(new Date(0))
    let [timerStarted, setTimerStarted] = useState(false)
    let [frame, setFrame] = useState(0)
    useEffect (() => {
    let intervalId = 
        setInterval(() => {
            if (timerStarted){
                setFrame(frame => frame + 1)
                //console.log("Frame " + frame)
            }
        }, 
        1000 / 30)
     return () => clearInterval(intervalId)
    })
    let elapsedTime = startTime
    if (timerStarted){
        elapsedTime = new Date(new Date().valueOf() - startTime.valueOf())
    } 
  return(
    <View style={styles.container}>
    <Text>Timer: {String(elapsedTime.getMinutes()).padStart(2, "0", 2)}: {String(elapsedTime.getSeconds()).padStart(2, "0")}.{String (elapsedTime.getMilliseconds()).padStart(3,"0")}</Text>
    {!timerStarted ? <Button onPress = {() => {setTimerStarted(true); setStartTime(new Date()) }}title = "Start"></Button>
    : <Button onPress = {() => {setStartTime (new Date (0)); setTimerStarted(false); }} title = "Reset"></Button>
    }
      <Button style = {repStyles.button} onPress ={() => navigation.navigate(suggestedExercise.type,
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