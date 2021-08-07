import React from 'react';
import { Dimensions, Button, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert, StatusBar, Platform, Image, ScrollView } from 'react-native';
import { useWindowDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import { title } from './src/shared/constants/config';
import { Provider as PaperProvider } from 'react-native-paper';
import HomePage from './src/modules/Home/HomePage'
import HeaderComponent from './src/shared/components/headerComponent';
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/shared/components/main';

export default function App() {

  console.log(title)
  return (
    <PaperProvider>
      <NavigationContainer>
        {/* <HeaderComponent title={title.HomePage}></HeaderComponent> */}
        <Main></Main>
      </NavigationContainer>
    </PaperProvider>
  );
}

