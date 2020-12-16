import 'react-native-gesture-handler';

import React from 'react';
import {View, StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {NavigationContainer} from '@react-navigation/native';

import Routes from './routes/index';

import {theme} from './styles/theme';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <View style={{flex: 1, backgroundColor: theme.colors.background}}>
          <Routes />
        </View>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
