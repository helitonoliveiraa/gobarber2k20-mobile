import React from 'react';
import {ThemeProvider} from 'styled-components/native';

import {theme} from '../styles/theme';

const AppThemeProvider: React.FC = ({children}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
