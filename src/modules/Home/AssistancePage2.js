import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import theme from '../../shared/constants/Theme'
import { DataTable, Checkbox, Button } from 'react-native-paper';
import MapView, { Callout, Marker } from 'react-native-maps';
import { GOOGLE_MAPS_APIKEY } from '../../shared/constants/config';
import MapViewDirections from 'react-native-maps-directions';

function Timer({ startTime }) {
    const [duration, setDuration] = useState("0 MIN 0 SEC");
    useEffect(() => {
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

function TaskChecklists() {
    const initialTask = {
        "Before starting your journey": {
            'Wear mask': false,
            'Make sure phone battery is enough': false,
            'Bring MITI letter': false,
            'Bring Employer letter/Staff Pass': false,
            'Have only one passenger': false
        },
        "At destination": {
            'Record temperature': false,
            'Scan MySejahtera QR code': false
        }
    }
    const [tasks, setTasks] = useState(initialTask);
    const onPressCheckBox = (taskCategory, taskTitle) => {
        const currentTasks = JSON.parse(JSON.stringify(tasks));
        currentTasks[taskCategory][taskTitle] = !tasks[taskCategory][taskTitle]
        setTasks(currentTasks)
    }

    return (
        Object.entries(tasks).map(([taskCategory, value], index) => {
            console.log(index)
            return (
                <React.Fragment key={taskCategory}>
                    <Text style={styles.checklistHeader}>{taskCategory}</Text>
                    <DataTable style={{ width: '100%' }}>
                        {Object.entries(value).map(([taskTitle, checked], index) => {
                            return (
                                <DataTable.Row key={taskTitle} style={{ width: '100%', borderBottomWidth: 1, backgroundColor: checked ? theme.colors.primaryGreen : 'white' }}>
                                    <DataTable.Cell style={styles.task}>{taskTitle}</DataTable.Cell>
                                    <DataTable.Cell style={{ flex: 1 }}>
                                        <Checkbox
                                            status={checked ? 'checked' : 'unchecked'}
                                            onPress={() => onPressCheckBox(taskCategory, taskTitle)}
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
    const startTime = new Date();
    const mapRef = useRef(null);
    const { location, destination } = route.params;

    const onUserLocationChange = () => {
        mapRef.current.fitToCoordinates([
            location.coordinates || null, destination.coordinates || null
        ], {
            edgePadding: {
                top: 100,
                right: 100,
                bottom: 100,
                left: 100
            }
        })
    }

    const finishActivity = () => {
        const finalDuration = new Date().getTime() - startTime.getTime();
        navigation.navigate('HomePage', { duration: finalDuration, location, destination })
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Timer startTime={startTime} />
            <ScrollView>
                <MapView style={styles.map}
                    ref={mapRef}
                    onMapReady={onUserLocationChange}>
                    <MapViewDirections
                        origin={location.coordinates}
                        destination={destination.coordinates}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={5}
                        strokeColor={theme.colors.secondaryBlue}
                        lineDashPattern={[1]}
                    />
                    {location &&
                        <Marker coordinate={location.coordinates} pinColor={theme.colors.primaryBlue}>
                            <Callout>
                                <Text>Your Location</Text>
                                <Text>{location.address}</Text>
                            </Callout>
                        </Marker>}
                    {destination &&
                        <Marker coordinate={destination.coordinates}>
                            <Callout>
                                <Text>Your Destination</Text>
                                <Text>{destination.address}</Text>
                            </Callout>
                        </Marker>}
                </MapView>


                <View style={styles.container}>
                    <TaskChecklists />
                    <Button style={styles.actionButton} mode="contained" onPress={finishActivity}>Done
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
    }
})

export default AssistancePage2
