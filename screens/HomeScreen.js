import { StatusBar } from "expo-status-bar"
import { useCallback, useContext } from "react"
import { Button, FlatList, View } from "react-native"
import { ExerciseContext, styles } from "../App"

export default function HomeScreen ({navigation, route}){
  let exerciseList = useContext(ExerciseContext)
  //let exerciseList = route.params.exerciseList
  let gotoExercise = useCallback(({key, type})=> {
    navigation.navigate(type, {exerciseKey: key, count: 0, exerciseList: exerciseList})
  })
  return(
    <View style={styles.container}>
      <FlatList data = {exerciseList} renderItem={({item}) =>
      <Button onPress ={() => gotoExercise(item)} title = {item.name}></Button>
      }/>
      <StatusBar style="auto" />
    </View>
  )
}