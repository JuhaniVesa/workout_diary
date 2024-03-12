import workoutContext from "./Context";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AddWorkout from "./AddWorkout";
import ListWorkouts from "./ListWorkouts";
import Settings from "./Settings";



// Sovelluksen navigointi tehtynä MaterialTopBarNavigaattorilla, joka on sijoitettu ruudun alareunaan.

const Tab = createMaterialTopTabNavigator()

export default function Navigation() {

return (
  <NavigationContainer>
    <Tab.Navigator
      style={Style.container}
      tabBarPosition='bottom'
      screenOptions={{
      tabBarActiveTintColor: 'orange',
      tabBarInactiveTintColor: 'blue',
      tabBarPressColor: 'orange'

    }}
      >   
      <Tab.Screen 
      name='Add Workout' 
      component={AddWorkout}
      />
      <Tab.Screen 
      name='List of workouts' 
      component={ListWorkouts}
      />
      <Tab.Screen 
      name='Settings' 
      component={Settings}
      />
    </Tab.Navigator>
  </NavigationContainer>
)

}