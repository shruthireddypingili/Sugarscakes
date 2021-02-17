import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native-elements';
import React from 'react';
import {SOCIAL_MEDIA} from '../shared/Constants';

export function FooterComponent() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => Linking.openURL(SOCIAL_MEDIA.FACEBOOK)}>
        <Image
          source={require('../../assets/images/facebook.png')}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => Linking.openURL(SOCIAL_MEDIA.EMAIL)}>
        <Image
          source={require('../../assets/images/email.png')}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => Linking.openURL(SOCIAL_MEDIA.INSTAGRAM)}>
        <Image
          source={require('../../assets/images/instagram.png')}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 50,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
});
