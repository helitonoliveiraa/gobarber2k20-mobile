import React, {useCallback, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  Calendar,
  Title,
  ToggleDatePickerButton,
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

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
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

  useEffect(() => {
    async function handleLoadDate() {
      const response = await api.get(
        `/providers/${selectedProvider}/day-availability`,
        {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        },
      );
    }

    handleLoadDate();
  }, [selectedDate, selectedProvider]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const HandleToggleDatePicker = useCallback(() => {
    setShowDatePicker((prevState) => !prevState);
  }, []);

  const handleDateChange = useCallback((event: any, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
    }
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

      <Calendar>
        <Title>Escolha a data</Title>

        <ToggleDatePickerButton onPress={HandleToggleDatePicker}>
          Selecionar data
        </ToggleDatePickerButton>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            textColor="#F4EDE8"
            value={selectedDate}
            onChange={handleDateChange}
          />
        )}
      </Calendar>
    </Container>
  );
};

export default CreateAppointment;
