import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';

import {useAuth} from '../../hooks/Auth';
import api from '../../services/api';

import {
  Container,
  Header,
  BackButton,
  Icon,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProviderList,
  WrapperProvider,
  ProviderAvatar,
  ProviderName,
} from './styles';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const {user} = useAuth();
  const route = useRoute();
  const {goBack} = useNavigation();

  const routeParams = route.params as RouteParams;

  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('/providers');

      setProviders(response.data);
    }

    loadProviders();
  }, []);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={goBack}>
          <Icon name="chevron-left" />
        </BackButton>

        <HeaderTitle>Agendamento</HeaderTitle>

        <UserAvatar
          source={{
            uri: user.avatar_url,
          }}
        />
      </Header>

      <ProvidersListContainer>
        <ProviderList
          data={providers}
          keyExtractor={(provider) => provider.id}
          renderItem={({item: provider}) => (
            <WrapperProvider
              selected={provider.id === selectedProvider}
              onPress={() => handleSelectProvider(provider.id)}>
              <ProviderAvatar source={{uri: provider.avatar_url}} />
              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </WrapperProvider>
          )}
        />
      </ProvidersListContainer>
    </Container>
  );
};

export default CreateAppointment;
