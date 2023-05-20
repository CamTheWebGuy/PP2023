import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';

import { login } from '../api/firebaseMethods';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = () => {
    login(email, password);
  };

  return (
    <View style={styles.mainContainer}>
      <Image source={require('../images/logo.png')} style={styles.logo} />
      <View style={styles.formContainer}>
        <TextInput
          placeholder='Email'
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => handlePress()}>
          <Text>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate('signup')}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#0A233F',
    width: '100%',
    textAlign: 'center',
    height: '100vh',
  },
  logo: {
    height: 50,
    marginTop: 30,
    resizeMode: 'contain',
  },
  formContainer: {
    marginTop: '25px',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  input: {
    backgroundColor: '#162B46',
    color: '#828B98',
    width: '80%',
    padding: '10px',
    marginTop: '15px',
  },
  primaryBtn: {
    padding: 10,
    backgroundColor: '#0099FA',
    marginTop: 15,
    width: '80%',
  },
  secondaryBtn: {
    padding: 10,
    backgroundColor: '#00D8FF',
    marginTop: 15,
    width: '80%',
  },
});
