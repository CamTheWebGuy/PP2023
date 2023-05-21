import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { initializeApp } from 'firebase/app';
import apiKeys from './config/keys';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Dashboard from './screens/Dashboard';
import Clients from './screens/Clients';
import ClientInfo from './screens/ClientInfo';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from './screens/Loading';

import { auth } from './firebase';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UpdateClient from './screens/UpdateClient';

import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import MyAccount from './screens/MyAccount';

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
          tabBarInactiveBackgroundColor: '#162B46',
          tabBarActiveBackgroundColor: '#162B46',
          tabBarStyle: { borderTopColor: '#828B98', borderTopWidth: 0.1 },
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
          tabBarInactiveBackgroundColor: '#162B46',
          tabBarActiveBackgroundColor: '#162B46',
          tabBarStyle: { borderTopColor: '#828B98', borderTopWidth: 0.1 },
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
          tabBarInactiveBackgroundColor: '#162B46',
          tabBarActiveBackgroundColor: '#162B46',
          tabBarStyle: { borderTopColor: '#828B98', borderTopWidth: 0.1 },
        }}
      />

      <Tab.Screen
        name='My Account'
        component={MyAccount}
        options={{
          headerShown: false,
          tabBarLabelPosition: 'below-icon',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='cog-outline' color={color} size={size} />
          ),
          tabBarInactiveBackgroundColor: '#162B46',
          tabBarActiveBackgroundColor: '#162B46',
          tabBarStyle: { borderTopColor: '#828B98', borderTopWidth: 0.1 },
        }}
      />

      <Tab.Screen
        name='clientInfo'
        component={ClientInfo}
        options={{
          headerShown: false,
          tabBarLabelPosition: 'below-icon',
          tabBarButton: () => null,
          tabBarInactiveBackgroundColor: '#162B46',
          tabBarActiveBackgroundColor: '#162B46',
          tabBarStyle: { borderTopColor: '#828B98', borderTopWidth: 0.1 },
        }}
      />

      <Tab.Screen
        name='updateClient'
        component={UpdateClient}
        options={{
          headerShown: false,
          tabBarLabelPosition: 'below-icon',
          tabBarButton: () => null,
          tabBarInactiveBackgroundColor: '#162B46',
          tabBarActiveBackgroundColor: '#162B46',
          tabBarStyle: { borderTopColor: '#828B98', borderTopWidth: 0.1 },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  initializeApp(apiKeys.firebaseConfig);

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
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
      </PersistGate>
    </Provider>
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
