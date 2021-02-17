import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {HeaderComponent} from '../../layout/HeaderComponent';
import {Button, Divider, Image} from 'react-native-elements';
import {
  FIRESTORE_COLLECTIONS,
  IS_ORDERED,
  OPERATOR,
  SPINNER_COLOR,
  SPINNER_SIZE_LG,
  SPINNER_SIZE_SM,
  SPINNER_STYLE_CENTERED,
  STATUS,
  USER_ID,
} from '../../shared/Constants';
import {Icon} from '@ui-kitten/components';
import {ROUTES} from '../../shared/Routes';
import {FormattedCurrency} from 'react-native-globalize';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default class Cart extends React.Component {
  state = {
    items: {},
    loading: true,
    removeBtn: false,
    total: 0,
    ref: {},
    itemRef: {},
  };

  componentDidMount() {
    this.state.ref = firestore().collection(
      FIRESTORE_COLLECTIONS.SHOPPING_CART,
    );
    this.getItems();
  }

  getItems = () => {
    this.state.ref
      .where(USER_ID, OPERATOR.EQ, auth().currentUser.uid)
      .where(STATUS, OPERATOR.EQ, true)
      .where(IS_ORDERED, OPERATOR.EQ, false)
      .get()
      .then(querySnapshot => {
        const list = [];
        this.setState({itemRef: querySnapshot});
        let tempTotal = 0.0;
        querySnapshot.docs.forEach(doc => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
          tempTotal += Number(doc.data().total);
        });
        this.setState({items: list});
        this.setState({total: tempTotal});
        this.setState({loading: false});
      })
      .catch(() => {
        this.setState({loading: false});
      });
  };

  removeItem = item => {
    this.setState({loading: true});
    this.state.removeBtn = true;
    firestore()
      .collection(FIRESTORE_COLLECTIONS.SHOPPING_CART)
      .doc(item.id)
      .update({
        status: false,
      })
      .then(() => {
        this.state.removeBtn = false;
        this.getItems();
      })
      .catch(() => {
        this.state.removeBtn = false;
      });
  };

  minusQuantity = item => {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateItem(item);
    }
  };

  plusQuantity = item => {
    item.quantity++;
    this.updateItem(item);
  };

  updateItem(item) {
    this.setState({loading: true});
    firestore()
      .collection(FIRESTORE_COLLECTIONS.SHOPPING_CART)
      .doc(item.id)
      .update({
        quantity: item.quantity,
        total: item.quantity * item.item.price,
        totalCurrency: item.item.currency,
      })
      .then(() => {
        this.getItems();
      })
      .catch(() => {});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderComponent navigation={this.props.navigation} />
        {!this.state.loading && this.state.items.length > 0 && (
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
              <FlatList
                data={this.state.items}
                style={styles.listView}
                renderItem={({item}) => (
                  <View style={styles.container}>
                    <View style={styles.upperContainer}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={{
                            uri: item.item.image,
                          }}
                          style={styles.image}
                          PlaceholderContent={
                            <ActivityIndicator
                              color={SPINNER_COLOR}
                              size={SPINNER_SIZE_SM}
                            />
                          }
                        />
                      </View>
                      <View style={styles.textContainer}>
                        <View style={styles.centeredContainer}>
                          <Text style={styles.itemName}>{item.item.name}</Text>
                          <Text style={styles.itemPrice}>
                            <FormattedCurrency
                              currencyCode={item.item.currency}
                              maximumFractionDigits={2}
                              value={Number(item.item.price)}
                            />
                          </Text>
                          <View style={styles.itemCountContainer}>
                            <TouchableOpacity
                              onPress={() => {
                                this.minusQuantity(item);
                              }}>
                              <Icon
                                name="minus-circle-outline"
                                style={styles.icon}
                                fill="white"
                              />
                            </TouchableOpacity>
                            <Text style={styles.itemCountText}>
                              {item.quantity}
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                this.plusQuantity(item);
                              }}>
                              <Icon
                                name="plus-circle-outline"
                                style={styles.icon}
                                fill="white"
                              />
                            </TouchableOpacity>
                          </View>
                          <Button
                            title="Remove"
                            disabled={this.state.removeBtn}
                            loading={this.state.removeBtn}
                            loadingProps={
                              <ActivityIndicator
                                color={SPINNER_COLOR}
                                size={SPINNER_SIZE_SM}
                              />
                            }
                            onPress={() => {
                              this.removeItem(item);
                            }}
                            buttonStyle={styles.removeBtn}
                          />
                        </View>
                      </View>
                    </View>
                    <Divider style={styles.divider} />
                  </View>
                )}
              />
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.totalText}>
                  <FormattedCurrency
                    currencyCode={'USD'}
                    maximumFractionDigits={2}
                    value={Number(this.state.total)}
                  />
                </Text>
              </View>
              <View style={styles.lowerContainer}>
                <Button
                  title="Place an order"
                  onPress={() => {
                    this.props.navigation.navigate(ROUTES.ORDER, {
                      items: this.state.items,
                      itemRef: this.state.itemRef,
                      total: this.state.total,
                    });
                  }}
                  buttonStyle={styles.lowerBtn}
                />
                <Button
                  title="Continue shopping"
                  onPress={() => {
                    this.props.navigation.navigate(ROUTES.HOME);
                  }}
                  buttonStyle={styles.lowerBtn}
                />
              </View>
            </View>
          </ScrollView>
        )}
        {this.state.loading && (
          <View style={styles.container}>
            <ActivityIndicator
              style={SPINNER_STYLE_CENTERED}
              size={SPINNER_SIZE_LG}
              color={SPINNER_COLOR}
            />
          </View>
        )}
        {!this.state.loading && this.state.items.length <= 0 && (
          <View style={styles.noItemContainer}>
            <Text style={styles.itemName}>No item in cart.</Text>
            <Button
              title="Continue shopping"
              onPress={() => {
                this.props.navigation.navigate(ROUTES.HOME);
              }}
              buttonStyle={styles.lowerBtn}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#96989C',
  },
  container: {
    flex: 1,
    backgroundColor: '#96989C',
  },
  noItemContainer: {
    flex: 1,
    backgroundColor: '#96989C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listView: {
    flex: 1,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 8,
    marginTop: 16,
  },
  totalText: {textAlign: 'right', color: 'white', fontSize: 24, marginLeft: 8},
  lowerContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  lowerBtn: {
    marginTop: 16,
    backgroundColor: '#47525E',
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
  itemName: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Arial',
    marginTop: 8,
  },
  itemPrice: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Arial',
    marginTop: 4,
  },
  itemCountContainer: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemCountText: {
    fontSize: 28,
    color: 'white',
    marginRight: 16,
    marginLeft: 16,
  },
  icon: {height: 40, width: 40, color: 'white', margin: 4},
  removeBtn: {backgroundColor: '#47525E', marginTop: 8},
  divider: {backgroundColor: '#7E55F3', height: 1.5, marginTop: 16},
});
