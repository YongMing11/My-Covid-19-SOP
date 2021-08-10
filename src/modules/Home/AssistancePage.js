import React, { createRef, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, Dimensions, Keyboard } from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../../shared/constants/Theme';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '../../shared/constants/config';

const AssistancePage = ({ navigation, route }) => {
    const placesAPI_query = {
        key: GOOGLE_MAPS_APIKEY,
        language: 'en',
        components: "country:MY"
    }
    const mapRef = useRef(null);

    const [location, setLocation] = useState({
        latitude: 3.1192,
        longitude: 101.6538
    });
    const [destination, setDestination] = useState(null);

    useEffect(() => {
        onUserLocationChange();
    }, [location, destination])


    const searchBoxStyle = {
        container: { flex: 0, width: '100%', zIndex: 1 },
        listView: { backgroundColor: 'white' }
    }

    const onUserLocationChange = () => {
        mapRef.current.fitToCoordinates([
            location, destination
        ], {
            edgePadding: {
                top: 100,
                right: 100,
                bottom: 300,
                left: 100
            }
        })
    }

    const navigateToAssistancePage2 = () => {
        navigation.navigate('AssistancePage2', {
            location, destination
        })
    }

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder='Enter your location'
                fetchDetails={true}
                GooglePlacesDetailsQuery={{
                    rankby: "distance"
                }}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                    setLocation({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng
                    })
                }}
                query={placesAPI_query}
                styles={searchBoxStyle}
            />
            <GooglePlacesAutocomplete
                placeholder='Enter your destination'
                fetchDetails={true}
                GooglePlacesDetailsQuery={{
                    rankby: "distance"
                }}
                onPress={(data, details = null) => {
                    setDestination({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng
                    })
                }}
                query={placesAPI_query}
                styles={searchBoxStyle}
            />
            <View style={{ flex: 1, alignItems: 'center', zIndex: 1 }}>
                <MapView style={styles.map}
                    ref={mapRef}
                    onUserLocationChange={onUserLocationChange}
                    onMapReady={onUserLocationChange}
                    initialRegion={{
                        ...location,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
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
                    <Circle center={location} radius={1000} />
                </MapView>
                <Button style={styles.actionButton} mode="contained" onPress={navigateToAssistancePage2}
                // disabled={!location || !destination}
                >
                    Confirm
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        alignItems: 'center'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    actionButton: {
        position: 'absolute',
        bottom: 150,
        backgroundColor: theme.colors.primaryBlue,
        width: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        zIndex: 2
    }
})

export default AssistancePage
