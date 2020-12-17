import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {TextInputProps} from 'react-native';
import {useField} from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';

import {Container, TextInput} from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  // type ref that input receive to params
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  {name, icon, ...rest},
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const {fieldName, registerField, defaultValue = '', error} = useField(name);
  const inputRef = useRef<InputValueReference>({value: defaultValue});

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current.value);
  }, []);

  //useImperativeHandle is used to pass information of chield component to feather component
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputElementRef.current.setNativeProps({text: value});
        inputElementRef.current.value = value;
      },
      clearValue() {
        inputElementRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#FF9000' : '#666360'}
        style={{marginRight: 16}}
      />

      <TextInput
        {...rest}
        ref={inputElementRef}
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputRef.current.value = value;
        }}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </Container>
  );
};

export default forwardRef(Input);

// when we hava a component that resave ref for params we need to use the method
// forwardRed to export this componet
