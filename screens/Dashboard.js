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

import { useSelector, useDispatch } from 'react-redux';
import { addUserInfo } from '../redux/actions';
import { checkNetworkConnectivity } from '../components/checkNetworkConnectivity';

// Idea: Rather than storing userdata in state, I store it in redux. So that it can be accessed
// across the app. This can be expanded in the future so that on initial sign in, the db is called,
// user info and customers is saved to redux, saved to asyncStorage, and then can be redux can be
// rehydrated. Meaning that all this information would remain available even if the app is offline

const Dashboard = ({ navigation }) => {
  const userInfo = useSelector((state) => state.userInfo[0]);

  const dispatch = useDispatch();

  const handlePress = () => {
    logout();
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const netCheck = await checkNetworkConnectivity();
      if (auth.currentUser && netCheck) {
        try {
          const document = db.collection('users').doc(auth.currentUser.uid);
          const res = await document.get();
          await dispatch(addUserInfo(res.data(), auth.currentUser.uid));
          setLoading(false);
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.id) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [userInfo]);

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
                {userInfo.user.firstName} {userInfo.user.lastName}!
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
