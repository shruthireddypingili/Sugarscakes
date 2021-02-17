import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';
import {
  CATEGORIES,
  OPERATOR,
  SPINNER_COLOR,
  SPINNER_SIZE_LG,
  SPINNER_STYLE_CENTERED,
  STATUS,
} from '../../shared/Constants';
import {Item} from './Item';
import {Button} from 'react-native-elements';
import {ROUTES} from '../../shared/Routes';

export function Items({itemType, category, navigation}) {
  const ref = firestore().collection(itemType);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const subscriber = ref
      .where(STATUS, OPERATOR.EQ, true)
      .where(CATEGORIES, OPERATOR.ARRAY_CONTAINS_ANY, [category])
      .onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setItems(list);
        setLoading(false);
      });
    return () => subscriber();
  }, [category, ref]);

  if (loading) {
    return (
      <ActivityIndicator
        style={SPINNER_STYLE_CENTERED}
        size={SPINNER_SIZE_LG}
        color={SPINNER_COLOR}
      />
    );
  }

  if (items.length <= 0 && !loading) {
    return (
      <View style={styles.noItemContainer}>
        <Text style={styles.itemName}>No item in this category.</Text>
        <Button
          title="Continue shopping"
          onPress={() => {
            navigation.navigate(ROUTES.HOME);
          }}
          buttonStyle={styles.lowerBtn}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        style={styles.listView}
        renderItem={({item, index}) => (
          <Item
            item={item}
            itemType={itemType}
            category={category}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listView: {
    marginTop: 20,
    flex: 1,
  },
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
