import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {useAuth} from '../../hooks/Auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  UserAvatar,
  ProfileButton,
  Title,
  ProviderList,
  WrapperProvider,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderSchedule,
  ScheduleIcon,
  ScheduleText,
} from './styles';
import api from '../../services/api';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const {user} = useAuth();
  const {navigate} = useNavigation();

  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('/providers');

      setProviders(response.data);
    }

    loadProviders();
  }, []);

  const navigateToCreateAppointment = useCallback(
    (providerId: string, providerName: string) => {
      navigate('CreateAppointment', {providerId, providerName});
    },
    [navigate],
  );

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar
            source={{
              uri: user.avatar_url,
            }}
          />
        </ProfileButton>
      </Header>

      <ProviderList
        data={providers}
        keyExtractor={(provider) => provider.id}
        ListHeaderComponent={<Title>Cabeleireiros</Title>}
        renderItem={({item: provider}) => (
          <WrapperProvider
            onPress={() =>
              navigateToCreateAppointment(provider.id, provider.name)
            }>
            <ProviderAvatar
              source={{
                uri:
                  'https://avatars.githubusercontent.com/u/45343619?s=460&u=1929279b8eb8dbe2434c20e7ad7e239674b4cc17&v=4',
              }}
            />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderSchedule>
                <ScheduleIcon name="calendar" />
                <ScheduleText>Segunda à sexta</ScheduleText>
              </ProviderSchedule>

              <ProviderSchedule>
                <ScheduleIcon name="clock" />
                <ScheduleText>8h às 17h</ScheduleText>
              </ProviderSchedule>
            </ProviderInfo>
          </WrapperProvider>
        )}
      />
    </Container>
  );
};

export default Dashboard;
