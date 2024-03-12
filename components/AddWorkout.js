import { Button, Modal, Text, TextInput } from "react-native-paper"
import Style from "../styles/Style"
import { useContext, useState } from "react"
import  { WorkoutContext} from "./Context"
import { Alert, FlatList, Image, ImageBackground, Pressable, View } from "react-native"
import { Calendar } from "react-native-calendars"
import { SettingsRadio } from "./Settings"
import {MaterialCommunityIcons} from '@expo/vector-icons'


// functio lisää treenit useContextiin josta ne voidaan näyttää ListWorkouts.js:ssä. 

export default function AddWorkout() {


    // constantit useContextille, tilamuuttujille treeni, kesto, pituus ja päivämäärä sekä onko jokin asia näkösällä.

    const {setWorkout} = useContext(WorkoutContext)
    const { radioval } = SettingsRadio()
    const [addSport,setAddSport] = useState('')
    const [addDistance,setAddDistance] = useState('')
    const [addTime,setAddTime] = useState('')
    const [addDate, setAddDate] = useState()

    const [visible, setVisible] = useState(false)
    const [inputVisible, setInputVisible] = useState(true)


    // Constant eri treeneille jolloin klikattu "workout" on aktiivinen ja se lisätään tilamuuttujaan addSport.

    const runIcon = (<MaterialCommunityIcons name="run" size={24} color='black'/>)
    const cycleIcon = (<MaterialCommunityIcons name="bike" size={24} color='black'/>)
    const skiIcon = (<MaterialCommunityIcons name="ski" size={24} color='black'/>)

    const differentWorkouts = [
        {id: 1, training: 'Running', icon: runIcon},
        {id: 2, training: 'Cycling', icon: cycleIcon},
        {id: 3, training: 'Skiing', icon: skiIcon},
    ]

    const [selectedWorkout, setSelectedWorkout] = useState (differentWorkouts[0].id)

    function dateSelected(day) {
        setVisible(false)
        setAddDate(day)
    }


    // Functio etsii item.id:n perusteella "selectedWorkout" constantista mikä treeni on valittu ja sitten lisää useContextiin vaadittavat tiedot ja tyhjentää tilamuuttujat.

    function addingWorkout(){
        const selectedWorkoutItem = differentWorkouts.find(item => item.id === selectedWorkout)
        if (!selectedWorkoutItem){
            return
        }
        if (addDistance < 0 || addTime < 0) {
            Alert.alert('Cannot input negative values.')
            return
        }
        const miToKm = radioval === 'mi' ? parseFloat(addDistance) * 1.60 : addDistance
        let id = 0
        const addSport = selectedWorkoutItem.training
        const newWorkout = {id: id + 1, sport: addSport, distance: miToKm.toString(), time: addTime, date: addDate.dateString}
        setWorkout( prev => [...prev, {newWorkout}])
        console.log(newWorkout);
        setAddSport('')
        setAddDistance('')
        setAddTime('')
    }


    // return palauttaa Flatlistinä eri treenit (juoksi, pyöräily ja hiihto) jotka voi klikatessaan valita. Myös TextInputteina laitetaan distance, duration ja päivämäärän 
    // asettaminen. TextInputeissa on mahdollista laittaa vain numeroita. Ternary operaattori poistaa textinputin, 'add date' tekstin ja 'add workout' napin näkyvistä
    // kun päivämäärää asettaa.

    return(
    <View style={Style.navview}>
        <Text variant="headlineMedium" style={Style.header}>ADD Workout</Text>
        <FlatList
        data = {differentWorkouts}
        renderItem={({item}) => <Item valid={item} selectedWorkout={selectedWorkout} setSelectedWorkout={setSelectedWorkout}/>}>
        </FlatList>
        {!visible && (
        <View style={Style.textInput}>
            <TextInput style={Style.formfield}
            inputMode="numeric"
            mode="outlined"
            label={`Distance (${radioval})`}
            value={addDistance}
            onChangeText={setAddDistance}>
            </TextInput>
            <TextInput style={Style.formfield}
            inputMode="numeric"
            mode="outlined"
            label={'Duration (min)'}
            value={addTime}
            onChangeText={setAddTime}>
            </TextInput>
        </View>
        )}
            <Modal visible={visible} transparent={false} >
                <Calendar 
                style={Style.calendar}
                onDayPress={dateSelected}/>
            </Modal>
            {!visible && (
        <View >
            <View style={[Style.calendarTextBox, Style.calendarTextBoxElevation]}>
            <Pressable onPress={() => setVisible(true)}>
                <Text style={Style.calendarText}>{addDate ? addDate.dateString : 'Select date'}</Text>
            </Pressable>
            </View>
        <Button 
        style={Style.addWorkoutButton} 
        mode="elevated" 
        buttonColor="#fd8421e3" 
        labelStyle={{fontWeight: 'bold'}}
        onPress={addingWorkout}>Add workout</Button>
        </View>
        )}
    </View>
    )

    // Function tarkoitus on aiemman Flatlistin tapaan auttaa vaihtamaan valitun treenin väriä jotta käyttäjä tietää, että mikä treeni on valittu.

    function Item({valid, selectedWorkout, setSelectedWorkout}) {
        const boxColor = valid.id === selectedWorkout ? 'orange' : '#235eff'
        const textColor = valid.id === selectedWorkout ? '#000000' : '#ffffff'
        const borderColor = valid.id === selectedWorkout ? 'orange' : '#235eff'

        return (
            <Pressable onPress={ () => setSelectedWorkout(valid.id)}>
                <View style={[Style.row, Style.calendarTextBoxElevation, {backgroundColor: boxColor, borderColor: borderColor, opacity: 0.8, elevation: 8}]}>
                    <ImageBackground>{valid.icon}</ImageBackground>
                    <Text style={[Style.addWorkoutText, {color: textColor}]}>{valid.training}</Text>
                </View>
            </Pressable>
        )
    }
}