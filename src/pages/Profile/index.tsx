import React, {useRef, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
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

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const {goBack} = useNavigation();
  const {user, signOut} = useAuth();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const ConfirmPasswordRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail é obrigatório'),
        password: Yup.string()
          .required('Senha é obrigatória')
          .min(6, 'No mínimo 6 digitos'),
      });

      await schema.validate(data, {abortEarly: false});

      // await api.post('/users', data);

      Alert.alert(
        'Cadastro realizado!',
        'Vocẽ já pode fazer seu logon no GoBarber!',
      );

      // navigation.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro no cadastro!',
        'Ocorreu um erro ao fazer cadastro, tente novamente.',
      );
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
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
                  uri:
                    'https://avatars.githubusercontent.com/u/45343619?s=460&u=1929279b8eb8dbe2434c20e7ad7e239674b4cc17&v=4',
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
                name="olg_password"
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
                placeholder="Confiramr senha"
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
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
