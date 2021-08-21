import React, { useState, useEffect } from 'react'
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { FAB, Portal, Modal, Title, IconButton, DataTable, Colors } from 'react-native-paper';
import theme from '../../shared/constants/Theme';
import * as Location from 'expo-location';
import { useLocationContext } from '../../contexts/location-context';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_MAPS_APIKEY } from '../../shared/constants/config';
import { getDurationString } from '@services/timer.service';
import info from '@mock/sop.json';
import ModalComponent from '../../shared/components/modalComponent';

function HomePage({ navigation, route }) {
    // === FOR TESTING PURPOSE ===
    // console.log(route.params)
    // route.params = {
    //     "destination": {
    //         "address": "Yong Peng, Johor, Malaysia",
    //         "coordinates": {
    //             "latitude": 2.01196,
    //             "longitude": 103.0581698,
    //         },
    //         "name": "Yong Peng",
    //     },
    //     "duration": 3009,
    //     "location": {
    //         "address": "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
    //         "coordinates": {
    //             "latitude": 37.4220002,
    //             "longitude": -122.0840167,
    //         },
    //         "name": "",
    //         "state": "",
    //     },
    // }
    const states = ['JOHOR', 'KEDAH', 'KELANTAN', 'MALACCA', 'NEGERI SEMBILAN', 'PAHANG', 'PENANG', 'PERAK', 'PERLIS', 'SABAH', 'SARAWAK', 'SELANGOR', 'TERANGGANU', 'KUALA LUMPUR', 'LABUAN', 'PUTRAJAYA'];
    const { setUserLocationCoordinates, setUserLocationAddress, setUserLocationState, setUserLocationPhase, getUserLocation } = useLocationContext();
    const [visible, setVisible] = useState(true);
    const [locationPermissionStatus, setLocationPermissionStatus] = useState(true);
    Geocoder.init(GOOGLE_MAPS_APIKEY);

    useEffect(() => {
        setVisible(true);
        const timeOut = setTimeout(() => {
            if (route.params) {
                setVisible(false);
            }
        }, 5000)
        permissionFlow();
        return () => clearTimeout(timeOut);
    }, [route.params])

    const permissionFlow = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync().catch(error => {
            console.log("Failed to get location permission")
        });
        if (status !== 'granted') {
            //If permission is not granted, pop out a modal to ask changing permission manually in setting
            setLocationPermissionStatus(false);
            setErrorMsg('Permission to access location was denied');
            return;
        } else {
            setLocationPermissionStatus(true);
        }

        let location = await Location.getCurrentPositionAsync({})
            .then(data => {
                setUserLocationCoordinates({ latitude: data.coords.latitude, longitude: data.coords.longitude })
                return data;
            }).catch(error => {
                //Failed to get device location coordinates
                console.log('Failed to get coordinate')
                const defaultLatitude = 3.11111;
                const defaultLongitude = 255.11111;
                setUserLocationCoordinates({ latitude: 3.11111, longitude: 255.11111 })
            });

        getFullAddressBasedOnLocation(location);
    }

    const getFullAddressBasedOnLocation = (location) => {
        if (location) {
            // Reverse Geocode to get the full address of the user coordinates
            Geocoder.from(location.coords.latitude, location.coords.longitude)
                .then(json => {
                    var addressComponent = json.results[0].formatted_address;
                    let currentState = '';
                    let currentPhase = '';

                    states.forEach((state) => {
                        if (addressComponent.toUpperCase().includes(state)) {
                            currentState = state;
                        }
                    })
                    for (let phase of info.phases) {
                        for (let area of phase.areas) {
                            if (addressComponent.toUpperCase().includes(area.toUpperCase())) {
                                currentState = area.toUpperCase();
                                currentPhase = phase.title;
                                break;
                            }
                        }
                        if (currentState && currentState !== "") break;
                    }
                    setUserLocationAddress(addressComponent);
                    setUserLocationState(currentState);
                    setUserLocationPhase(currentPhase);
                })
                .catch(error => console.warn(error));
        }

    }

    const actionButtons = [
        { label: 'I want to go out to eat', shortLabel: 'Go out to eat' },
        { label: 'I want to go out to buy things', shortLabel: 'Go out to buy things' },
        { label: 'I want to open my store', shortLabel: 'Open my store' },
        { label: 'I want to go somewhere else', shortLabel: 'Go somewhere else' },
        { label: 'I have emergency', shortLabel: 'Emergency' },
    ]

    const onPressAction = (selectedAction) => {
        navigation.navigate('AssistancePage', { title: selectedAction })
    }

    return (
        <View style={styles.scene}>
            {/* Display Modal when user finish activity */}
            {route.params &&
                <ModalComponent
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    icon="check-circle"
                    iconColor="green"
                    title="You have completed your activity!"
                    text={"Duration: " + getDurationString(route.params.duration)}
                    location={route.params.location}
                    destination={route.params.destination}
                />
            }

            {/* Modal pop out if user location permission is not granted, user needs to turn on in settings manually */}
            <ModalComponent
                visible={!locationPermissionStatus}
                onDismiss={() => setVisible(false)}
                icon="map-marker-radius"
                iconColor="red"
                title="Location is required for My COVID-19 SOP to work properly"
                text="Please allow location access in settings"
            />
            {/* <Portal>
                <Modal visible={!locationPermissionStatus}
                    onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton
                            icon="map-marker-radius"
                            color="red"
                            size={40}
                        />
                        <Title style={{ textAlign: 'center' }}>Location is required for My COVID-19 SOP to work properly</Title>
                        <Text>Please allow location access in settings</Text>
                    </View>
                </Modal>
            </Portal> */}

            <ScrollView style={styles.scrollView}>
                <ImageBackground source={require('../../../assets/HomePage_bg.png')} style={styles.imgBackground}>
                    <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
                        <View style={styles.areaStatusBar}>
                            <Text style={styles.areaStatusBar_description}>Your area is currently under</Text>
                            {getUserLocation().phase !== "" ?
                                <Text style={styles.areaStatusBar_phase}>{getUserLocation().phase}</Text> :
                                <ActivityIndicator animating={true} color={Colors.amber100} />
                            }
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
                <Image source={require('../../../assets/HomePage_car.png')} style={styles.carImg}></Image>
                <View style={styles.actionButton_Group}>
                    <Text style={styles.actionTitle}>What do you want to do?</Text>
                    {actionButtons.map((buttonContent, index) =>
                        <TouchableOpacity key={index} onPress={() => onPressAction(buttonContent.shortLabel)}>
                            <View style={styles.actionButton}>
                                <Text style={styles.actionButton_text}>{buttonContent.label}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
            <FAB
                style={styles.fab}
                small
                icon="microphone"
                onPress={() => console.log('Pressed')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        padding: 25,
        margin: 25
    },
    scene: {
        backgroundColor: 'white',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    scrollView: {
        // flex: 1,
        backgroundColor: 'white'
    },
    imgBackground: {
        width: Dimensions.get('window').width,
        height: 120,
    },
    header: {
        padding: 15,
        fontSize: 25,
        color: '#FFF',
    },
    areaStatusBar: {
        backgroundColor: '#023E90',
        margin: 15,
        marginTop: 5,
        padding: 10,
        alignItems: 'center',
        borderRadius: 8
    },
    areaStatusBar_description: {
        color: '#FFF',
        fontSize: 18,
    },
    areaStatusBar_phase: {
        color: '#FFF',
        fontSize: 35,
        fontWeight: 'bold',
        includeFontPadding: false
    },
    carImg: {
        width: Dimensions.get('window').width,
        height: 120,
        resizeMode: 'contain',
    },
    actionButton_Group: {
        padding: 15,
        width: '100%',
    },
    actionTitle: {
        fontSize: 22,
        textAlign: 'center',
        padding: 5
    },
    actionButton: {
        color: '#0E4DA4',
        backgroundColor: '#fff',
        borderRadius: 8,
        height: 65,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    actionButton_text: {
        color: 'black',
        fontSize: 18,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: theme.colors.primaryBlue,
        color: 'white',
        padding: 5
    }

});

export default HomePage;
