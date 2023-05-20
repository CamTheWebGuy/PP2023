import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';

import { logout } from '../api/firebaseMethods';

const handlePress = () => {
  logout();
};

const Dashboard = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        try {
          const document = db.collection('users').doc(auth.currentUser.uid);
          const res = await document.get();
          setUserData(res.data());
          setLoading(false);
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' />
        </View>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.mainContainer}>
            <ScrollView style={styles.scrollContainer}>
              <Text style={styles.heading}>Welcome Back,</Text>
              <Text style={styles.name}>
                {userData.firstName} {userData.lastName}!
              </Text>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => handlePress()}>
                <Text>Logout</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#0A233F',
    width: '100%',
    padding: 30,
    height: '100vh',
  },
  heading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loadingContainer: {
    backgroundColor: '#0A233F',
    width: '100%',
    textAlign: 'center',
    height: '100vh',
    justifyContent: 'center',
  },
  primaryBtn: {
    padding: 10,
    backgroundColor: '#0099FA',
    marginTop: 15,
    textAlign: 'center',
  },
});
