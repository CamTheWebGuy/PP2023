import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { addCustomer, getCustomersFB } from '../api/firebaseMethods';
import { getCustomers } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

const UpdateClient = ({ route, navigation }) => {
  const userInfo = useSelector((state) => state.userInfo[0]);
  const [customerName, setCustomerName] = useState('');
  const [serviceAddress, setServiceAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const clearState = () => {
    setCustomerName('');
    setServiceAddress('');
    setCustomerPhone('');
  };

  const { mode } = route.params;

  const handleAdd = async () => {
    setLoading(true);
    await addCustomer(
      customerName,
      serviceAddress,
      customerPhone,
      'Weekly',
      'Monday',
      userInfo.id,
      userInfo.user.type
    );

    const customers = await getCustomersFB();
    await dispatch(getCustomers(customers));

    clearState();
    setLoading(false);
    navigation.navigate('Client List');
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ flex: 1, flexDirection: 'row' }}
          onPress={() => navigation.navigate('Client List')}>
          <Ionicons name='chevron-back-outline' color={'white'} size={40} />
          <Text style={{ color: 'white', marginTop: 14 }}>BACK</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ marginTop: 25 }}>
          <ActivityIndicator size='large' />
        </View>
      ) : (
        <View style={{ padding: 30 }}>
          <Text style={styles.heading}>
            {mode === 'add' ? 'Add Customer' : 'Edit Customer'}
          </Text>
          <TextInput
            value={customerName}
            onChangeText={(text) => setCustomerName(text)}
            style={styles.input}
            placeholder='Customer Name'
          />
          <TextInput
            value={serviceAddress}
            onChangeText={(text) => setServiceAddress(text)}
            style={styles.input}
            placeholder='Service Address'
          />
          <TextInput
            value={customerPhone}
            onChangeText={(text) => setCustomerPhone(text)}
            style={styles.input}
            placeholder='Customer Phone'
          />
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => handleAdd()}>
            <Text>Save Customer</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default UpdateClient;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#0A233F',
    width: '100%',
    height: '100vh',
  },
  header: {
    backgroundColor: '#00D8FF',
    height: 85,
    paddingTop: 20,
    paddingLeft: 30,
  },
  heading: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#162B46',
    color: '#828B98',
    width: '100%',
    padding: '10px',
    marginTop: '15px',
  },
  primaryBtn: {
    padding: 10,
    backgroundColor: '#0099FA',
    marginTop: 15,
    width: '100%',
    textAlign: 'center',
  },
});
