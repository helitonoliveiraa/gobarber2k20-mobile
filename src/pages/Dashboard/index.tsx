import React from 'react';

import {useAuth} from '../../hooks/Auth';

import {Container, Header, HeaderTitle, UserName, UserPic} from './styles';

const Dashboard: React.FC = () => {
  const {signOut} = useAuth();

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>Héliton Oliveira</UserName>
        </HeaderTitle>

        <UserPic
          source={{
            uri:
              'https://avatars.githubusercontent.com/u/45343619?s=460&u=1929279b8eb8dbe2434c20e7ad7e239674b4cc17&v=4',
          }}
        />
      </Header>
    </Container>
  );
};

export default Dashboard;
