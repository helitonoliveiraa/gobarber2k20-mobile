import React, {useCallback, useMemo} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Container, Icon, OkButton, Tittle, Description} from './styles';
import {format} from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

interface RouteParams {
  date: number;
  providerName: string;
}

const AppointmentCreated: React.FC = () => {
  const {reset} = useNavigation();
  const {params} = useRoute();

  const routeParams = params as RouteParams;

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [
        {
          name: 'Dashboard',
        },
      ],
      index: 0,
    });
  }, [reset]);

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE, 'dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
      {locale: ptBr},
    );
  }, [routeParams.date]);

  return (
    <Container>
      <Icon name="check" />

      <Tittle>Agendamento concluído</Tittle>

      <Description>{`${formattedDate} com ${routeParams.providerName}`}</Description>

      <OkButton onPress={handleOkPressed}>Ok</OkButton>
    </Container>
  );
};

export default AppointmentCreated;
