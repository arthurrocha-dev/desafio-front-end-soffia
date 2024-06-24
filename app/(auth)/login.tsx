import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: #f5f5f5;
`;

const StyledButton = styled.TouchableOpacity`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  border-radius: 8px;
  align-items: center;
  margin-top: 16px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

const SignupText = styled.Text`
  color: #007bff;
  margin-top: 16px;
`;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <Title>LOGIN</Title>
      <Input
        placeholder="Endereço de e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <StyledButton onPress={() => { console.log("login") }}>
        <ButtonText>Entrar</ButtonText>
      </StyledButton>
      <TouchableOpacity onPress={() => { console.log("register");}}>
        <SignupText>Criar nova conta</SignupText>
      </TouchableOpacity>
    </Container>
  );
}
