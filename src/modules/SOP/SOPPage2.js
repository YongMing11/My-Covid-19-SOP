import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { Searchbar, List, Menu, Button } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import info from "@mock/sop.json";
import { Audio } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

const SOPPage2 = ({ navigation }) => {
  const icon = "chevron-right";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSectors, setActiveSectors] = useState(info.sectors);
  const [recording, setRecording] = React.useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [sound, setSound] = React.useState();

  async function playSound(uri) {
    console.log("Loading Sound");
    console.log(uri)
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
  const uploadAudio = async () => {
    const uri = recording.getURI();
    // getTranscription(uri);
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
        // sendAudio(uri);
        uploadAudioAsync(uri)
        getTranscription(blob)
        console.log('fuckelite')
      } else {
        console.log("erroor with blob");
      }
    } catch (error) {
      console.log("error in uploadAudio:", error);
    }
  };

  // const sendAudio = async (uri) => {
  //   console.log("start sending audio file");
  //   const formData = new FormData();
  //   formData.append('file', {
  //     uri,
  //     type: 'audio/flac',
  //     // could be anything 
  //     name: 'speech2text'
  //   });
  //   // sending blob
  //   // fetch('https://asia-southeast1-meowmeow-280110.cloudfunctions.net/cloud-source-repositories-test',{
  //   fetch('http://192.168.0.180:8080/', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'multipart/form-data'
  //       //   // 'Content-Type': 'application/octet-stream'
  //       //   // 'Content-Type': 'audio/flac'
  //       // 'Content-Type': 'audio/flac'
  //     },
  //     body: formData, // send the audio file
  //   })
  //     .then(response => {
  //       console.log('Get response from Functions.');
  //       console.log(typeof response);
  //       // console.log(Object.keys(response));
  //       // console.log(Object.keys(response).map(key => {
  //       //   return response[key];
  //       // }));
  //       console.log(JSON.stringify(response));
  //       return response.text();
  //     })
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log('Error caught in app=>', err);
  //     }).finally(() => {
  //       setRecording(undefined);
  //       console.log('finally');
  //     });

  //   // send FormData
  //   // const { uri } = await FileSystem.getInfoAsync(recording.getURI())
  //   // const formData = new FormData();
  //   // // formData.append('api_key', CLOUDINARY_API_KEY);
  //   // formData.append("file", {
  //   //   // uri: recording.getURI(),
  //   //   uri: recording.getURI(),
  //   //   name: recording.getURI().split("/").pop(),
  //   //   type: "audio/mpeg",
  //   // });
  //   // fetch('https://asia-southeast1-meowmeow-280110.cloudfunctions.net/cloud-source-repositories-test',{
  //   //   method: 'POST',
  //   //   headers: {
  //   //     'Content-Type': 'multipart/form-data'
  //   //   },
  //   //   body: formData, // send the audio file
  //   // })
  //   // .then(response => {
  //   //   console.log('Get response from Functions.');
  //   //   return response.text();
  //   // })
  //   // .then(res => {
  //   //   console.log(JSON.stringify(res));
  //   // })
  //   // .catch(err => {
  //   //   console.log('Error caught in app=>',err);
  //   // }).finally(() => {
  //   //   setRecording(undefined);
  //   //   console.log('in finally');
  //   // });
  // };
  async function uploadAudioAsync(uri) {
    console.log("Uploading " + uri);
    let apiUrl = 'http://192.168.1.205:8080';
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('file', {
      uri,
      name: `recording.${fileType}`,
      type: `audio/m4a`,
    });
    formData.append('name', "Ng Yong Ming");

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

  const getTranscription = async (uri) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri,
        type: 'audio/m4a',
        name: 'speech2text.m4a'
      });
      console.log("DONE FETCHING")
      // formData.append('user', "NAMENAMENAME");
      // formData.append('file', uri);
      const response = fetch('http://192.168.1.205:8080/', {
        method: 'POST',
        body: formData
      }).then((res) => {
        console.log("TING WEI JING")
        console.log(JSON.stringify(res))
      }).catch(() => {
        console.log("CHOOI HE L:IN")
      }).finally(() => {
        console.log("FINALLY")
      });
      // const data = await response.json();
      // console.log(data)
    } catch (error) {
      console.log('There was an error', error);
      // this.stopRecording();
      // this.resetRecording();
    }
    // this.setState({ isFetching: false });
  }

  async function startRecording() {
    // const formData = new FormData();
    // formData.append("username", "Groucho");
    // console.log(formData)
    // const response = await fetch('http://192.168.0.180:8080/', {
    //   mode: 'no-cors',
    //   method: 'POST',
    //   body: formData
    // });
    // const data = await response.json();
    // console.log(data)
    // return;
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
            extension: '.m4a',
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
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
        // above structure is get from node_modules
        //  Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      // console.log(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
      setIsRecording(false);
    }
  }
  async function stopRecording() {
    console.log("Stopping recording..");
    setIsRecording(false);

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    playSound(uri);
    // sendAudio();
    uploadAudio();
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
