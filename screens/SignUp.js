import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
  Keyboard,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import { registration } from '../api/firebaseMethods';

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // This determines if the created account is a Business Owner or Employee (technician).
  // For right now this is hard coded, and Employee accounts will only be created via dashboard.
  // the registration function is setup to take employee accounts though.
  const mode = 'owner';

  const emptyState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handlePress = () => {
    if (!firstName) {
      Alert.alert('First name is required');
    } else if (!email) {
      Alert.alert('Email field is required.');
    } else if (!password) {
      Alert.alert('Password field is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirm password field is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Password does not match!');
    } else {
      registration(email, password, lastName, firstName, mode);
      navigation.navigate('loading');
      emptyState();
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <Image source={require('../images/logo.png')} style={styles.logo} />
        <View style={styles.formContainer}>
          <Text style={styles.text}>Create an account </Text>
          <ScrollView
            onBlur={Keyboard.dismiss}
            contentContainerStyle={styles.formScrollContainer}
            style={styles.formScroll}>
            <TextInput
              style={styles.input}
              placeholder='First name*'
              value={firstName}
              onChangeText={(name) => setFirstName(name)}
            />
            <TextInput
              style={styles.input}
              placeholder='Last name'
              value={lastName}
              onChangeText={(name) => setLastName(name)}
            />

            <TextInput
              style={styles.input}
              placeholder='Enter your email*'
              value={email}
              onChangeText={(email) => setEmail(email)}
              keyboardType='email-address'
              autoCapitalize='none'
            />

            <TextInput
              style={styles.input}
              placeholder='Enter your password*'
              value={password}
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              placeholder='Retype your password to confirm*'
              value={confirmPassword}
              onChangeText={(password2) => setConfirmPassword(password2)}
              secureTextEntry={true}
            />

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => handlePress()}>
              <Text>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => navigation.navigate('login')}>
              <Text>Already Have An Account?</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#0A233F',
    width: '100%',
    textAlign: 'center',
    height: '100vh',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
    justifyContent: 'center',
  },
  formScrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  formScroll: {
    width: '100%',
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
