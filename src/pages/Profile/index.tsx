import React, {useRef, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TextInput, ScrollView, Alert} from 'react-native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/validationErros';
import api from '../../services/api';

import Input from '../../components/Input';

import {
  Container,
  Header,
  HeaderTitle,
  ButtonBorderless,
  Icon,
  AvatarContainer,
  Avatar,
  WrapperPicIcon,
  SaveButton,
} from './styles';
import {useAuth} from '../../hooks/Auth';

interface profileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const SignUp: React.FC = () => {
  const {goBack} = useNavigation();
  const {user, signOut, updateUser} = useAuth();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const ConfirmPasswordRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: profileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail é obrigatório'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: string) => !!val.length,
            then: Yup.string()
              .min(6, 'Mínimo de 6 dígitos')
              .required('Nova senha é obrigatória'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: string) => !!val.length,
              then: Yup.string().required('Confirme a nova senha'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
        });

        await schema.validate(data, {abortEarly: false});

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        Alert.alert('Sucesso!', 'Seu perfil foi atualizado com sucesso!');

        goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na atualização!',
          'Ocorreu um erro ao atualizar, tente novamente.',
        );
      }
    },
    [goBack, updateUser],
  );

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <Header>
            <ButtonBorderless onPress={() => goBack()}>
              <Icon name="chevron-left" />
            </ButtonBorderless>

            <HeaderTitle>Meu perfil</HeaderTitle>

            <ButtonBorderless onPress={signOut}>
              <Icon name="power" />
            </ButtonBorderless>
          </Header>

          <AvatarContainer>
            <Avatar
              source={{
                uri: user.avatar_url,
              }}
            />

            <WrapperPicIcon>
              <Icon name="camera" />
            </WrapperPicIcon>
          </AvatarContainer>

          <Form
            style={{marginHorizontal: 20}}
            ref={formRef}
            onSubmit={handleSignUp}
            initialData={{
              name: user.name,
              email: user.email,
            }}>
            <Input
              name="name"
              icon="user"
              placeholder="Nome"
              autoCapitalize="words"
              returnKeyType="next"
              onEndEditing={() => {
                emailInputRef.current?.focus();
              }}
            />

            <Input
              ref={emailInputRef}
              name="email"
              icon="mail"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="newPassword"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                oldPasswordRef.current?.focus();
              }}
            />

            <Input
              containerStyle={{marginTop: 32}}
              ref={oldPasswordRef}
              name="old_password"
              icon="lock"
              placeholder="Senha atual"
              secureTextEntry
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />

            <Input
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="Nova senha"
              secureTextEntry
              returnKeyType="next"
              onSubmitEditing={() => {
                ConfirmPasswordRef.current?.focus();
              }}
            />

            <Input
              ref={ConfirmPasswordRef}
              name="password_confirmation"
              icon="lock"
              placeholder="Confirmar senha"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <SaveButton
              onPress={() => {
                formRef.current?.submitForm();
              }}>
              Confirmar mudanças
            </SaveButton>
          </Form>
        </Container>
      </ScrollView>
    </>
  );
};

export default SignUp;
