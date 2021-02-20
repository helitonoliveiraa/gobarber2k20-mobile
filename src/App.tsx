import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AppProvider, AppThemeProvider} from './hooks/index';
import SplashScreen from 'react-native-splash-screen';

import Routes from './routes';

import {theme} from './styles/theme';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <AppThemeProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <AppProvider>
          <View
            style={{
              flex: 1,
              backgroundColor: theme.colors.background,
            }}>
            <Routes />
          </View>
        </AppProvider>
      </AppThemeProvider>
    </NavigationContainer>
  );
};

export default App;
