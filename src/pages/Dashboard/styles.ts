import styled, {css} from 'styled-components/native';
import {FlatList, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {Provider} from './index';
import {RectButton} from 'react-native-gesture-handler';

const paddingTop = css`
  padding-top: ${Platform.OS === 'ios'
    ? getStatusBarHeight() + 24
    : getStatusBarHeight()}px;
`;

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  ${paddingTop};
  background: ${({theme}) => theme.colors.blackMedium};

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  ${({theme}) => css`
    font-family: ${theme.fonts['RobotoSlab-Regular']};
    font-size: 20px;
    color: ${theme.colors.gray};
    line-height: 28px;
  `}
`;

export const UserName = styled.Text`
  ${({theme}) => css`
    font-family: ${theme.fonts['RobotoSlab-Medium']};
    font-size: 20px;
    color: ${theme.colors.orange};
  `}
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const Title = styled.Text`
  ${({theme}) => css`
    margin-bottom: 24px;
    font-size: 25px;
    font-family: ${theme.fonts['RobotoSlab-Regular']};
    color: ${theme.colors.white};
  `}
`;

export const ProviderList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 24px;
`;

export const WrapperProvider = styled(RectButton)`
  flex-direction: row;
  align-items: center;

  padding: 20px 16px;
  border-radius: 10px;
  margin-bottom: 16px;
  background: ${({theme}) => theme.colors.shape};
`;

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  ${({theme}) => css`
    font-size: 18px;
    font-family: ${theme.fonts['RobotoSlab-Medium']};
    color: ${theme.colors.white};
    margin-bottom: 6px;
  `}
`;

export const ProviderSchedule = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
`;

export const ScheduleIcon = styled(FeatherIcon).attrs({
  size: 12,
})`
  color: ${({theme}) => theme.colors.orange};
  margin-right: 12px;
`;

export const ScheduleText = styled.Text`
  ${({theme}) => css`
    font-size: 12px;
    line-height: 16px;
    font-family: ${theme.fonts['RobotoSlab-Regular']};
    color: ${theme.colors.gray};
  `}
`;
