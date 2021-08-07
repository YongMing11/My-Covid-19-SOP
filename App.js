import React from 'react';
import { Dimensions, StyleSheet, StatusBar, Platform } from 'react-native';
import SOPPage1 from './src/modules/SOP/SOPPage1.js';
import { Provider as PaperProvider } from "react-native-paper";
import theme from './src/shared/constants/Theme.js';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SOPPage1 />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
