import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/shared/components/main';
import { LocationProvider } from './src/contexts/location-context';
import { HistoryProvider } from './src/contexts/history-context';

export default function App() {

  return (
    <PaperProvider>
      <NavigationContainer>
        <LocationProvider>
          <HistoryProvider>
            <Main></Main>
          </HistoryProvider>
        </LocationProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

