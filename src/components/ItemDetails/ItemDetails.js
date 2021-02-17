import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {HeaderComponent} from '../../layout/HeaderComponent';
import {ItemDetail} from './ItemDetail';

export default class ItemDetails extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderComponent navigation={this.props.navigation} />
        <ScrollView style={styles.container}>
          <ItemDetail
            id={this.props.route.params.id}
            itemType={this.props.route.params.itemType}
            navigation={this.props.navigation}
          />
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
});
