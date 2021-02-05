import styled, {css} from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

export const Icon = styled(FeatherIcon).attrs({
  size: 63,
})`
  color: ${({theme}) => theme.colors.success};
  margin-bottom: 47px;
`;

export const OkButton = styled(Button)`
  max-width: 100px;
  width: 100%;
  margin-top: 40px;
`;

export const Tittle = styled.Text.attrs({
  paddingHorizontal: 55,
})`
  ${({theme}) => css`
    font-family: ${theme.fonts['RobotoSlab-Medium']};
    color: ${theme.colors.white};
    max-width: 200px;
    font-size: 30px;
    text-align: center;
  `}
`;

export const Description = styled.Text`
  ${({theme}) => css`
    font-family: ${theme.fonts['RobotoSlab-Medium']};
    color: ${theme.colors.gray};
    font-size: 14px;
    max-width: 265px;
    margin-top: 16px;
    text-align: center;
  `}
`;
