import React, { createRef, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Dimensions, Keyboard, Image } from "react-native";
import { Button, Paragraph, IconButton, List } from "react-native-paper";
import theme from "../../shared/constants/Theme";
import MapView, { Marker, Callout, Circle } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "../../shared/constants/config";
import { useLocationContext } from "../../contexts/location-context";
import { checkCrossState, getStateAndPhase } from "../../shared/services/location.service";
import ModalComponent from "../../shared/components/modalComponent";

const AssistancePage = ({ navigation, route }) => {
    const { action, location, setUserLocation, destination, setUserDestination, resetUserDestination } = useLocationContext();
    const placesAPI_query = {
        key: GOOGLE_MAPS_APIKEY,
        language: "en",
        components: "country:MY",
    };
    const mapRef = useRef(null);
    const locationInputRef = useRef();
    const destinationInputRef = useRef();
    const [isDifferentStateModalVisible, setIsDifferentStateModalVisible] = useState(false);

    const DEFAULT_COORDINATES = {
        latitude: 3.1215657,
        longitude: 101.6564091,
    };
    // const [location, setLocation] = useState({
    //     name: "Example Location",
    //     address: "Example Location 1, Jalan Example, Taman Example,Example Location 1, Jalan Example, Taman ExampleExample Location 1, Jalan Example, Taman Example",
    //     coordinates: {
    //         latitude: 3.16854,
    //         longitude: 101.53666
    //     },
    //  state: "SELANGOR", phase: "PPN Phase 1"
    // });
    // const [destination, setDestination] = useState({
    //     name: "",
    //     address: "",
    //     coordinates: {
    //         latitude: 3.16854,
    //         longitude: 101.53666
    //     },
    //  state: "SELANGOR", phase: "PPN Phase 1"
    // });

    useEffect(() => {
        if (location && location.phase && location.address) {
            locationInputRef.current?.setAddressText(location.address);
        }

        if (destination && destination.address && destination.address.length !== 0) {
            destinationInputRef.current?.setAddressText(destination.address);
        }
    }, []);

    useEffect(() => {
        if (route.params.hospitalDestination) {
            destinationInputRef.current?.setAddressText(route.params.hospitalDestination);
            route.params.hospitalDestination = null;
        }
        onUserLocationChange();
        // OPEN THE ALERT MODAL TO TELL USER THAT CROSS STATE IS NOT ALLOWED
        if (location && destination && location.state && destination.state && checkCrossState(location.state, destination.state) && !isDifferentStateModalVisible) {
            setIsDifferentStateModalVisible(true);
        }
    }, [location, destination, route.params.hospitalDestination]);

    const resetDestination = () => {
        setIsDifferentStateModalVisible(false);
        resetUserDestination();
        destinationInputRef.current?.setAddressText("");
    };

    const searchBoxStyle = {
        container: { flex: 0, width: "100%", zIndex: 1 },
        listView: { backgroundColor: "white" },
    };

    // SET THE MAP TO FIT THE COORDINATES OF LOCATION AND DESTINATION
    const onUserLocationChange = () => {
        if (location && destination && location.state && destination.state && checkCrossState(location.state, destination.state)) {
            return;
        }
        const coordinatesRange = [];
        if (location && location.coordinates) coordinatesRange.push(location.coordinates);
        if (destination && destination.coordinates) coordinatesRange.push(destination.coordinates);
        mapRef.current?.fitToCoordinates(coordinatesRange, {
            edgePadding: {
                top: 100,
                right: 100,
                bottom: 300,
                left: 100,
            },
        });
    };

    const navigateToAssistancePage2 = () => {
        navigation.navigate("AssistancePage2", {
            location,
            destination,
        });
    };

    return (
        <View style={styles.container}>
            <ModalComponent visible={isDifferentStateModalVisible} onDismiss={() => resetDestination()} icon="alert-circle" iconColor="#721d50" title="Crossing state is not allowed" text="Please choose another destination to proceed" location={location.state} destination={destination.state} />

            <GooglePlacesAutocomplete
                ref={locationInputRef}
                placeholder="Enter your location"
                fetchDetails={true}
                GooglePlacesDetailsQuery={{
                    rankby: "distance",
                }}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    const { currentState, currentPhase } = getStateAndPhase(data.description);
                    setUserLocation({
                        name: details.name,
                        address: data.description,
                        coordinates: {
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                        },
                        state: currentState,
                        phase: currentPhase,
                    });
                }}
                query={placesAPI_query}
                styles={searchBoxStyle}
            />
            <GooglePlacesAutocomplete
                ref={destinationInputRef}
                placeholder="Enter your destination"
                fetchDetails={true}
                GooglePlacesDetailsQuery={{
                    rankby: "distance",
                }}
                onPress={(data, details = null) => {
                    const { currentState, currentPhase } = getStateAndPhase(data.description);
                    setUserDestination({
                        name: details.name,
                        address: data.description,
                        coordinates: {
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                        },
                        state: currentState,
                        phase: currentPhase,
                    });
                }}
                query={placesAPI_query}
                styles={searchBoxStyle}
            />
            <View style={{ flex: 1, alignItems: "center", zIndex: 1 }}>
                <MapView
                    style={styles.map}
                    ref={mapRef}
                    onUserLocationChange={onUserLocationChange}
                    onMapReady={onUserLocationChange}
                    initialRegion={{
                        latitude: location.coordinates ? location.coordinates.latitude : DEFAULT_COORDINATES.latitude,
                        longitude: location.coordinates ? location.coordinates.longitude : DEFAULT_COORDINATES.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {location && location.coordinates && (
                        <Marker coordinate={location.coordinates} pinColor={theme.colors.primaryBlue}>
                            <Callout>
                                <Text style={{ fontWeight: "bold" }}>Your Location</Text>
                                <Paragraph>{location.address}</Paragraph>
                            </Callout>
                        </Marker>
                    )}
                    {destination && destination.coordinates && (
                        <Marker coordinate={destination.coordinates}>
                            <Callout style={styles.bubble}>
                                {/* <View style={styles.bubble}> */}
                                <Text style={{ fontWeight: "bold" }}>Your Destination</Text>
                                <Text style={styles.destinationText}>{destination.address}</Text>
                                <Text style={styles.review}>Review</Text>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    {[1, 2, 3, 4].map((star) => {
                                        return <List.Icon key={star} style={styles.rating} icon="star" color="blue" />;
                                    })}
                                    {[5].map((star) => {
                                        return <List.Icon key={star} style={styles.rating} icon="star-outline" color="blue" />;
                                    })}
                                </View>
                                <Text style={styles.viewMoreButton}>View More</Text>
                                {/* </View> */}
                            </Callout>
                        </Marker>
                    )}
                    {location && (location.phase === "PPN Phase 1" || location.phase === "PPN Phase 2") && <Circle center={location.coordinates} radius={10000} />}
                </MapView>
                <Button style={!location.address || !destination.address ? styles.disabledButton : styles.actionButton} mode="contained" onPress={navigateToAssistancePage2} disabled={!location.address || !destination.address}>
                    Confirm
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        alignItems: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    actionButton: {
        position: "absolute",
        bottom: 140,
        backgroundColor: theme.colors.primaryBlue,
        width: "80%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        zIndex: 2,
    },
    disabledButton: {
        position: "absolute",
        bottom: 140,
        backgroundColor: theme.colors.secondaryGrey,
        color: "black",
        width: "80%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        zIndex: 2,
    },
    viewMoreButton: {
        // position: 'absolute',
        // bottom: 50,
        // backgroundColor: theme.colors.warning,
        color: "blue",
        // width: '80%',
        // elevation: 4,
        // zIndex: 2
    },
    bubble: {
        flexDirection: "column",
        alignSelf: "flex-start",
        width: 250,
        padding: 15,
        borderWidth: 0.5,
        borderColor: "#ccc",
        borderRadius: 6,
    },
    destinationText: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    rating: {
        fontWeight: "bold",
        width: 20,
        padding: 0,
    },
    review: {
        top: 8,
        fontWeight: "bold",
        color: "blue",
    },
});

export default AssistancePage;
