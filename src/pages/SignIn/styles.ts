import styled from 'styled-components/native';
import logoImg from '../../assets/logo.png';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
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
