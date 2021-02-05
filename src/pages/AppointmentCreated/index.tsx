import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

import {Container, Icon, OkButton, Tittle, Description} from './styles';

const AppointmentCreated: React.FC = () => {
  const {reset} = useNavigation();

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

  return (
    <Container>
      <Icon name="check" />

      <Tittle>Agendamento concluído</Tittle>

      <Description>
        Terça, dia 14 de março de 2020 às 12:00h com Héliton Oliveira
      </Description>

      <OkButton onPress={handleOkPressed}>Ok</OkButton>
    </Container>
  );
};

export default AppointmentCreated;
