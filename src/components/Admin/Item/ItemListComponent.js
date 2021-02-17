import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {HeaderComponent} from '../../../layout/HeaderComponent';
import {ItemList} from './ItemList';

export default class ItemListComponent extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderComponent navigation={this.props.navigation} />
        <ScrollView style={styles.container}>
          <Text style={styles.title}>
            {this.props.route.params.categoryName.name.replace(/-/g, ' ')}
          </Text>
          <ItemList
            category={this.props.route.params.categoryName}
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
});
