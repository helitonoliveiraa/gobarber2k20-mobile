import React from 'react';
import {View, StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components/native';

import {theme} from './styles/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={{flex: 1, backgroundColor: theme.colors.background}} />
    </ThemeProvider>
  );
};

export default App;
