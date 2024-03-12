import {  View } from "react-native"
import { RadioButton, Text } from "react-native-paper"
import Style from "../styles/Style"
import { createContext, useContext, useState } from "react"

export const RadioContext = createContext()

export const SettingsRadio = () => useContext(RadioContext)

export const RadioProvider = ({ children }) => {
    const [radioval, setRadioval] = useState('km')

    return (
        <RadioContext.Provider value={{radioval, setRadioval}}>
            {children}
        </RadioContext.Provider>
    )
}

export default function Settings() {

    const { setRadioval, radioval } = SettingsRadio()

    return(
    <View style={Style.workoutListView}>
        <Text variant="headlineMedium" style={Style.header}>SETTINGS</Text>
        <View style={[Style.radioButtonBox, Style.calendarTextBoxElevation]}>
            <RadioButton.Group onValueChange={newValue => setRadioval(newValue)} value={radioval}>
                <View style={Style.radioButton}>
                    <RadioButton value="km"/>
                    <Text style={Style.radioButtonText}>Kilometers</Text>
                </View>
                <View style={Style.radioButton}>
                    <RadioButton value="mi"/>
                    <Text style={Style.radioButtonText}>Miles</Text>
                </View>
            </RadioButton.Group>
        </View>
        <Text style={[Style.radioButtonText, {marginLeft: 25}]}>Type of distance chosen: {radioval}</Text>
    </View>
    )
}