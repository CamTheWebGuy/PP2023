import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { initializeApp } from 'firebase/app';
import apiKeys from './config/keys';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Dashboard from './screens/Dashboard';
import Clients from './screens/Clients';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from './screens/Loading';

import { auth } from './firebase';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Dashboard'
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarLabelPosition: 'below-icon',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Client List'
        component={Clients}
        options={{
          headerShown: false,
          tabBarLabelPosition: 'below-icon',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='people-outline' color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name='My Route'
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarLabelPosition: 'below-icon',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='map-outline' color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name='My Account'
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarLabelPosition: 'below-icon',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='cog-outline' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  initializeApp(apiKeys.firebaseConfig);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'loading'}
          component={Loading}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={'login'}
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={'signup'}
          component={SignUp}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={'dashboard'}
          component={HomeTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
