import styled, {css} from 'styled-components/native';
import {Platform, FlatList} from 'react-native';
import {BorderlessButton, RectButton} from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

import Button from '../../components/Button';

import {Provider} from './index';

interface ProviderWrapperPros {
  selected: boolean;
}

interface ProviderNamePros {
  selected: boolean;
}

const paddingTop = css`
  padding-top: ${Platform.OS === 'ios'
    ? getStatusBarHeight() + 24
    : getStatusBarHeight()}px;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  ${paddingTop};
  background: ${({theme}) => theme.colors.blackMedium};
`;

export const BackButton = styled(BorderlessButton)``;

export const Icon = styled(FeatherIcon).attrs({
  size: 24,
})`
  color: ${({theme}) => theme.colors.gray};
`;

export const HeaderTitle = styled.Text`
  ${({theme}) => css`
    font-size: 20px;
    font-family: ${theme.fonts['RobotoSlab-Medium']};
    color: ${theme.colors.white};
  `}
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProviderList = styled(
  FlatList as new () => FlatList<Provider>,
).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  padding: 32px 24px 40px;
`;

export const WrapperProvider = styled(RectButton)<ProviderWrapperPros>`
  ${({theme, selected}) => css`
    padding: 8px 12px;
    border-radius: 10px;
    margin-right: 16px;
    background: ${selected ? theme.colors.orange : theme.colors.shape};
    flex-direction: row;
    align-items: center;
  `}
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const ProviderName = styled.Text<ProviderNamePros>`
  ${({theme, selected}) => css`
    font-size: 14px;
    font-family: ${theme.fonts['RobotoSlab-Medium']};
    color: ${selected ? theme.colors.inputs : theme.colors.white};
    margin-left: 16px;
  `}
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  ${({theme}) => css`
    font-size: 25px;
    font-family: ${theme.fonts['RobotoSlab-Medium']};
    color: ${theme.colors.white};
    margin: 0 24px 24px;
  `}
`;

export const ToggleDatePickerButton = styled(Button)`
  margin: 0 24px;
`;
