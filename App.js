import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from "react";
import { WorkoutContext } from './components/Context';
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import Navigation from './components/Navigation';
import { RadioProvider } from './components/Settings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Style from './styles/Style';



// defaultWorkouts constantissa on valmiita esimerkki treenejä jotta workoutlistassa on valmiiksi treenejä sovellusta käynnistäessä 

const defaultWorkouts = [
  { newWorkout: { date: "2024-01-8", distance: "5", id: 0, sport: "Running", time: "30" } },
  { newWorkout: { date: "2024-01-15", distance: "10", id: 1, sport: "Cycling", time: "45" } },
  { newWorkout: { date: "2024-01-27", distance: "12", id: 2, sport: "Skiing", time: "60" } },
  { newWorkout: { date: "2024-01-31", distance: "8", id: 3, sport: "Running", time: "60" } }
]

// Sovelluksen useState tilanmuuttuja jonne treenit varastoidaan ja esitetään.

export default function App(){

    const [workout,setWorkout] = useState(defaultWorkouts)

    console.log(workout);



  return (
          <WorkoutContext.Provider value={{workout, setWorkout}}>
            <RadioProvider>
              <PaperProvider theme={MD3LightTheme}>
                <SafeAreaProvider>
                  <Navigation />
                </SafeAreaProvider>
              </PaperProvider>
            </RadioProvider>
            </WorkoutContext.Provider>

  )


}

