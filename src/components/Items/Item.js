import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, Image} from 'react-native-elements';
import {FormattedCurrency} from 'react-native-globalize';
import {
  FIRESTORE_COLLECTIONS,
  SPINNER_COLOR,
  SPINNER_SIZE_SM,
} from '../../shared/Constants';
import {ROUTES} from '../../shared/Routes';

export function Item({item, itemType, category, navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          if (FIRESTORE_COLLECTIONS.TRAINING_WORKSHOPS === itemType) {
            navigation.navigate(ROUTES.TRAINING_WORKSHOPS_DETAILS, {
              trainingType: category,
              id: item.id,
            });
          } else {
            navigation.navigate(ROUTES.ITEM_DETAILS, {
              id: item.id,
              itemType: itemType,
            });
          }
        }}>
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.image}
          PlaceholderContent={
            <ActivityIndicator color={SPINNER_COLOR} size={SPINNER_SIZE_SM} />
          }
        />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>
            <FormattedCurrency
              currencyCode={item.currency}
              maximumFractionDigits={2}
              value={Number(item.price)}
            />
          </Text>
        </View>
      </TouchableOpacity>
      <Divider style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    justifyContent: 'center',
    height: 180,
    width: '100%',
    resizeMode: 'stretch',
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
  itemName: {
    fontSize: 22,
    color: '#47525E',
  },
  itemPrice: {
    fontSize: 22,
    color: '#47525E',
  },
  divider: {
    backgroundColor: '#7E55F3',
    height: 1.5,
    marginTop: 8,
    marginBottom: 16,
  },
});
