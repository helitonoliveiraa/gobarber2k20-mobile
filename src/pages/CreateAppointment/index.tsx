import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, Platform} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';

import {useAuth} from '../../hooks/Auth';
import api from '../../services/api';

import {
  Container,
  Header,
  Content,
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
  Schedule,
  Section,
  SectionContent,
  SectionTitle,
  HourCard,
  HourCardText,
  CreateAppointmentButton,
} from './styles';

interface RouteParams {
  providerId: string;
  providerName: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

export interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const {user} = useAuth();
  const route = useRoute();
  const {goBack, navigate} = useNavigation();

  const routeParams = route.params as RouteParams;

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState({
    providerId: routeParams.providerId,
    providerName: routeParams.providerName,
  });

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
        `/providers/${selectedProvider.providerId}/day-availability`,
        {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        },
      );

      setAvailability(response.data);
    }

    handleLoadDate();
  }, [selectedDate, selectedProvider]);

  const handleSelectProvider = useCallback(
    (providerId: string, providerName: string) => {
      setSelectedProvider({
        providerId,
        providerName,
      });
    },
    [],
  );

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

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('/appointments', {
        provider_id: selectedProvider.providerId,
        date,
      });

      navigate('AppointmentCreated', {
        date: date.getTime(),
        providerName: selectedProvider.providerName,
      });
    } catch (err) {
      Alert.alert(
        'Ocorreu um erro!',
        'falha ao criar o agendamendo, tente novamente.',
      );
    }
  }, [selectedDate, selectedHour, selectedProvider, navigate]);

  const mornigAvailability = useMemo(() => {
    return availability
      .filter(({hour}) => hour < 12)
      .map(({hour, available}) => {
        return {
          hour,
          formattedHour: format(new Date().setHours(hour), 'HH:00'),
          available,
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({hour}) => hour >= 12)
      .map(({hour, available}) => {
        return {
          hour,
          formattedHour: format(new Date().setHours(hour), 'HH:00'),
          available,
        };
      });
  }, [availability]);

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

      <Content>
        <ProvidersListContainer>
          <ProviderList
            data={providers}
            keyExtractor={(provider) => provider.id}
            renderItem={({item: provider}) => (
              <WrapperProvider
                selected={provider.id === selectedProvider.providerId}
                onPress={() =>
                  handleSelectProvider(provider.id, provider.name)
                }>
                <ProviderAvatar source={{uri: provider.avatar_url}} />
                <ProviderName
                  selected={provider.id === selectedProvider.providerId}>
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

        <Schedule>
          <Title>Escolha a horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>

            {mornigAvailability && (
              <SectionContent>
                {mornigAvailability.map(({formattedHour, available, hour}) => (
                  <HourCard
                    enabled={available}
                    selected={selectedHour === hour}
                    available={available}
                    key={formattedHour}
                    onPress={() => handleSelectHour(hour)}>
                    <HourCardText selected={selectedHour === hour}>
                      {formattedHour}
                    </HourCardText>
                  </HourCard>
                ))}
              </SectionContent>
            )}
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>

            {afternoonAvailability && (
              <SectionContent>
                {afternoonAvailability.map(
                  ({formattedHour, available, hour}) => (
                    <HourCard
                      enabled={available}
                      selected={selectedHour === hour}
                      available={available}
                      key={formattedHour}
                      onPress={() => handleSelectHour(hour)}>
                      <HourCardText selected={selectedHour === hour}>
                        {formattedHour}
                      </HourCardText>
                    </HourCard>
                  ),
                )}
              </SectionContent>
            )}
          </Section>
        </Schedule>

        <CreateAppointmentButton onPress={handleCreateAppointment}>
          Agendar
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
