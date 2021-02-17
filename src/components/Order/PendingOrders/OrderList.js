import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  FIRESTORE_COLLECTIONS,
  OPERATOR,
  ORDER__STATUS,
  ORDER_STATUS,
  SPINNER_COLOR,
  SPINNER_SIZE_LG,
  SPINNER_STYLE_CENTERED,
  USER_ID,
} from '../../../shared/Constants';
import {Badge, ListItem} from 'react-native-elements';
import {ROUTES} from '../../../shared/Routes';
import {FormattedCurrency} from 'react-native-globalize';
import auth from '@react-native-firebase/auth';

export function OrderList({navigation}) {
  const ref = firestore().collection(FIRESTORE_COLLECTIONS.ORDERS);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const subscriber = ref
      .where(ORDER__STATUS, OPERATOR.IN, [
        ORDER_STATUS[0].name,
        ORDER_STATUS[1].name,
        ORDER_STATUS[3].name,
      ])
      .where(USER_ID, OPERATOR.EQ, auth().currentUser.uid)
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
        <Text style={styles.emptyText}>No orders.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        style={styles.listView}
        bounces={false}
        renderItem={({item, index}) => (
          <ListItem
            key={index}
            title={
              <View style={styles.titleContainer}>
                <Text style={styles.itemName}>
                  {item.createdAt.toDate().toLocaleDateString()}
                </Text>
                {item.orderStatus === ORDER_STATUS[0].name && (
                  <Badge
                    value={item.orderStatus}
                    status="error"
                    containerStyle={styles.badgeContainer}
                    badgeStyle={styles.badgeStyle}
                    textStyle={styles.badgeText}
                  />
                )}
                {item.orderStatus === ORDER_STATUS[1].name && (
                  <Badge
                    value={item.orderStatus}
                    status="success"
                    containerStyle={styles.badgeContainer}
                    badgeStyle={styles.badgeStyle}
                    textStyle={styles.badgeText}
                  />
                )}
                {item.orderStatus === ORDER_STATUS[2].name && (
                  <Badge
                    value={item.orderStatus}
                    status="warning"
                    containerStyle={styles.badgeContainer}
                    badgeStyle={styles.badgeStyle}
                    textStyle={styles.badgeText}
                  />
                )}
                {item.orderStatus === ORDER_STATUS[3].name && (
                  <Badge
                    value={item.orderStatus}
                    status="primary"
                    containerStyle={styles.badgeContainer}
                    badgeStyle={styles.badgeStyle}
                    textStyle={styles.badgeText}
                  />
                )}
              </View>
            }
            containerStyle={styles.listContainer}
            leftAvatar={
              <Text style={styles.PriceText}>
                <FormattedCurrency
                  currencyCode={item.totalCurrency}
                  maximumFractionDigits={2}
                  value={Number(item.total)}
                />
              </Text>
            }
            chevron
            onPress={() => {
              navigation.navigate(ROUTES.PENDING_ORDER_DETAILS, {
                item: item,
              });
            }}
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
    flex: 1,
    marginBottom: 16,
  },
  listContainer: {marginBottom: 1},
  noItemContainer: {
    backgroundColor: '#96989C',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  emptyText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Arial',
    marginTop: 8,
  },
  titleContainer: {flexDirection: 'row', justifyContent: 'flex-start'},
  badgeContainer: {margin: 2, marginLeft: 16},
  badgeStyle: {padding: 8},
  badgeText: {fontSize: 14},
  itemName: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  PriceText: {fontSize: 18, width: 70},
});
