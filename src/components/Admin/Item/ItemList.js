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
  ORDER_BY,
  SPINNER_COLOR,
  SPINNER_SIZE_LG,
  SPINNER_STYLE_CENTERED,
  UPDATED_AT,
} from '../../../shared/Constants';
import {Badge, Image, ListItem, Button, Avatar} from 'react-native-elements';
import {ROUTES} from '../../../shared/Routes';
import {FormattedCurrency} from 'react-native-globalize';
import {SPINNER_SIZE_SM} from '../../../shared/Constants';
import {Icon} from '@ui-kitten/components';

export function ItemList({category, navigation}) {
  const ref = firestore().collection(category.name);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const addBtn = () => {
    return (
      <Button
        title="Add Item"
        buttonStyle={styles.addBtn}
        onPress={() => {
          if (category.category) {
            navigation.navigate(ROUTES.ITEM_ADD_COMPONENT, {
              category: category,
              item: null,
            });
          } else {
            navigation.navigate(ROUTES.CATEGORY_ADD_COMPONENT, {
              category: category,
              item: null,
            });
          }
        }}
      />
    );
  };

  useEffect(() => {
    const subscriber = ref
      .orderBy(UPDATED_AT, ORDER_BY.DESC)
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
        <Text style={styles.emptyText}>No item in this category.</Text>
        {addBtn()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {addBtn()}
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
                  {item.name?.replace(/-/g, ' ')}
                </Text>
                {item.is_best && (
                  <Icon name="star-outline" style={styles.icon} fill="orange" />
                )}
              </View>
            }
            containerStyle={styles.listContainer}
            subtitle={
              item.price && (
                <>
                  <FormattedCurrency
                    currencyCode={item.currency}
                    maximumFractionDigits={2}
                    value={Number(item.price)}
                  />
                  <View style={styles.subtitleContainer}>
                    {item.categories.map(c => (
                      <Badge
                        value={c.replace(/-/g, ' ')}
                        status="primary"
                        containerStyle={styles.badgeContainer}
                        textStyle={{textTransform: 'capitalize'}}
                      />
                    ))}
                  </View>
                </>
              )
            }
            leftAvatar={
              <View>
                {item.image && (
                  <Image
                    source={{
                      uri: item.image,
                    }}
                    PlaceholderContent={
                      <ActivityIndicator
                        color={SPINNER_COLOR}
                        size={SPINNER_SIZE_SM}
                      />
                    }
                    containerStyle={styles.image}
                  />
                )}
                {!item.image && (
                  <Avatar
                    containerStyle={styles.image}
                    titleStyle={styles.imageTitle}
                    title={item?.name[0]}
                    size="medium"
                    rounded
                  />
                )}
                <Badge
                  status={item.status ? 'success' : 'error'}
                  badgeStyle={styles.statusPoint}
                />
              </View>
            }
            rightAvatar={
              <Icon name="edit-outline" style={styles.editIcon} fill="grey" />
            }
            onPress={() => {
              {
                if (category.category) {
                  navigation.navigate(ROUTES.ITEM_ADD_COMPONENT, {
                    category: category,
                    item: item,
                  });
                } else {
                  navigation.navigate(ROUTES.CATEGORY_ADD_COMPONENT, {
                    category: category,
                    item: item,
                  });
                }
              }
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
  subtitleContainer: {flexDirection: 'row', justifyContent: 'flex-start'},
  badgeContainer: {margin: 2},
  itemName: {
    fontSize: 20,
    textTransform: 'capitalize',
  },
  imageTitle: {
    color: 'white',
    textTransform: 'capitalize',
  },
  icon: {height: 20, width: 20, color: 'white', margin: 4},
  editIcon: {height: 30, width: 30, color: 'white', margin: 4},
  image: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    backgroundColor: 'grey',
  },
  statusPoint: {
    position: 'absolute',
    top: -12,
    right: 0,
    height: 15,
    width: 15,
    borderRadius: 15 / 2,
  },
  addBtn: {marginBottom: 16, backgroundColor: 'orange'},
});
