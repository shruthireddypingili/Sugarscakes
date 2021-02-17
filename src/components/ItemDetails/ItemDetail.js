import firestore from '@react-native-firebase/firestore';
import {
  COMMENT_TYPE,
  SPINNER_COLOR,
  SPINNER_SIZE_LG,
  SPINNER_SIZE_SM,
  SPINNER_STYLE_CENTERED,
} from '../../shared/Constants';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image, Button, Divider} from 'react-native-elements';
import {useGlobalize} from 'react-native-globalize';
import {Icon} from '@ui-kitten/components';
import {AirbnbRating} from 'react-native-ratings';
import {AddToCart} from '../Cart/AddToCart';
import {ROUTES} from '../../shared/Routes';
import {SendFeedback} from '../Feedback/SendFeedback';
import {LocalizationContext} from '../../shared/Translations';

export function ItemDetail({id, itemType, navigation}) {
  const {formatCurrency} = useGlobalize();
  const ref = firestore()
    .collection(itemType)
    .doc(id);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [messageCharCount, setMessageCharCount] = useState(0);
  const [cartBtn, setCartBtn] = useState(false);
  const [submitBtn, setSubmitBtn] = useState(false);
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  initializeAppLanguage();

  useEffect(() => {
    const subscriber = ref.onSnapshot(querySnapshot => {
      setItem(querySnapshot.data());
      setLoading(false);
    });
    return () => subscriber();
  }, [id, ref]);

  if (loading) {
    return (
      <ActivityIndicator
        style={SPINNER_STYLE_CENTERED}
        size={SPINNER_SIZE_LG}
        color={SPINNER_COLOR}
      />
    );
  }

  if (item.id && !loading) {
    return (
      <View style={styles.noItemContainer}>
        <Text style={styles.itemName}>{translations['Item.NoFound']}</Text>
        <Button
          title={translations['Shopping.Continue']}
          onPress={() => {
            navigation.navigate(ROUTES.HOME);
          }}
          buttonStyle={styles.lowerBtn}
        />
      </View>
    );
  }

  const minusQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const plusQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.image}
            PlaceholderContent={
              <ActivityIndicator color={SPINNER_COLOR} size={SPINNER_SIZE_SM} />
            }
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.centeredContainer}>
            <Text style={styles.cakeName}>{item.name}</Text>
            <Text style={styles.cakePrice}>
              {formatCurrency(Number(item.price), item.currency, {
                maximumFractionDigits: 2,
              })}
            </Text>
            <View style={styles.cakeCountContainer}>
              <TouchableOpacity onPress={minusQuantity}>
                <Icon
                  name="minus-circle-outline"
                  style={styles.icon}
                  fill="white"
                />
              </TouchableOpacity>
              <Text style={styles.cakeCountText}>{quantity}</Text>
              <TouchableOpacity onPress={plusQuantity}>
                <Icon
                  name="plus-circle-outline"
                  style={styles.icon}
                  fill="white"
                />
              </TouchableOpacity>
            </View>
            <Button
              title={translations['Text.AddToCart']}
              disabled={cartBtn}
              loading={cartBtn}
              loadingProps={
                <ActivityIndicator
                  color={SPINNER_COLOR}
                  size={SPINNER_SIZE_SM}
                />
              }
              onPress={() => {
                setCartBtn(true);
                AddToCart(item, itemType, quantity, navigation)
                  .then(() => setCartBtn(false))
                  .catch(() => setCartBtn(false));
              }}
              buttonStyle={styles.addToCartBtn}
            />
          </View>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>
          {translations['Text.Description']}:
        </Text>
        <Text style={styles.descriptionContent}>{item.description}</Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>
          {translations['Text.CommentAndRating']}:
        </Text>
        <TextInput
          multiline
          maxLength={120}
          style={styles.commentTextArea}
          placeholder={translations['Text.TypeYourComment']}
          placeholderTextColor="white"
          onChangeText={message_ => {
            setMessage(message_);
            setMessageCharCount(message_.length);
          }}
          value={message}
        />
        <Text style={styles.commentCharCount}>{messageCharCount}/120</Text>
        <View style={styles.ratingContainer}>
          <AirbnbRating
            defaultRating={0}
            showRating={false}
            selectedColor="white"
            onFinishRating={rating_ => {
              setRating(rating_);
            }}
          />
          <Button
            title="SUBMIT"
            disabled={submitBtn}
            loading={submitBtn}
            loadingProps={
              <ActivityIndicator color={SPINNER_COLOR} size={SPINNER_SIZE_SM} />
            }
            onPress={() => {
              setSubmitBtn(true);
              SendFeedback(message, rating, COMMENT_TYPE.ITEM, item, navigation)
                .then(() => setSubmitBtn(false))
                .catch(() => setSubmitBtn(false));
            }}
            buttonStyle={styles.addToCartBtn}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#96989C',
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 8,
  },
  imageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
    height: 180,
    width: 180,
    resizeMode: 'contain',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  centeredContainer: {justifyContent: 'center'},
  cakeName: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Arial',
    marginTop: 8,
  },
  cakePrice: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Arial',
    marginTop: 4,
  },
  cakeCountContainer: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cakeCountText: {
    fontSize: 28,
    color: 'white',
    marginRight: 16,
    marginLeft: 16,
  },
  icon: {height: 40, width: 40, color: 'white', margin: 4},
  addToCartBtn: {backgroundColor: '#47525E', marginTop: 8},
  divider: {backgroundColor: '#7E55F3', height: 1.5, marginTop: 16},
  descriptionContainer: {padding: 16},
  descriptionTitle: {
    color: 'white',
    fontSize: 24,
    textDecorationLine: 'underline',
  },
  descriptionContent: {
    color: 'white',
    fontSize: 18,
    marginTop: 16,
    marginLeft: 16,
  },
  commentTextArea: {
    color: 'white',
    borderWidth: 0,
    borderColor: 'white',
    borderBottomWidth: 2,
  },
  commentCharCount: {
    fontSize: 12,
    color: 'white',
    textAlign: 'right',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
  },
  rating: {backgroundColor: 'transparent', color: 'white'},
  noItemContainer: {
    backgroundColor: '#96989C',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  itemName: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Arial',
    marginTop: 8,
  },
  lowerBtn: {
    marginTop: 24,
    backgroundColor: '#47525E',
  },
});
