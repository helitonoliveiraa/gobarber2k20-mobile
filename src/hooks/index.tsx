import React from 'react';

import {AuthProvider} from './Auth';
import AppThemeProvider from './Themes';

const AppProvider: React.FC = ({children}) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export {AppProvider, AppThemeProvider};
