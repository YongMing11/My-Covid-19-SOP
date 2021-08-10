import React, { useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import theme from '../../shared/constants/Theme'
import { DataTable, Checkbox } from 'react-native-paper';
import MapView, { Callout, Marker } from 'react-native-maps';
import { GOOGLE_MAPS_APIKEY } from '../../shared/constants/config';
import MapViewDirections from 'react-native-maps-directions';

function AssistancePage2({ navigation, route }) {
    const totalDuration = "5 MIN 20 SEC"
    const mapRef = useRef(null);
    const [checked, setChecked] = React.useState(false);
    const { location, destination } = route.params;
    const tasks = [
        {
            title: 'Wear Mask',
            checked: false
        },
        {
            title: 'Make sure phone battery is enough',
            checked: false
        },
        {
            title: 'Bring MITI letter',
            checked: false
        },
        {
            title: 'Bring MITI letter',
            checked: false
        }
    ]

    const onUserLocationChange = () => {
        mapRef.current.fitToCoordinates([
            location, destination
        ], {
            edgePadding: {
                top: 100,
                right: 100,
                bottom: 100,
                left: 100
            }
        })
    }


    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.totalDurationStatusBar}>Your Total Duration at Outside: {totalDuration}</Text>
            <ScrollView>
                <MapView style={styles.map}
                    ref={mapRef}
                    // onUserLocationChange={onUserLocationChange}
                    onMapReady={onUserLocationChange}
                    initialRegion={{
                        ...location,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <MapViewDirections
                        origin={location}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        lineDashPattern={[0]}
                    />
                    {location &&
                        <Marker coordinate={location} pinColor={theme.colors.primaryBlue}>
                            <Callout>
                                <Text>Your Location</Text>
                            </Callout>
                        </Marker>}
                    {destination &&
                        <Marker coordinate={destination}>
                            <Callout>
                                <Text>Your Destination</Text>
                            </Callout>
                        </Marker>}
                </MapView>

                <Text style={styles.checklistHeader}>Before starting your journey</Text>
                <DataTable style={{ width: '100%' }}>
                    {tasks.map((task, index) => {
                        return (
                            <DataTable.Row key={index} style={{ borderBottomWidth: 1, backgroundColor: checked ? theme.colors.primaryGreen : 'white' }}>
                                <DataTable.Cell style={styles.task}>{task.title}</DataTable.Cell>
                                <DataTable.Cell>
                                    <Checkbox
                                        status={checked ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setChecked(!checked);
                                        }}
                                    />
                                </DataTable.Cell>
                            </DataTable.Row>
                        )
                    })}

                </DataTable>
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
    checklistHeader: {
        backgroundColor: theme.colors.secondaryGrey,
        color: '#616161',
        padding: 10
    },
    task: {
        flex: 9
    }
})

export default AssistancePage2
