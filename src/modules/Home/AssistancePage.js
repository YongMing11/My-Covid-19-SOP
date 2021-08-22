import React, { createRef, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, Dimensions, Keyboard } from 'react-native';
import { Button, Paragraph } from 'react-native-paper';
import theme from '../../shared/constants/Theme';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '../../shared/constants/config';
import { useLocationContext } from '../../contexts/location-context';
import { getStateAndPhase } from '../../shared/services/location.service';

const AssistancePage = ({ navigation, route }) => {
    const { location, setUserLocation } = useLocationContext();
    const placesAPI_query = {
        key: GOOGLE_MAPS_APIKEY,
        language: 'en',
        components: "country:MY"
    }
    const mapRef = useRef(null);
    const locationInputRef = useRef();

    // const [location, setLocation] = useState({
    //     name: "Example Location",
    //     address: "Example Location 1, Jalan Example, Taman Example,Example Location 1, Jalan Example, Taman ExampleExample Location 1, Jalan Example, Taman Example",
    //     coordinates: {
    //         latitude: 3.16854,
    //         longitude: 101.53666
    //     }
    // });
    const [destination, setDestination] = useState({
        name: "",
        address: "",
        coordinates: {
            latitude: 3.16854,
            longitude: 101.53666
        }
    });

    useEffect(() => {
        locationInputRef.current?.setAddressText(location.address);
    }, [])

    useEffect(() => {
        onUserLocationChange();
    }, [location, destination])


    const searchBoxStyle = {
        container: { flex: 0, width: '100%', zIndex: 1 },
        listView: { backgroundColor: 'white' }
    }

    const onUserLocationChange = () => {
        mapRef.current?.fitToCoordinates([
            location.coordinates, destination.coordinates
        ], {
            edgePadding: {
                top: 100,
                right: 100,
                bottom: 300,
                left: 100
            }
        })
        console.log(destination)
    }

    const navigateToAssistancePage2 = () => {
        navigation.navigate('AssistancePage2', {
            location, destination
        })
    }

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                ref={locationInputRef}
                placeholder='Enter your location'
                fetchDetails={true}
                GooglePlacesDetailsQuery={{
                    rankby: "distance"
                }}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    setUserLocation({
                        name: details.name,
                        address: data.description,
                        coordinates: {
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng
                        }
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
                    const { currentState, currentPhase } = getStateAndPhase(data.description);
                    setDestination({
                        name: details.name,
                        address: data.description,
                        coordinates: {
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng
                        },
                        state: currentState,
                        phase: currentPhase
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
                        ...location.coordinates,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    {location &&
                        <Marker coordinate={location.coordinates} pinColor={theme.colors.primaryBlue}>
                            <Callout>
                                <Text style={{ fontWeight: 'bold' }}>Your Location</Text>
                                <Paragraph>{location.address}</Paragraph>
                            </Callout>
                        </Marker>}
                    {destination &&
                        <Marker coordinate={destination.coordinates}>
                            <Callout>
                                <Text style={{ fontWeight: 'bold' }}>Your Destination</Text>
                                <Text>{destination.address}</Text>
                            </Callout>
                        </Marker>}
                    <Circle center={location.coordinates} radius={1000} />
                </MapView>
                <Button style={styles.actionButton} mode="contained" onPress={navigateToAssistancePage2}
                // disabled={!location || !destination}
                >Confirm
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
