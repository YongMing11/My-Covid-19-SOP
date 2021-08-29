import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { Searchbar, List, Menu, Button } from "react-native-paper";
import info from "@mock/sop.json";
import { Audio } from "expo-av";

const SOPPage2 = ({ navigation }) => {
  const icon = "chevron-right";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSectors, setActiveSectors] = useState(info.sectors);
  const [recording, setRecording] = React.useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [sound, setSound] = React.useState();

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

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setActiveSectors(info.sectors);
      return;
    }
    const sectorsResult = info.sectors.filter((s) => {
      return s.toLowerCase().includes(query.toLowerCase());
    });
    setActiveSectors(sectorsResult);
  };

  const onPressAction = (sector) => {
    navigation.navigate("SOPPage3", { title: sector });
  };

  async function uploadAudioAsync(uri) {
    console.log("Uploading " + uri);
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
      // sample response if returned text/html
      // {"type":"default","status":200,"ok":true,"statusText":"","headers":{"map":{"x-cloud-trace-context":"df30dd1559853ecbbe1ff713a4df5533;o=1","content-type":"text/html; charset=utf-8","function-execution-id":"m7gm271eujuc","server":"Google Frontend","date":"Sun, 29 Aug 2021 09:22:14 GMT","alt-svc":"h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000,h3-T051=\":443\"; ma=2592000,h3-Q050=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000,quic=\":443\"; ma=2592000; v=\"46,43\"","content-length":"83"}},"url":"https://asia-southeast1-meowmeow-280110.cloudfunctions.net/cloud-source-repositories-test","bodyUsed":false,"_bodyInit":{"_data":{"size":83,"offset":0,"blobId":"9c3368e7-7180-4c69-8215-1ed5949db4e8","__collector":{}}},"_bodyBlob":{"_data":{"size":83,"offset":0,"blobId":"9c3368e7-7180-4c69-8215-1ed5949db4e8","__collector":{}}}}
      // sample response if returned application/json
      // {"type":"default","status":200,"ok":true,"statusText":"","headers":{"map":{"content-length":"86","content-type":"application/json","date":"Sun, 29 Aug 2021 09:32:54 GMT","server":"Werkzeug/2.0.1 Python/3.9.1"}},"url":"http://192.168.0.180:8080/","bodyUsed":false,"_bodyInit":{"_data":{"size":86,"offset":0,"blobId":"b89b3973-e195-46ea-9f9f-53e538e19f88","__collector":{}}},"_bodyBlob":{"_data":{"size":86,"offset":0,"blobId":"b89b3973-e195-46ea-9f9f-53e538e19f88","__collector":{}}}}
    }).catch(err => {
      console.log(err);
      return err;
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button onPress={isRecording ? stopRecording : startRecording}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>
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
            onPress={() => onPressAction(sector)}
            title={sector}
            right={(props) => (
              <List.Icon {...props} style={{ marginRight: 0 }} icon={icon} />
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
