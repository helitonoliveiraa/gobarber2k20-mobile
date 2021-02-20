import React from 'react';
import {render} from '@testing-library/react-native';

import SignIn from '../../pages/SignIn';
import {AppThemeProvider} from '../../hooks';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe('SignIn page', () => {
  it('should contains email/password inputs', () => {
    const {getByPlaceholderText} = render(
      <AppThemeProvider>
        <SignIn />
      </AppThemeProvider>,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
  });
});
