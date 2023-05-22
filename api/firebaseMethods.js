import { auth, db } from '../firebase';
import { Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const getAllData = async () => {
//   try {
//     const keys = await AsyncStorage.getAllKeys();
//     const data = await AsyncStorage.multiGet(keys);

//     const items = data.map(([key, value]) => {
//       let parsedValue;
//       try {
//         parsedValue = JSON.parse(value);
//       } catch (error) {
//         parsedValue = value; // Fallback to the original value if parsing fails
//       }

//       return {
//         key,
//         value: parsedValue,
//       };
//     });

//     console.log('All data in AsyncStorage:', items);
//   } catch (error) {
//     console.log('Error retrieving data from AsyncStorage:', error);
//   }
// };

//https://us-central1-pp23-4a2f8.cloudfunctions.net/createUser

export async function registerSubUser(email, password) {
  const endpointURL =
    'https://us-central1-pp23-4a2f8.cloudfunctions.net/createUser';

  // Create the request body
  const requestBody = {
    data: {
      email,
      password,
    },
  };

  // Get the authentication token for the current user
  const idToken = await auth.currentUser.getIdToken();

  // Make a POST request to the Cloud Functions endpoint
  fetch(endpointURL, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error creating user');
      }
    })
    .then((data) => {
      const uid = data.result.uid;
      db.collection('users').doc(uid).set({
        email,
        lastName: 'Rose',
        firstName: 'Ava',
        type: 'employee',
      });
    })
    .catch((error) => {
      console.log('Error creating user:', error);
      // Handle the error
    });
}

export async function registration(email, password, lastName, firstName, mode) {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      db.collection('users').doc(userCredentials.user.uid).set({
        email,
        lastName,
        firstName,
        type: mode,
      });
    })
    .catch((error) => alert(error.message));
}

export async function login(email, password) {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(async (userCredentials) => {
      const user = userCredentials.user;

      // let document = db.collection('users').doc(user.uid);
      // let res = await document.get();

      // try {
      //   await AsyncStorage.clear();
      //   const key = JSON.stringify(user.uid); // Specify a unique key for the data
      //   const value = JSON.stringify(res.data());
      //   await AsyncStorage.setItem(key, value);

      //   // getAllData();
      // } catch (error) {
      //   console.log(error);
      // }
    })
    .catch((error) => alert(error.message));
}

export async function logout() {
  auth.signOut();
}

export async function addCustomer(
  name,
  serviceAddress,
  signedInUser,
  creatorType
) {
  try {
    if (creatorType === 'owner') {
      const docRef = await db.collection('customers').add({
        name,
        serviceAddress,
        owner: signedInUser,
      });
    } else {
      const docRef = await db.collection('customers').add({
        name,
        serviceAddress,
        owner,
      });
    }
  } catch (error) {
    alert(error.message);
  }
}
