import firestore from '@react-native-firebase/firestore';
import {ERROR_MESSAGE, FIRESTORE_COLLECTIONS} from '../../shared/Constants';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {ROUTES} from '../../shared/Routes';

export async function AddToCart(item, itemType, quantity, navigation) {
  return await firestore()
    .collection(FIRESTORE_COLLECTIONS.SHOPPING_CART)
    .add({
      userID: auth().currentUser.uid,
      quantity: quantity,
      total: quantity * item.price,
      totalCurrency: item.currency,
      itemType: itemType,
      item: item,
      createdAt: firestore.Timestamp.fromDate(new Date()),
      updatedAt: firestore.Timestamp.fromDate(new Date()),
      isOrdered: false,
      status: true,
    })
    .then(() => {
      navigation.navigate(ROUTES.CART);
      return true;
    })
    .catch(error => {
      Alert.alert(ERROR_MESSAGE, error);
      return true;
    });
}
