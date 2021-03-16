import styled, {css} from 'styled-components/native';
import {Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {BorderlessButton, RectButton} from 'react-native-gesture-handler';

import Button from '../../components/Button';

interface IconProps {
  name: 'chevron-left' | 'power' | 'camera';
}

const paddingTop = css`
  padding-top: ${Platform.OS === 'ios'
    ? getStatusBarHeight() + 32
    : getStatusBarHeight()}px;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0 24px;
  background: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${paddingTop}
  margin-bottom: 32px;
`;

export const HeaderTitle = styled.Text`
  ${({theme}) => css`
    font-size: 20px;
    font-family: ${theme.fonts['RobotoSlab-Medium']};
    color: ${theme.colors.white};
  `}
`;

export const ButtonBorderless = styled(BorderlessButton)``;

export const AvatarContainer = styled.View`
  width: 186px;
  height: 186px;
  align-self: center;
  margin-bottom: 32px;
  position: relative;
`;

export const Avatar = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 186px;
  height: 186px;
  border-radius: 93px;
  background: ${({theme}) => theme.colors.gray};
`;

export const WrapperPicIcon = styled(RectButton)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: ${({theme}) => theme.colors.orange};
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 4px;
  bottom: 4px;
`;

export const Icon = styled(FeatherIcon).attrs({
  size: 20,
})<IconProps>`
  ${({theme, name}) => css`
    ${name === 'camera' &&
    css`
      color: ${theme.colors.background};
    `};

    ${name === 'chevron-left' &&
    css`
      color: ${theme.colors.gray};
    `};

    ${name === 'power' &&
    css`
      color: ${theme.colors.error};
      opacity: 0.8;
    `};
  `}
`;

export const SaveButton = styled(Button)`
  margin: 72px 0 24px;
`;
