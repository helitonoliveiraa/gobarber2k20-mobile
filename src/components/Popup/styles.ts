import styled, {css} from 'styled-components/native';
import Button from '../Button';

export const Container = styled.View`
  z-index: 15;
  position: absolute;
  align-items: center;
  align-self: center;
  justify-content: center;
  top: 40%;
`;

export const Content = styled.View`
  background: ${({theme}) => theme.colors.white};
  padding: 10px 16px;
  border-radius: 10px;
  elevation: 5;
`;

export const Title = styled.Text`
  ${({theme}) => css`
    font-size: 20px;
    font-family: ${theme.fonts['RobotoSlab-Medium']};
    padding-bottom: 5px;
    margin-bottom: 5px;
  `}
`;

export const PopupButton = styled(Button)`
  background: transparent;
`;
