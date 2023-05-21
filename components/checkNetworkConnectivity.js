import NetInfo from '@react-native-community/netinfo';

export const checkNetworkConnectivity = async () => {
  const { isConnected } = await NetInfo.fetch();

  if (isConnected) {
    console.log('connected');
    return true;
  } else {
    console.log('not connected');
    return false;
  }
};
