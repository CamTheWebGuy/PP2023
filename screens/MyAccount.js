import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { updateUserEmail } from '../redux/actions';
import { generate } from '@wcj/generate-password';
import { registerSubUser } from '../api/firebaseMethods';

const MyAccount = () => {
  const userInfo = useSelector((state) => state.userInfo[0]);
  const [email, setEmail] = useState(userInfo.user.email);
  const [firstName, setFirstName] = useState(userInfo.user.firstName);
  const [lastName, setLastName] = useState(userInfo.user.lastName);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [addUserEmail, setAddUserEmail] = useState('');
  const [addUserPassword, setAddUserPassword] = useState('password');

  const [data, setData] = useState([
    {
      id: '1',
      name: 'Tony Stark',
    },
    {
      id: '2',
      name: 'Bruce Banner',
    },
    {
      id: '3',
      name: 'Peter Parker',
    },
  ]);

  const dispatch = useDispatch();

  const handleUpdateInfo = async () => {
    if (
      email === userInfo.user.email &&
      firstName === userInfo.user.firstName &&
      lastName === userInfo.user.lastName
    ) {
    } else {
      await dispatch(updateUserEmail(email, userInfo.id));
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <TouchableOpacity onPress={() => console.log('clicked')}>
        <Text style={styles.clientName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>My Account</Text>

      <Text style={{ color: 'white', marginTop: 25 }}>First Name:</Text>
      <TextInput
        style={styles.input}
        placeholder='First Name'
        value={firstName}
        onChangeText={(e) => setFirstName(e)}
      />
      <Text style={{ color: 'white', marginTop: 10 }}>Last Name:</Text>
      <TextInput
        style={styles.input}
        placeholder='Last Name'
        value={lastName}
        onChangeText={(e) => setLastName(e)}
      />

      <Text style={{ color: 'white', marginTop: 10 }}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={(e) => setEmail(e)}
      />

      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => handleUpdateInfo()}>
        <Text>Save Changes</Text>
      </TouchableOpacity>

      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
          marginTop: 20,
          marginBottom: 20,
        }}
      />

      <Text style={styles.heading}>Users</Text>

      {showAddUserForm && (
        <View>
          <TextInput
            style={styles.input}
            placeholder='Email'
            value={addUserEmail}
            onChangeText={(e) => setAddUserEmail(e)}
          />
        </View>
      )}

      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() =>
          !showAddUserForm
            ? setShowAddUserForm(!showAddUserForm)
            : registerSubUser(addUserEmail, addUserPassword)
        }>
        <Text>{showAddUserForm ? 'Create User' : 'Add New User'}</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        renderItem={ItemView}
        ItemSeparatorComponent={ItemSeparatorView}
      />
    </View>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#0A233F',
    width: '100%',
    padding: 30,
    height: '100vh',
  },
  heading: {
    color: 'white',
    fontWeight: 600,
    fontSize: 20,
  },
  primaryBtn: {
    padding: 10,
    backgroundColor: '#0099FA',
    marginTop: 15,
    width: '50%',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#162B46',
    color: '#828B98',
    width: '80%',
    padding: '10px',
    marginTop: '5px',
  },
  clientName: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'white',
    fontWeight: 'bold',
  },
});
