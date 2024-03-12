import { FlatList, View, ScrollView } from "react-native"
import Style from "../styles/Style"
import { useContext, useEffect, useState } from "react"
import { WorkoutContext} from "./Context"
import { Text } from "react-native-paper"
import { SettingsRadio } from "./Settings"
import {MaterialCommunityIcons} from '@expo/vector-icons'

// functio jonka tarkoitus on näyttää treenit aika järjestyksessä sekä näyttää jokaisen treenin summa ruudun yläreunassa.

export default function ListWorkouts() {

    const {workout} = useContext(WorkoutContext)
    const {radioval} = SettingsRadio()
    const [running, setRunning] = useState(0)
    const [cycling, setCycling] = useState(0)
    const [skiing, setSkiing] = useState(0)

    // useEffect muuntaa distance stringistä numeroksi ja lisää saman treenin pituudet toisiinsa ja lopuksi asettaa sen luvun muuttujaan.

    useEffect(() => {
        let runningTotal = 0
        let cyclingTotal = 0
        let skiingTotal = 0

        console.log("Test: ", workout);

        workout.forEach(training => {
            if(training.newWorkout.sport) {
                let distanceNumber = parseFloat(training.newWorkout.distance)
                if (!isNaN(distanceNumber)) {
                    switch (training.newWorkout.sport.toLowerCase()) {
                        case 'running':
                            runningTotal += distanceNumber
                            break
                        case 'cycling':
                            cyclingTotal += distanceNumber
                            break
                        case 'skiing':
                            skiingTotal += distanceNumber
                            break
                    }
                }
            }
        })

        console.log(`Totals - Running: ${runningTotal}, Cycling: ${cyclingTotal}, Skiing: ${skiingTotal}`)
        
        setRunning(runningTotal)
        setCycling(cyclingTotal)
        setSkiing(skiingTotal);
    }, [workout])

    //Muuttuja jokaiselle lajille jotta saadaan kilometreistä maileiksi muutettua

    const kmToMiRun = running / 1.6
    const roundedKmToRun = kmToMiRun.toFixed(2)
    const kmToMiCyc = cycling / 1.6
    const roundedKmToCyc = kmToMiCyc.toFixed(2)
    const kmToMiSki = skiing / 1.6
    const roundedKmToSki = kmToMiSki.toFixed(2)

    const runIcon = (<MaterialCommunityIcons name="run" size={24} color='black'/>)
    const cycleIcon = (<MaterialCommunityIcons name="bike" size={24} color='black'/>)
    const skiIcon = (<MaterialCommunityIcons name="ski" size={24} color='black'/>)


    // return palauttaa jokaisen "treenilajin" yhteenlasketun summan jonka jälkeen flatlist lista näyttää jokaisen tallennetun treenin päivämäärän mukaan uusin alimmaisena

    return(
    <View style={Style.workoutListView}>
        <Text variant="headlineMedium" style={Style.header}>LIST OF WORKOUTS</Text>
        <View style={[Style.workoutSummary]}>
            <Text>
                {runIcon}  
                {radioval === 'km' ? running : roundedKmToRun} {radioval}
            </Text>
            <Text>
                {cycleIcon} 
                {radioval === 'km' ? cycling : roundedKmToCyc} {radioval}
            </Text>
            <Text>
                {skiIcon} 
                {radioval === 'km' ? skiing : roundedKmToSki} {radioval}
            </Text>            
        </View>
        <FlatList 
        data = {workout.sort((a, b) => a.newWorkout.date.localeCompare(b.newWorkout.date))}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
        <Item treeni={item}/>
        )}
        
        />

        
    </View>
    )


    // Functio Item on Flatlistiä varten tehty, jotta saadaan mm. tyyli ja ScrollViewiä käytettyä Flatlistissä. 

    function Item({treeni}) {

        const kmToMi = treeni.newWorkout.distance / 1.6
        const roundedKmToMi = kmToMi.toFixed(2)


        return (
        <View style={[Style.workoutList, Style.calendarTextBoxElevation, {elevation: 5}]}>
            <ScrollView>
                <Text>Sport: {treeni.newWorkout.sport}</Text>
                <Text>Distance: {radioval === 'km' ? treeni.newWorkout.distance : roundedKmToMi} {radioval}</Text>
                <Text>Time: {treeni.newWorkout.time}</Text>
                <Text>Date: {treeni.newWorkout.date}</Text>
            </ScrollView>
        </View>
        )
    }

    
}