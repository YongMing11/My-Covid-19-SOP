import React from 'react';
import { Dimensions, Button, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert, StatusBar, Platform, Image, ScrollView } from 'react-native';
import { useWindowDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import { title } from './src/shared/constants/config';
import { Provider as PaperProvider } from 'react-native-paper';
import HomePage from './src/modules/Home/HomePage'
import BottomNavigationComponent from './src/shared/components/bottomNavigationComponent';
import HeaderComponent from './src/shared/components/headerComponent';

export default function App() {

  console.log(title)
  return (
    <PaperProvider>
        {/* <HeaderComponent title={title.HomePage}></HeaderComponent> */}
        <BottomNavigationComponent></BottomNavigationComponent>
    </PaperProvider>
  );
}

