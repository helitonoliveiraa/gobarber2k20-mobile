import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 56px 24px 24px;
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

export const UserPic = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;
