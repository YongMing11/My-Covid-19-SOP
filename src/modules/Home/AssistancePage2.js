import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import theme from '../../shared/constants/Theme'
import { DataTable, Checkbox, Button, Portal, Dialog, Paragraph, Divider } from 'react-native-paper';
import MapView, { Callout, Marker } from 'react-native-maps';
import { GOOGLE_MAPS_APIKEY } from '../../shared/constants/config';
import MapViewDirections from 'react-native-maps-directions';
import { useLocationContext } from '../../contexts/location-context';
import GeneralPhase1 from '@mock/checklist/generalChecklist-Phase1.json'
import GeneralPhase2 from '@mock/checklist/generalChecklist-Phase2.json'
import GeneralPhase3 from '@mock/checklist/generalChecklist-Phase3.json'
import GeneralPhase4 from '@mock/checklist/generalChecklist-Phase4.json'
import { useHistoryContext } from '../../contexts/history-context';
import moment from 'moment-timezone';

moment.tz.setDefault("Asia/Kuala_Lumpur")

function Timer({ startTime }) {
    const [duration, setDuration] = useState("0 MIN 0 SEC");
    useEffect(() => {
        // UPDATE THE TIMER DISPLAY EVERY SECOND BY CALCULATING (CURRENT TIME - START TIME)
        const timerUpdateInterval = setInterval(() => {
            const currentTime = new Date();
            let difference = currentTime.getTime() - startTime.getTime();

            var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
            difference -= hoursDifference * 1000 * 60 * 60

            var minutesDifference = Math.floor(difference / 1000 / 60);
            difference -= minutesDifference * 1000 * 60

            var secondsDifference = Math.floor(difference / 1000);

            let newDuration;
            if (hoursDifference === 0) {
                newDuration = minutesDifference + " MIN " + secondsDifference + " SEC"
            } else {
                newDuration = hoursDifference + " HOUR " + minutesDifference + " MIN "
            }
            setDuration(newDuration)
        }, 1000)

        return () => clearInterval(timerUpdateInterval)
    }, [])

    return (
        <Text style={styles.totalDurationStatusBar}>Your Total Duration at Outside: {duration}</Text>
    )
}

function TaskChecklists({ setCompleteChecklist, setIncompleteChecklist, isfullyVaccinated }) {
    const { action, location, destination } = useLocationContext();
    const [tasks, setTasks] = useState({});

    const generalPhase = {
        "PPN Phase 1": GeneralPhase1,
        "PPN Phase 2": GeneralPhase2,
        "PPN Phase 3": GeneralPhase3,
        "PPN Phase 4": GeneralPhase4
    }
    // SET CHECKLIST TASKS BY CHECKING VACCINATION STATUS, LOCATION PHASE, DESTINATION PHASE
    useEffect(() => {
        const vaccinationStatusKey = isfullyVaccinated ? "Vaccinated" : "NotVaccinated";
        let specialBeforeEnteringList = [];
        if (location.phase && destination.phase && location.phase !== destination.phase) {
            specialBeforeEnteringList = generalPhase[destination.phase]["Before starting your journey_destination"]
        }
        const initialTask = action.id && location.phase && destination.phase ? {
            "Note": generalPhase[location.phase]["Note"][vaccinationStatusKey][action.id],
            "Before starting your journey": [
                ...generalPhase[location.phase]["Before starting your journey"],
                ...specialBeforeEnteringList
            ],
            "At destination": generalPhase[destination.phase]["At destination"]
        } : { "Note": ["No SOP information"] }

        setTasks(JSON.parse(JSON.stringify(initialTask)))
    }, [isfullyVaccinated])

    // UPDATE THE CHECKBOX STATUS OF THE TASKS TO TRUE OR FALSE
    const onPressCheckBox = (taskCategory, index) => {
        const currentTasks = JSON.parse(JSON.stringify(tasks));
        currentTasks[taskCategory][index]['status'] = !tasks[taskCategory][index]['status']
        setTasks(currentTasks)
    }

    useEffect(() => {
        for (let [taskCategory, checklistObject] of Object.entries(tasks)) {
            if (taskCategory === "Note") continue;
            for (let status of Object.values(checklistObject)) {
                if (!status) {
                    setIncompleteChecklist();
                    return;
                }
            }
        }
        setCompleteChecklist();
    }, [tasks])

    return (
        Object.entries(tasks).map(([taskCategory, value]) => {
            return (
                <React.Fragment key={taskCategory}>
                    <Text style={styles.checklistHeader}>{taskCategory}</Text>
                    <DataTable style={{ width: '100%' }}>
                        {taskCategory === "Note" &&
                            value.map((taskTitle) => {
                                return (
                                    <React.Fragment key={taskTitle}>
                                        <View style={styles.note}>
                                            <Text>{taskTitle}</Text>
                                        </View>
                                        <Divider style={{ height: 2 }} />
                                    </React.Fragment>
                                )
                            })
                        }
                        {taskCategory !== "Note" &&
                            value.map(({ task, status }, index) => {
                                return (
                                    <DataTable.Row key={task} style={{ width: '100%', borderBottomWidth: 1, backgroundColor: status ? theme.colors.primaryGreen : 'white' }}>
                                        <DataTable.Cell style={styles.task}>{task}</DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 1 }}>
                                            <Checkbox
                                                status={status ? 'checked' : 'unchecked'}
                                                onPress={() => onPressCheckBox(taskCategory, index)}
                                            />
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                    </DataTable>
                </React.Fragment>
            )
        }))
}


function AssistancePage2({ navigation, route }) {
    const [startTime] = useState(new Date());
    const mapRef = useRef(null);
    const { location, destination } = useLocationContext();
    const { addHistory } = useHistoryContext();
    const [checklistStatus, setChecklistStatus] = useState(false);
    const [isfullyVaccinated, setIsfullyVaccinated] = useState(false);
    const [visible, setVisible] = React.useState(true);

    const setFullyVaccinated = () => {
        setIsfullyVaccinated(true);
        setVisible(false)
    };
    const setNotFullyVaccinated = () => {
        setIsfullyVaccinated(true);
        setVisible(false)
    };

    const onUserLocationChange = () => {
        const coordinatesRange = [];
        if (location && location.coordinates) coordinatesRange.push(location.coordinates)
        if (destination && destination.coordinates) coordinatesRange.push(destination.coordinates)
        mapRef.current?.fitToCoordinates(coordinatesRange, {
            edgePadding: {
                top: 100,
                right: 100,
                bottom: 100,
                left: 100
            }
        })
    }

    const setCompleteChecklist = useCallback(() => {
        setChecklistStatus(true)
    }, [])

    const setIncompleteChecklist = useCallback(() => {
        setChecklistStatus(false)
    }, [])

    const finishActivity = () => {
        // SAVE THE VISITED LOCATION AS HISTORY TO CONTEXT STATE
        const history = {
            location: destination.name ? destination.name : destination.address,
            date: moment(startTime).format("DD/MM/YY"),
            time: moment(startTime).format("hh:mma"),
            duration: moment().diff(moment(startTime), "minutes")
        }
        addHistory(history);

        // PASS INFO AND NAVIGATE TO HOME PAGE
        const finalDuration = new Date().getTime() - startTime.getTime();
        const finalLocation = location;
        const finalDestination = destination;
        navigation.navigate('HomePage',
            { duration: finalDuration, location: finalLocation, destination: finalDestination })
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Portal>
                <Dialog visible={visible}>
                    <Dialog.Title>Vaccination status</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Have you been fully vaccinated?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={setNotFullyVaccinated}>No</Button>
                        <Button onPress={setFullyVaccinated}>Yes</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Timer startTime={startTime} />
            <ScrollView>
                <MapView style={styles.map}
                    ref={mapRef}
                    onMapReady={onUserLocationChange}>
                    {location && destination &&
                        <MapViewDirections
                            origin={location.coordinates}
                            destination={destination.coordinates}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={5}
                            strokeColor={theme.colors.secondaryBlue}
                            lineDashPattern={[1]}
                        />}
                    {location && location.coordinates &&
                        <Marker coordinate={location.coordinates} pinColor={theme.colors.primaryBlue}>
                            <Callout>
                                <Text>Your Location</Text>
                                <Text>{location.address}</Text>
                            </Callout>
                        </Marker>}
                    {destination && destination.coordinates &&
                        <Marker coordinate={destination.coordinates}>
                            <Callout>
                                <Text>Your Destination</Text>
                                <Text>{destination.address}</Text>
                            </Callout>
                        </Marker>}
                </MapView>


                <View style={styles.container}>
                    <TaskChecklists setCompleteChecklist={setCompleteChecklist}
                        setIncompleteChecklist={setIncompleteChecklist} isfullyVaccinated={isfullyVaccinated} />
                    <Button style={checklistStatus ? styles.actionButton : styles.disabledButton} mode="contained" onPress={finishActivity} disabled={!checklistStatus}>Done
                    </Button>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    totalDurationStatusBar: {
        backgroundColor: theme.colors.primaryBlue,
        color: 'white',
        textAlign: 'center',
        padding: 5
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
    },
    container: {
        alignItems: 'center'
    },
    checklistHeader: {
        backgroundColor: theme.colors.secondaryGrey,
        color: '#616161',
        padding: 10,
        width: '100%'
    },
    task: {
        flex: 8
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 10,
    },
    actionButton: {
        backgroundColor: theme.colors.primaryBlue,
        width: '80%',
        marginVertical: 20
    },
    disabledButton: {
        backgroundColor: theme.colors.secondaryGrey,
        color: 'black',
        width: '80%',
        marginVertical: 20
    },
    note: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
    }
})

export default AssistancePage2
