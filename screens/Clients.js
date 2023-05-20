import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import filter from 'lodash.filter';

const Clients = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  const [data, setData] = useState([
    {
      id: '1',
      name: 'Dennis White',
      serviceAddress: '3654 Preston Rd',
    },
    {
      id: '2',
      name: 'Vicki Welch',
      serviceAddress: '5263 Pecan Acres Ln',
    },
    {
      id: '3',
      name: 'Glen Parker',
      serviceAddress: '9238 W Dallas St',
    },
  ]);

  const [fullData, setFullData] = useState([
    {
      id: '1',
      name: 'Dennis White',
      serviceAddress: '3654 Preston Rd',
    },
    {
      id: '2',
      name: 'Vicki Welch',
      serviceAddress: '5263 Pecan Acres Ln',
    },
    {
      id: '3',
      name: 'Glen Parker',
      serviceAddress: '9238 W Dallas St',
    },
  ]);

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = fullData.filter((user) => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };

  const contains = ({ name, serviceAddress }, query) => {
    const formattedName = name.toLowerCase();
    const formattedServiceAddress = serviceAddress.toLowerCase();

    if (
      formattedName.includes(query) ||
      formattedServiceAddress.includes(query)
    ) {
      console.log(name);
      return true;
    }

    return false;
  };

  const ItemView = ({ item }) => {
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <TouchableOpacity onPress={() => console.log('pressed')}>
        <Text style={styles.clientName}>{item.name}</Text>
        <Text style={styles.clientAddress}>{item.serviceAddress}</Text>
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <TextInput
          style={styles.search}
          placeholder='Search Customers...'
          value={query}
          onChangeText={(queryText) => handleSearch(queryText)}
        />
        <FlatList
          data={data}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Clients;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#0A233F',
    width: '100%',
    padding: 30,
    height: '100vh',
  },
  clientName: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'white',
    fontWeight: 'bold',
  },
  clientAddress: {
    color: '#828B98',
    padding: 10,
    paddingTop: 0,
    marginTop: -5,
  },
  search: {
    backgroundColor: '#162B46',
    padding: 15,
    paddingLeft: 10,
    color: '#828B98',
  },
});