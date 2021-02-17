import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {HeaderComponent} from '../../layout/HeaderComponent';
import {Button} from 'react-native-elements';
import {ROUTES} from '../../shared/Routes';
import {FACE_TO_FACE, FIRESTORE_COLLECTIONS, ONLINE} from '../../shared/Constants';

export default class Training extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderComponent navigation={this.props.navigation} />
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.containerTitle}>Training:</Text>
            <Text style={styles.labelTitle}>Face to Face:</Text>
            <Text style={styles.description}>
              Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
              accusant doloremque laudantium, totam rem aperiam eaque ipsa, quae
              ab illo inventore veritatis.
            </Text>
            <View style={styles.btnContainer}>
              <Button
                title="Click to view more"
                onPress={() => {
                  this.props.navigation.navigate(ROUTES.ITEMS_COMPONENT, {
                    categoryName: FACE_TO_FACE,
                    itemType: FIRESTORE_COLLECTIONS.TRAINING_WORKSHOPS,
                  });
                }}
                buttonStyle={styles.btn}
              />
            </View>
            <Text style={styles.labelTitle}>Online:</Text>
            <Text style={styles.description}>
              Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
              accusant doloremque laudantium, totam rem aperiam eaque ipsa, quae
              ab illo inventore veritatis.
            </Text>
            <View style={styles.btnContainer}>
              <Button
                title="Click to view more"
                onPress={() => {
                  this.props.navigation.navigate(ROUTES.ITEMS_COMPONENT, {
                    categoryName: ONLINE,
                    itemType: FIRESTORE_COLLECTIONS.TRAINING_WORKSHOPS,
                  });
                }}
                buttonStyle={styles.btn}
              />
            </View>
          </View>
        </ScrollView>
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
  containerTitle: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
    marginLeft: 16,
    marginTop: 16,
  },
  labelTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
    marginLeft: 16,
    marginTop: 16,
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginLeft: 30,
    marginTop: 16,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 16,
  },
  btn: {
    marginTop: 16,
    marginBottom: 16,
    width: 150,
    backgroundColor: '#47525E',
  },
});
