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

  const sendAudio = async (uri) => {
    // Example of uri:
    // "file:///data/user/0/host.exp.exponent/cache/ExperienceData/UNVERIFIED-192.168.0.180-AwesomeProject/Audio/recording-2c3ad50d-6dab-4b61-912c-62d5ce4662df.m4a"
    // get audio file
    // const { recordingObj } = await Audio.Recording.createAsync(require(uri));
    // console.log(recordingObj);
    console.log('start sending audio file');
    // const data = {uri: uri};
    FileSystem.uploadAsync('https://asia-southeast1-meowmeow-280110.cloudfunctions.net/cloud-source-repositories-test', uri).then(res => {
      console.log(res);
    }).catch(err => {
        console.log(err);
    });
    // const data = {
    //   "uri":"uri from the app"
    // }
    // fetch('https://asia-southeast1-meowmeow-280110.cloudfunctions.net/cloud-source-repositories-test',{
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data), // send the URI string
    //   redirect: 'follow'
    // }).then(response => response.text())
    // .then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
    // });
  }

  async function startRecording() {
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
            extension: '.m4a',
            outputFormat: RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
            audioEncoder: RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
          },
          ios: {
            extension: '.caf',
            audioQuality: RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
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
      console.log(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }
  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined); 
    await recording.stopAndUnloadAsync();
    console.log(recording);

    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
    sendAudio(uri);
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Button onPress={recording ? stopRecording : startRecording}>{recording ? 'Stop Recording' : 'Start Recording'}</Button>
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
