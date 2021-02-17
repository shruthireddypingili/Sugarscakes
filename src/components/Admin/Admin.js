import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {HeaderComponent} from '../../layout/HeaderComponent';
import {FlatGrid} from 'react-native-super-grid';
import {ADMIN_MANAGEMENT_LIST, FIRESTORE_COLLECTIONS} from '../../shared/Constants';
import {ROUTES} from '../../shared/Routes';

export default class Admin extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderComponent navigation={this.props.navigation} />
        <ImageBackground
          source={require('../../../assets/images/bg-3-cupcakes.jpeg')}
          style={{flex: 1}}>
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.title}>Admin</Text>
            <View style={styles.container}>
              <FlatGrid
                itemDimension={200}
                items={ADMIN_MANAGEMENT_LIST}
                style={styles.gridView}
                spacing={20}
                renderItem={({item}) => (
                  <View style={styles.itemContainer}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        if (item.name === FIRESTORE_COLLECTIONS.ORDERS) {
                          this.props.navigation.navigate(
                            ROUTES.ORDER_LIST_COMPONENT,
                          );
                        } else {
                          this.props.navigation.navigate(
                            ROUTES.ITEM_LIST_COMPONENT,
                            {
                              categoryName: item,
                            },
                          );
                        }
                      }}>
                      <View style={styles.itemTextContainer}>
                        <Text style={styles.itemName}>
                          {item.name.replace(/-/g, ' ')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
  },
  title: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Arial',
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 0,
  },
  gridView: {
    marginTop: 0,
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#47525E',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: 50,
    width: 250,
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
