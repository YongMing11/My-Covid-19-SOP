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
import { getStateAndPhase } from '../../shared/services/location.service';
import { Audio } from "expo-av";

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
    const [networkStatus, setNetworkStatus] = useState(true);
    const [recording, setRecording] = React.useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [sound, setSound] = React.useState();

    Geocoder.init(GOOGLE_MAPS_APIKEY);

    useEffect(() => {
        setVisible(true);

        const timeOut = setTimeout(() => {
            if (route.params) {
                setVisible(false);
            }
        }, 7000)
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
                    var address = json.results[0].formatted_address;
                    const { currentState, currentPhase } = getStateAndPhase(address);
                    setUserLocationAddress(address);
                    setUserLocationState(currentState);
                    setUserLocationPhase(currentPhase);
                    setNetworkStatus(true);
                })
                .catch(error => {
                    // below line commented for dev purpose
                    // setNetworkStatus(false);
                    setNetworkStatus(true);
                });
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
        console.log('onPressAction');
        // navigation.navigate('AssistancePage', { title: selectedAction })
    }

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
        let apiUrl = 'http://192.168.0.180:8080';
        // let apiUrl = 'https://asia-southeast1-meowmeow-280110.cloudfunctions.net/cloud-source-repositories-test';
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
    
        let formData = new FormData();
        formData.append('file', {
          uri,
          name: `recording.${fileType}`,
          type: `audio/wav`,
        });
    
        let options = {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        };
    
        console.log("POSTing " + uri + " to " + apiUrl);
        return fetch(apiUrl, options);
      }
    
      async function startRecording() {
        setIsRecording(true);
        try {
          console.log("Requesting permissions..");
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
          console.log("Starting recording..");
          const { recording } = await Audio.Recording.createAsync(
            {
              isMeteringEnabled: true,
              android: {
                extension: '.amr',
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
            }
          );
          setRecording(recording);
          console.log("Recording started");
        } catch (err) {
          console.error("Failed to start recording", err);
          setIsRecording(false);
        }
      }
      async function stopRecording() {
        console.log("Stopping recording..");
        setIsRecording(false);
    
        await recording.stopAndUnloadAsync().catch(err => console.log);
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
        playSound(uri);
        // sendAudio();
        uploadAudioAsync(uri)
        .then(res => res.json())
        .then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
          return err;
        });
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
                onDismiss={() => permissionFlow()}
                icon="map-marker-radius"
                iconColor="red"
                title="Location is required for My COVID-19 SOP to work properly"
                text="Please allow location access in settings"
            />
            <ModalComponent
                visible={!networkStatus}
                onDismiss={() => console.log("Close Network Modal")}
                icon="wifi-off"
                iconColor="black"
                title="No internet connection"
                text="Please make sure that WI-FI or mobile data is turned on."
            />

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
                // style={styles.fab}
                style={[styles.fab, isRecording? styles.fabRecording: styles.fabNotRecording]}
                small
                icon="microphone"
                onPress={isRecording ? stopRecording : startRecording}
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
        color: 'white',
        padding: 5
    }, 
    fabRecording: {
        backgroundColor: theme.colors.warning,
    },
    fabNotRecording: {
        backgroundColor: theme.colors.primaryBlue,
    },
});

export default HomePage;
