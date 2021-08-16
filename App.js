import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/shared/components/main';
import { LocationProvider } from './src/contexts/location-context';

export default function App() {

  return (
    <PaperProvider>
      <NavigationContainer>
        <LocationProvider>
          <Main></Main>
        </LocationProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

