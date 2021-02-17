import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {Cake} from './Cake';
import {
  FIRESTORE_COLLECTIONS,
  IS_BEST,
  OPERATOR,
  SPINNER_COLOR,
  SPINNER_SIZE_LG,
  SPINNER_STYLE_CENTERED,
  STATUS,
} from '../../shared/Constants';
import {Button} from 'react-native-elements';
import {ROUTES} from '../../shared/Routes';

export function Cakes({navigation}) {
  const ref = firestore().collection(FIRESTORE_COLLECTIONS.CAKES);
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true on component mount

  useEffect(() => {
    const subscriber = ref
      .where(IS_BEST, OPERATOR.EQ, true)
      .where(STATUS, OPERATOR.EQ, true)
      .onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCakes(list);
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

  if (cakes.length <= 0 && !loading) {
    return (
      <View style={styles.noItemContainer}>
        <Text style={styles.itemName}>No item found.</Text>
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
        items={cakes}
        style={styles.gridView}
        spacing={0}
        renderItem={({item, index}) => (
          <Cake cake={item} navigation={navigation} />
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
  gridView: {
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
