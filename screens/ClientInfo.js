import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const ClientInfo = ({ route, navigation }) => {
  const { item } = route.params;
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
      <View style={{ padding: 30 }}>
        <View style={styles.contentContainer}>
          <View style={styles.contentItem}>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
              {item.name}
            </Text>
            <Text style={styles.clientAddress}>{item.serviceAddress}</Text>

            <TouchableOpacity style={styles.primaryBtn}>
              <Text>Navigate</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentItem}>
            <Text style={styles.clientInfo}>Phone: 555-555-5555</Text>
            <Text style={styles.clientInfo}>Frequency: Weekly</Text>
            <Text style={styles.clientInfo}>Day: Monday</Text>

            <TouchableOpacity style={styles.secondaryBtn}>
              <Text>Call Customer</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ margin: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Equipment:</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ClientInfo;

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
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    // flexWrap: 'wrap',
    // alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  contentItem: {
    flexGrow: 1,
    margin: 10,
  },
  clientInfo: {
    color: 'white',
    textAlign: 'right',
  },
  clientAddress: {
    color: 'white',
  },
  primaryBtn: {
    padding: 10,
    backgroundColor: '#0099FA',
    marginTop: 24,
    width: '100%',
    textAlign: 'center',
  },
  secondaryBtn: {
    padding: 10,
    backgroundColor: '#00D8FF',
    marginTop: 15,
    width: '100%',
    textAlign: 'center',
  },
});
