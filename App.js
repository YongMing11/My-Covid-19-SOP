import React from 'react';
import { Dimensions, Button, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert, StatusBar, Platform, Image, ScrollView } from 'react-native';
import { useWindowDimensions, useDeviceOrientation } from '@react-native-community/hooks';

export default function App() {
  let x = 1;
  const { landscape } = useDeviceOrientation();

  const handlePress = () => console.log('Text pressed')

  return (
    // <SafeAreaView style={styles.container}>
    //   <Button title="Click Me" onPress={() => Alert.alert('My title', 'My msg', [{ text: "Haha" }])} />
    //   <Text numberOfLines={1} onPress={handlePress}>Open up App.js to start 1 working on your app! - A really longer........... And See what happens</Text>
    //   <TouchableHighlight onPress={() => console.log('Image tapped')}>
    //     {/* <View style={{ width: '100%', height: landscape ? '100%' : "30%", backgroundColor: 'dodgerblue' }}></View> */}
    //     <Image blurRadius={5} fadeDuration={1000} source={{ width: 200, height: 300, uri: "https://picsum.photos/200/300" }}></Image>
    //   </TouchableHighlight>
    //   {/* <StatusBar style="auto" /> */}
    //   {/* <Image source={require('./assets/icon.png')}></Image> */}
    // </SafeAreaView>
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground source={require('./assets/HomePage_bg.png')} style={styles.imgBackground}>
          <Text style={styles.header}>My COVID-19 SOP</Text>
          <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
            <View style={styles.areaStatusBar}>
              <Text style={styles.areaStatusBar_description}>Your area is currently under</Text>
              <Text style={styles.areaStatusBar_phase}>PPN Phase 1</Text>
            </View>
          </TouchableOpacity>
        </ImageBackground>
        <Image source={require('./assets/HomePage_car.png')} style={styles.carImg}></Image>
        <View style={styles.actionButton_Group}>
          <Text style={styles.actionTitle}>What do you want to do?</Text>
          <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
            <View style={styles.actionButton}>
              <Text style={styles.actionButton_text}>I want to go out to eat</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
            <View style={styles.actionButton}>
              <Text style={styles.actionButton_text}>I want to go out to eat</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
            <View style={styles.actionButton}>
              <Text style={styles.actionButton_text}>I want to go out to eat</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
            <View style={styles.actionButton}>
              <Text style={styles.actionButton_text}>I want to go out to eat</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
            <View style={styles.actionButton}>
              <Text style={styles.actionButton_text}>I want to go out to eat</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
            <View style={styles.actionButton}>
              <Text style={styles.actionButton_text}>I want to go out to eat</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
            <View style={styles.actionButton}>
              <Text style={styles.actionButton_text}>I want to go out to eat</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
            <View style={styles.actionButton}>
              <Text style={styles.actionButton_text}>I want to go out to eat</Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  imgBackground: {
    width: Dimensions.get('window').width,
    height: 170,
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

});
