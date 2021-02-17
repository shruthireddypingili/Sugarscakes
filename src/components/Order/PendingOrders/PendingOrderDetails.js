import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {HeaderComponent} from '../../../layout/HeaderComponent';
import {Badge, Image, ListItem, Overlay} from 'react-native-elements';
import {
  SPINNER_COLOR,
  SPINNER_SIZE_LG,
  SPINNER_SIZE_SM,
} from '../../../shared/Constants';
import {FormattedCurrency} from 'react-native-globalize';

export default class PendingOrderDetails extends React.Component {
  itemDetail = this.props.route.params.item;

  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderComponent navigation={this.props.navigation} />
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Order Details</Text>
          <View style={styles.detailContainer}>
            <Text style={styles.labelTitle}>Order Status</Text>
            <Text style={styles.priceText}>{this.itemDetail.orderStatus}</Text>
            <Text style={styles.labelTitle}>Total amount</Text>
            <Text style={styles.priceText}>
              <FormattedCurrency
                currencyCode={this.itemDetail.totalCurrency}
                maximumFractionDigits={2}
                value={Number(this.itemDetail.total)}
              />
            </Text>
            <Text style={styles.labelTitle}>Address</Text>
            <Text style={styles.contentText}>{this.itemDetail.address}</Text>
            <Text style={styles.labelTitle}>Phone Number</Text>
            <Text style={styles.contentText}>
              {this.itemDetail.phoneNumber}
            </Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.listTitle}>Order Items</Text>
            <FlatList
              data={this.itemDetail.items}
              style={styles.listView}
              bounces={false}
              renderItem={({item, index}) => (
                <ListItem
                  key={index}
                  title={
                    <View style={styles.titleContainer}>
                      <Text style={styles.itemName}>{item.item.name}</Text>
                    </View>
                  }
                  containerStyle={styles.listContainer}
                  subtitle={
                    item.item.price && (
                      <>
                        <FormattedCurrency
                          currencyCode={item.totalCurrency}
                          maximumFractionDigits={2}
                          value={Number(item.total)}
                        />
                        <View style={styles.subtitleContainer}>
                          <Badge
                            value={item.itemType.replace(/-/g, ' ')}
                            status="primary"
                            containerStyle={styles.badgeContainer}
                            textStyle={{textTransform: 'capitalize'}}
                          />
                        </View>
                      </>
                    )
                  }
                  leftAvatar={
                    <View>
                      <Image
                        source={{
                          uri: item.item.image,
                        }}
                        PlaceholderContent={
                          <ActivityIndicator
                            color={SPINNER_COLOR}
                            size={SPINNER_SIZE_SM}
                          />
                        }
                        containerStyle={styles.image}
                      />
                    </View>
                  }
                  rightAvatar={
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                  }
                />
              )}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#96989C',
  },
  title: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'Arial',
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 0,
  },
  listView: {
    flex: 1,
    marginBottom: 16,
  },
  listContainer: {marginBottom: 1},
  titleContainer: {flexDirection: 'row', justifyContent: 'flex-start'},
  subtitleContainer: {flexDirection: 'row', justifyContent: 'flex-start'},
  badgeContainer: {margin: 2},
  itemName: {
    fontSize: 20,
    textTransform: 'capitalize',
  },
  editIcon: {height: 30, width: 30, color: 'white', margin: 4},
  image: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    backgroundColor: 'grey',
  },
  quantityText: {fontSize: 24, marginRight: 8},
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 16,
    marginBottom: 20,
  },
  labelTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  listTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    marginLeft: 16,
  },
  contentText: {color: 'white', marginBottom: 10},
  priceText: {color: 'white', fontSize: 20, marginBottom: 16},
});
