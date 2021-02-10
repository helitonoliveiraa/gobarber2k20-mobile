import React from 'react';

import {Container, Content, Title, PopupButton} from './styles';

interface PopupProps {
  zindex?: number;
  handleUpdateAvatarFromGallery(): void;
  handleUpdateAvatarFromCamera(): void;
}

const Popup: React.FC<PopupProps> = ({
  handleUpdateAvatarFromCamera,
  handleUpdateAvatarFromGallery,
}) => {
  console.log('popup');

  return (
    <Container>
      <Content>
        <Title>Adicionar foto!</Title>

        <PopupButton onPress={handleUpdateAvatarFromCamera}>Camera</PopupButton>

        <PopupButton onPress={handleUpdateAvatarFromGallery}>
          Galeria
        </PopupButton>
      </Content>
    </Container>
  );
};

export default Popup;
