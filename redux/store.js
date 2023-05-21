import { createStore } from 'redux';
import userReducer from './reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = createStore(persistedReducer, devToolsEnhancer({ trace: true }));
const persistor = persistStore(store);

export { store, persistor };

// export default createStore(userReducer, devToolsEnhancer());
