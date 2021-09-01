import React, { useState, useEffect, useRef } from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator } from "react-native";
import { FAB, Colors } from "react-native-paper";
import theme from "../../shared/constants/Theme";
import * as Location from "expo-location";
import { useLocationContext } from "../../contexts/location-context";
import Geocoder from "react-native-geocoding";
import { GOOGLE_MAPS_APIKEY } from "../../shared/constants/config";
import { getDurationString } from "@services/timer.service";
import action from "@mock/action.json";
import ModalComponent from "../../shared/components/modalComponent";
import { Audio } from "expo-av";
import { getLocationByAddress, getStateAndPhase } from "../../shared/services/location.service";
import { useIsFocused } from "@react-navigation/native";

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
    const { setUserAction, location, setUserLocationCoordinates, setUserLocationAddress, setUserLocationState, setUserLocationPhase, resetUserLocation, setUserDestination, resetUserDestination } = useLocationContext();
    const [visible, setVisible] = useState(true);
    const [locationPermissionStatus, setLocationPermissionStatus] = useState(true);
    const [gettingLocation, setGettingLocation] = useState(false);
    const [gettingTextFromSpeech, setGettingTextFromSpeech] = useState(false);
    const [networkStatus, setNetworkStatus] = useState(true);
    const [recording, setRecording] = React.useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [sound, setSound] = React.useState();
    const [openModal, setOpenModal] = React.useState(false);

    Geocoder.init(GOOGLE_MAPS_APIKEY);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setVisible(true);
            const timeOut = setTimeout(() => {
                if (route.params) {
                    setVisible(false);
                }
            }, 7000);
            permissionFlow();
            return () => clearTimeout(timeOut);
        } else {
            setGettingLocation(false);
        }
    }, [isFocused]);

    const permissionFlow = async () => {
        resetUserLocation();
        resetUserDestination();
        let { status } = await Location.requestForegroundPermissionsAsync().catch((error) => {
            console.log("Failed to get location permission");
        });
        if (status !== "granted") {
            //If permission is not granted, pop out a modal to ask changing permission manually in setting
            setLocationPermissionStatus(false);
            setErrorMsg("Permission to access location was denied");
            return;
        } else {
            setLocationPermissionStatus(true);
            setGettingLocation(true);
        }

        // let currentLocation = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High})
        let currentLocation = await Location.getCurrentPositionAsync({ accuracy: 6 })
            .then((data) => {
                setUserLocationCoordinates({ latitude: data.coords.latitude, longitude: data.coords.longitude });
                return data;
            })
            .catch((error) => {
                //Failed to get device location coordinates
                console.log("Failed to get high accuracy coordinate", error);
            });

        if (!currentLocation) {
            currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest })
                .then((data) => {
                    setUserLocationCoordinates({ latitude: data.coords.latitude, longitude: data.coords.longitude });
                    return data;
                })
                .catch((error) => {
                    //Failed to get device location coordinates
                    console.log("Failed to get low accuracy coordinate", error);
                });
        }

        if (!currentLocation) {
            currentLocation = await Location.getLastKnownPositionAsync({})
                .then((data) => {
                    setUserLocationCoordinates({ latitude: data.coords.latitude, longitude: data.coords.longitude });
                    return data;
                })
                .catch((error) => {
                    //Failed to get device location coordinates
                    console.log("Failed to get last known position coordinate", error);
                    setUserLocationCoordinates({ latitude: 3.1215657, longitude: 101.6564091 });
                });
        }

        getFullAddressBasedOnLocation(currentLocation);
    };

    const getFullAddressBasedOnLocation = (currentLocation) => {
        console.log(currentLocation);
        if (currentLocation) {
            // Reverse Geocode to get the full address of the user coordinates
            Geocoder.from(currentLocation.coords.latitude, currentLocation.coords.longitude)
                .then((json) => {
                    var address = json.results[0].formatted_address;
                    const { currentState, currentPhase } = getStateAndPhase(address);
                    setUserLocationAddress(address);
                    setUserLocationState(currentState);
                    setUserLocationPhase(currentPhase);
                    setNetworkStatus(true);
                    setGettingLocation(false);
                    console.log(address);
                })
                .catch((error) => {
                    // below line commented for dev purpose
                    console.log("getFullAddressBasedOnLocation error", error);
                    setNetworkStatus(false);
                });
        } else {
            console.log("currentLocation is falsy", currentLocation);
        }
    };

    // Action Object (mock/action.js), Destination Address String
    const speechAction = async (selectedAction, destinationAddress) => {
        console.log(`selectedAction: ${selectedAction}, destinationAddress: ${destinationAddress}`);
        const location = await getLocationByAddress(destinationAddress);
        console.log("location", location);
        setUserDestination(location);
        onPressAction(selectedAction);
    };

    const onPressAction = (selectedAction, index) => {
        console.log("onPressAction");
        // navigation.navigate('AssistancePage', { title: selectedAction })
        setUserAction(selectedAction);
        if (index === 4) {
            navigation.navigate("HospitalPage", { title: selectedAction.shortLabel });
        } else {
            navigation.navigate("AssistancePage", { title: selectedAction.shortLabel });
        }
    };

    const navigationAction = (pageName) => {
        setNetworkStatus(true);
        navigation.navigate(pageName);
    };

    async function playSound(uri) {
        console.log("Loading Sound");
        console.log(uri);
        const { sound } = await Audio.Sound.createAsync({ uri });
        // const { sound } = await Audio.Sound.createAsync(require('./5_pengagihan.mp3'));
        setSound(sound);

        console.log("Playing Sound");
        await sound.playAsync();
    }
    React.useEffect(() => {
        return sound
            ? () => {
                  console.log("Unloading Sound");
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);

    async function uploadAudioAsync(uri) {
        // let apiUrl = 'http://192.168.0.180:8080';
        let apiUrl = "https://asia-southeast1-meowmeow-280110.cloudfunctions.net/cloud-source-repositories-test";
        let uriParts = uri.split(".");
        let fileType = uriParts[uriParts.length - 1];

        let formData = new FormData();
        formData.append("file", {
            uri,
            name: `recording.${fileType}`,
            type: `audio/wav`, // TODO: is this correct?
        });

        let options = {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
        };

        console.log("POSTing " + uri + " to " + apiUrl);
        return fetch(apiUrl, options);
    }

    const isRecordingRef = useRef(isRecording);
    isRecordingRef.current = isRecording;
    const recordingRef = useRef(recording);
    recordingRef.current = recording;

    async function stopRecording() {
        if (isRecordingRef.current) {
            console.log("Stopping recording..");
            setIsRecording(false);
            setGettingTextFromSpeech(true);

            await recordingRef.current.stopAndUnloadAsync().catch((err) => console.log("err at stopAndUnloadAsync", err));
            const uri = recordingRef.current.getURI();
            console.log("Recording stopped and stored at", uri);
            playSound(uri);

            uploadAudioAsync(uri)
                .then((res) => res.json())
                .then((res) => {
                    setGettingTextFromSpeech(false);
                    console.log("response from speech to text:", res);
                    // const transcript = 'I want to go out to work at Subang';
                    const transcript = res;
                    const idx = transcript.indexOf("at");
                    const destination = transcript.substr(idx + 3);
                    const actionText = transcript.substring(0, idx);
                    const actionKeys = action.data.map((a) => {
                        return a.id.toLowerCase();
                    });
                    const actionIdx = actionKeys.findIndex((key) => {
                        return actionText.includes(key);
                    });
                    console.log(action.data[actionIdx], destination);
                    // uncomment below to complete the whole flow
                    return speechAction(action.data[actionIdx], destination);
                })
                .catch((err) => {
                    console.log("err at uploadAudioAsync", err);
                    return err;
                })
                .finally(() => {
                    setGettingTextFromSpeech(false);
                });
        } else {
            console.log("isRecordingRef is", isRecordingRef.current);
        }
    }

    const checkRecordingStatus = () => {
        setTimeout(() => {
            console.log("call setTimeout");
            setOpenModal(false);
            stopRecording();
        }, 10000);
    };

    async function startRecording() {
        setIsRecording(true);
        setOpenModal(true);
        checkRecordingStatus();
        try {
            console.log("Requesting permissions..");
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log("Starting recording..");
            const { recording } = await Audio.Recording.createAsync({
                isMeteringEnabled: true,
                android: {
                    extension: ".amr",
                    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AMR_NB,
                    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_NB,
                    sampleRate: 8000,
                    numberOfChannels: 1,
                    bitRate: 12200,
                },
                ios: {
                    extension: ".caf",
                    audioQuality: 0x7f,
                    sampleRate: 44100,
                    numberOfChannels: 2,
                    bitRate: 128000,
                    linearPCMBitDepth: 16,
                    linearPCMIsBigEndian: false,
                    linearPCMIsFloat: false,
                },
            });
            setRecording(recording);
            console.log("Recording started");
        } catch (err) {
            console.error("Failed to start recording", err);
            setIsRecording(false);
        }
    }

    return (
        <View style={styles.scene}>
            {/* Display Modal when user finish activity */}
            {route.params && <ModalComponent visible={visible} onDismiss={() => setVisible(false)} icon="check-circle" iconColor="green" title="You have completed your activity!" text={"Duration: " + getDurationString(route.params.duration)} location={route.params.location && route.params.location.name && route.params.location.name !== "" ? route.params.location.name : route.params.location.address} destination={route.params.destination.name || route.params.destination.address} />}

            {/* Modal pop out if user location permission is not granted, user needs to turn on in settings manually */}
            <ModalComponent visible={!locationPermissionStatus} onDismiss={() => permissionFlow()} icon="map-marker-radius" iconColor="red" title="Location is required for My COVID-19 SOP to work properly" text="Please allow location access in settings" />
            {/* Modal pop out if user click recording button */}
            <ModalComponent
                visible={openModal}
                onDismiss={() => {
                    setOpenModal(false);
                }}
                icon="emoticon-outline"
                iconColor="blue"
                title={'Reminder:\nmention action and destination with the word "at" in between'}
                text={"Example: I want go out to work at Subang,\nI want to go somewhere at Shah Alam\nThe recording will be stopped after 10 second"}
            />
            <ModalComponent visible={!networkStatus} onDismiss={() => console.log("Close Network Modal")} icon="wifi-off" iconColor="black" title="No internet connection" text="Please make sure that WI-FI or mobile data is turned on. You can visit other page while offline." showPageButton={true} navigationAction={navigationAction} />
            <ModalComponent visible={gettingLocation && networkStatus} onDismiss={() => console.log("Close Network Modal")} title="Accessing your location" text="Please make sure your location is turned on" />
            <ModalComponent visible={gettingTextFromSpeech} onDismiss={() => console.log("Close Speech-to-Text Runing Modal")} title="Converting speech to text" text="Please wait a while" />

            <ScrollView style={styles.scrollView}>
                <ImageBackground source={require("../../../assets/HomePage_bg.png")} style={styles.imgBackground}>
                    {/* <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}> */}
                    <View style={styles.areaStatusBar}>
                        <Text style={styles.areaStatusBar_description}>Your area is currently under</Text>
                        {location && location.phase && location.phase !== "" ? <Text style={styles.areaStatusBar_phase}>{location.phase}</Text> : <ActivityIndicator animating={true} color={Colors.amber100} />}
                    </View>
                    {/* </TouchableOpacity> */}
                </ImageBackground>
                <Image source={require("../../../assets/HomePage_car.png")} style={styles.carImg}></Image>
                <View style={styles.actionButton_Group}>
                    <Text style={styles.actionTitle}>What do you want to do?</Text>
                    {action.data.map((buttonContent, index) => (
                        <TouchableOpacity key={index} onPress={() => onPressAction(buttonContent, index)} disabled={gettingLocation || !networkStatus}>
                            <View style={styles.actionButton}>
                                <Text style={styles.actionButton_text}>{buttonContent.label}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <FAB style={[styles.fab, isRecording ? styles.fabRecording : styles.fabNotRecording]} small icon="microphone" onPress={isRecording ? stopRecording : startRecording} disabled={gettingLocation || !networkStatus} />
        </View>
    );
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: "white",
        padding: 25,
        margin: 25,
    },
    scene: {
        backgroundColor: "white",
        alignItems: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    scrollView: {
        // flex: 1,
        backgroundColor: "white",
    },
    imgBackground: {
        width: Dimensions.get("window").width,
        height: 120,
    },
    header: {
        padding: 15,
        fontSize: 25,
        color: "#FFF",
    },
    areaStatusBar: {
        backgroundColor: "#023E90",
        margin: 15,
        marginTop: 5,
        padding: 10,
        alignItems: "center",
        borderRadius: 8,
    },
    areaStatusBar_description: {
        color: "#FFF",
        fontSize: 18,
    },
    areaStatusBar_phase: {
        color: "#FFF",
        fontSize: 35,
        fontWeight: "bold",
        includeFontPadding: false,
    },
    carImg: {
        width: Dimensions.get("window").width,
        height: 120,
        resizeMode: "contain",
    },
    actionButton_Group: {
        padding: 15,
        width: "100%",
    },
    actionTitle: {
        fontSize: 22,
        textAlign: "center",
        padding: 5,
    },
    actionButton: {
        color: "#0E4DA4",
        backgroundColor: "#fff",
        borderRadius: 8,
        height: 65,
        marginBottom: 5,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
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
        color: "black",
        fontSize: 18,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
        color: "white",
        padding: 5,
    },
    fabRecording: {
        backgroundColor: theme.colors.warning,
    },
    fabNotRecording: {
        backgroundColor: theme.colors.primaryBlue,
    },
});

export default HomePage;
