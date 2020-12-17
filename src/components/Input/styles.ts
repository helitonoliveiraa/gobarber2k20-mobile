import styled, {css} from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background: ${({theme}) => theme.colors.inputs};
  margin-bottom: 8px;
  padding: 0 16px;

  flex-direction: row;
  align-items: center;

  border-width: 2px;
  border-color: ${({theme}) => theme.colors.inputs};

  ${({isErrored, theme}) =>
    isErrored &&
    css`
      border-color: ${theme.colors.error};
    `}

  ${({isFocused, theme}) =>
    isFocused &&
    css`
      border-color: ${theme.colors.orange};
    `}
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: '#666360',
  keyboardAppearance: 'dark',
})`
  flex: 1;
  color: ${({theme}) => theme.colors.white};
  font-size: 14px;
  font-family: ${({theme}) => theme.fonts['RobotoSlab-Regular']};
`;
