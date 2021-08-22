import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Searchbar, List, Menu, Button } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import info from '@mock/sop.json';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

const SOPPage2 = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSectors, setActiveSectors] = useState(info.sectors);
  const [recording, setRecording] = React.useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const icon = 'chevron-right';

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if(query === ''){setActiveSectors(info.sectors); return;}
    const sectorsResult = info.sectors.filter(s => {
      return s.toLowerCase().includes(query.toLowerCase());
    });
    setActiveSectors(sectorsResult);
  };

  const onPressAction = (sector) => {
    navigation.navigate('SOPPage3',{title:sector});
  };
  const uploadAudio = async () => {
    const uri = recording.getURI();
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          try {
            resolve(xhr.response);
          } catch (error) {
            console.log("error in uploadAudio when trying to resolve:", error);
          }
        };
        xhr.onerror = (e) => {
          console.log(e);
          reject(new TypeError("Network request failed in uploadAudio"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      if (blob != null) {
        sendAudio(blob)
      } else {
        console.log("erroor with blob");
      }
    } catch (error) {
      console.log("error in uploadAudio:", error);
    }
  };
  const sendAudio = async (blob) => {
    // Example of uri:
    // "file:///data/user/0/host.exp.exponent/cache/ExperienceData/UNVERIFIED-192.168.0.180-AwesomeProject/Audio/recording-2c3ad50d-6dab-4b61-912c-62d5ce4662df.m4a"
    // get audio file
    // const { recordingObj } = await Audio.Recording.createAsync(require(uri));
    // console.log(recordingObj);
    console.log('start sending audio file');

    // Use expo File system to call API - failed
    // FileSystem.uploadAsync('https://asia-southeast1-meowmeow-280110.cloudfunctions.net/cloud-source-repositories-test', uri).then(res => {
    //   console.log(res);
    // }).catch(err => {
    //     console.log(err);
    // });

    console.log(blob);
    // const formData = new FormData();
    // // formData.append('api_key', CLOUDINARY_API_KEY);
    // formData.append('file', {
    //   uri: recording.getURI(),
    //   // uri: blob,
    //   name: recording.getURI().split('/').pop(),
    //   type: "audio/mpeg"
    // });
    fetch('https://asia-southeast1-meowmeow-280110.cloudfunctions.net/cloud-source-repositories-test',{
      method: 'POST',
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "multipart/form-data",
      // },
      headers: {
        'Content-Type': 'application/octet-stream'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: blob, // send the audio file
    })
    .then(response => {
      console.log('Get response from Functions.');
      console.log(typeof response);
      return response.text();
    }).then(res => {
      console.log(JSON.stringify(res));
    }).catch(err => {
      console.log('Error caught in app=>',err);
    }).finally(() => {
      setRecording(undefined);
      console.log('in finally');
    });
  }

  async function startRecording() {
    setIsRecording(true);
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        {
          isMeteringEnabled: true,
          android: {
            // extension: '.mp3',
            // outputFormat: 2,
            // audioEncoder: 3,
            // sampleRate: 44100,
            // numberOfChannels: 2,
            // bitRate: 128000,
            extension: '.amr',
            outputFormat: 3,
            audioEncoder: 1,
            sampleRate: 8000,
            numberOfChannels: 1,
            bitRate: 128000,
          },
          ios: {
            extension: '.caf',
            audioQuality: 0x7f,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
          },
        }
        // above structure is get from node_modules
        //  Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      // console.log(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
      setIsRecording(false);
    }
  }
  async function stopRecording() {
    console.log('Stopping recording..');
    // setRecording(undefined); 
    setIsRecording(false);

    await recording.stopAndUnloadAsync();
    console.log(recording);

    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
    // sendAudio();
    uploadAudio();
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Button onPress={isRecording ? stopRecording : startRecording}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Button>
      {/* <Button onPress={sendAudio}
      >{recording ? 'Stop Recording' : 'Start Recording'}
      </Button> */}
      <View>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>
      {activeSectors.map((sector, index) => (
          <List.Item
            key={index}
            style={styles.actionItem}
            onPress={()=>onPressAction(sector)}
            title={sector}
            right={(props) => (
              <List.Icon
                {...props}
                style={{ marginRight: 0 }}
                icon={icon}
              />
            )}
          />
      ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SOPPage2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  actionItem: {
    color: "#0E4DA4",
    backgroundColor: "#fff",
    height: 65,
    justifyContent: "center",
    width: "100%",
    elevation: 4,
    textAlign: "left",
    paddingLeft: 10,
  },
});
