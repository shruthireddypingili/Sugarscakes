import firestore from '@react-native-firebase/firestore';
import {
  ERROR_MESSAGE,
  FIRESTORE_COLLECTIONS,
  INVALID_INPUTS,
} from '../../shared/Constants';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {ROUTES} from '../../shared/Routes';

export async function SendFeedback(
  message,
  rating,
  category,
  item,
  navigation,
) {
  if (
    message &&
    message !== '' &&
    rating &&
    category &&
    category.trim() !== ''
  ) {
    await firestore()
      .collection(FIRESTORE_COLLECTIONS.COMMENTS)
      .add({
        userID: auth().currentUser.uid,
        message: message,
        rating: rating,
        category: category,
        item: item,
        createdAt: firestore.Timestamp.fromDate(new Date()),
        updatedAt: firestore.Timestamp.fromDate(new Date()),
        status: true,
      })
      .then(() => {
        navigation.navigate(ROUTES.FEEDBACK_MODAL);
      })
      .catch(error => {
        Alert.alert(ERROR_MESSAGE, error);
      });
  } else {
    Alert.alert(ERROR_MESSAGE, INVALID_INPUTS);
  }
}
