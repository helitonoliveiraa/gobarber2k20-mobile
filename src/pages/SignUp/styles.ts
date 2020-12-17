import styled from 'styled-components/native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import FeatherIcon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 0 30px;
`;

export const Logo = styled.Image.attrs({
  source: logoImg,
})``;

export const Title = styled.Text`
  font-size: 20px;
  color: ${({theme}) => theme.colors.white};
  font-family: ${({theme}) => theme.fonts['RobotoSlab-Medium']};
  margin: 64px 0 24px;
`;

export const BackToLoginButton = styled.TouchableWithoutFeedback`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const Wrapper = styled.View`
  /* background: ${({theme}) => theme.colors.orange}; */

  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  border-top-width: 1px;
  border-color: ${({theme}) => theme.colors.inputs};
`;

export const BackToLoginButtonText = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-family: ${({theme}) => theme.fonts['RobotoSlab-Regular']};
  font-size: 14px;
`;

export const Icon = styled(FeatherIcon).attrs({
  size: 20,
})`
  color: ${({theme}) => theme.colors.white};
  margin-right: 16px;
`;
