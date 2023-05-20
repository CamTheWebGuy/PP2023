import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';

import { auth } from '../firebase';

const Loading = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        navigation.navigate('dashboard');
      } else {
        navigation.navigate('login');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator size='large' />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#0A233F',
    width: '100%',
    textAlign: 'center',
    height: '100vh',
    justifyContent: 'center',
  },
});
