import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background: ${({theme}) => theme.colors.orange};
  height: 50px;
  border-radius: 10px;

  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-family: ${({theme}) => theme.fonts['RobotoSlab-Medium']};
  color: ${({theme}) => theme.colors.background};
  font-size: 16px;
`;
