import React from 'react';
import {View, StatusBar} from 'react-native';

const App: React.FC = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={{flex: 1, backgroundColor: '#312E38'}} />
    </>
  );
};

export default App;
