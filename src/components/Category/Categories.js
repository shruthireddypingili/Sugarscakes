import firestore from '@react-native-firebase/firestore';
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {Category} from './Category';
import {
  OPERATOR,
  SPINNER_COLOR,
  SPINNER_SIZE_LG,
  SPINNER_STYLE_CENTERED,
  STATUS,
} from '../../shared/Constants';
import {Button} from 'react-native-elements';
import {ROUTES} from '../../shared/Routes';
import {LocalizationContext} from '../../shared/Translations';

export function Categories({CategoryType, itemType, navigation}) {
  const ref = firestore().collection(CategoryType);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  initializeAppLanguage();

  useEffect(() => {
    const subscriber = ref
      .where(STATUS, OPERATOR.EQ, true)
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
  }, [ref]);

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
        <Text style={styles.itemName}>{translations['Category.NoItem']}</Text>
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
      <FlatGrid
        itemDimension={100}
        items={items}
        style={styles.gridView}
        spacing={20}
        renderItem={({item, index}) => (
          <Category item={item} itemType={itemType} navigation={navigation} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
  },
  gridView: {
    marginTop: 0,
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
