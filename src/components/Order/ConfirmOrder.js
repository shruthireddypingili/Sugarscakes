import firestore from '@react-native-firebase/firestore';
import {
  ERROR_MESSAGE,
  FIRESTORE_COLLECTIONS,
  ORDER_STATUS,
} from '../../shared/Constants';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

async function changeToOrdered(itemRef) {
  const batch = firestore().batch();
  itemRef.forEach(documentSnapshot => {
    batch.update(documentSnapshot.ref, {
      isOrdered: true,
      updatedAt: firestore.Timestamp.fromDate(new Date()),
    });
  });
  return batch.commit();
}

export async function ConfirmOrder(params, address, phoneNumber) {
  await changeToOrdered(params.itemRef);
  return await firestore()
    .collection(FIRESTORE_COLLECTIONS.ORDERS)
    .add({
      userID: auth().currentUser.uid,
      userName: auth().currentUser.displayName,
      total: params.total,
      totalCurrency: 'USD',
      items: params.items,
      address: address,
      phoneNumber: phoneNumber,
      createdAt: firestore.Timestamp.fromDate(new Date()),
      updatedAt: firestore.Timestamp.fromDate(new Date()),
      orderStatus: ORDER_STATUS[0].name,
      status: true,
    })
    .then(() => {
      return true;
    })
    .catch(error => {
      Alert.alert(ERROR_MESSAGE, error);
      return false;
    });
}
