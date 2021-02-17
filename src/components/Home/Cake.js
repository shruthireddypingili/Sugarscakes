import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
import {useGlobalize} from 'react-native-globalize';
import {
  FIRESTORE_COLLECTIONS,
  SPINNER_COLOR,
  SPINNER_SIZE_SM,
} from '../../shared/Constants';
import {ROUTES} from '../../shared/Routes';

export function Cake({cake, navigation}) {
  const {formatCurrency} = useGlobalize();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate(ROUTES.ITEM_DETAILS, {
          id: cake.id,
          itemType: FIRESTORE_COLLECTIONS.CAKES,
        })
      }>
      <Image
        source={{
          uri: cake.image,
        }}
        style={styles.itemContainer}
        PlaceholderContent={
          <ActivityIndicator color={SPINNER_COLOR} size={SPINNER_SIZE_SM} />
        }>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemName}>{cake.name}</Text>
          <Text style={styles.itemCode}>
            {formatCurrency(Number(cake.price), cake.currency, {
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </Image>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'flex-end',
    height: 120,
    backgroundColor: 'transparent',
  },
  itemTextContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingLeft: 8,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
