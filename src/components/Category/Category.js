import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ROUTES} from '../../shared/Routes';

export function Category({item, itemType, navigation}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate(ROUTES.ITEMS_COMPONENT, {
          id: item.id,
          categoryName: item.name,
          itemType: itemType,
        })
      }>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemTextContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#47525E',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: 60,
    width: 150,
    paddingRight: 4,
    paddingLeft: 4,
  },
  itemName: {
    fontSize: 18,
    color: '#fff',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
