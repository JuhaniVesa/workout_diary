import { StatusBar, StyleSheet } from "react-native"

export default Style = StyleSheet.create ({
    container: {
        marginTop: StatusBar.currentHeight + 5
    },

    navview: {
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'stretch',
        paddingBottom: '100%'
    },
    workoutListView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',

    },
    header: {
        fontWeight: '700',
        margin: 5,
        textAlign: 'center',
    },
    textInput: {
        marginTop: 70,
        marginBottom: 10,
    },
    formfield: {
        margin: 5,
        backgroundColor: 'rgba(255, 165, 0, 0.5)'
        
    },
    addWorkoutButton: {
        margin: 5,
        borderRadius: 2,
        borderWidth: 1,
    },
    calendarText: {
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,
        textAlign: 'center',
        
    },
    calendarTextBox: {
        borderRadius: 3,
        backgroundColor: 'white',
        marginVertical: 5,
        marginHorizontal: 5,
        marginBottom: 30
    },
    calendarTextBoxElevation: {
        shadowColor: '#52006A',
        elevation: 20
    },
    calendar: {
        borderWidth: 1,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 3,
        textAlign: 'center', 
        alignItems: 'center', 
        margin: 10, 
        padding: 10,
        
    },
    addWorkoutText: {
        paddingLeft: '35%',
        fontSize: 18,
        textAlign: 'center'
    },
    workoutList: {
        flex: 1,

        borderRadius: 3,
        textAlign: 'center',
        margin: 5,
        padding: 5,
        backgroundColor: 'orange',
        opacity: 0.8,
        },
    workoutSummary: {
        borderRadius: 3,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-evenly',
        marginTop: 30,
        marginBottom: 30
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButtonBox: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        borderRadius: 3,
        width: '60%',
        backgroundColor: 'orange',
        opacity: 0.8
    },
    radioButtonText: {
        fontSize: 16,
        marginLeft: 5
    }
})