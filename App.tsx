import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import MainNavigation from './src/routes';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
