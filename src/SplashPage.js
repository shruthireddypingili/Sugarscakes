import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {SPINNER_COLOR} from './shared/Constants';

export default class SplashPage extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'Main' : 'Login');
      });
    }, 1800);
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/splash.jpeg')}
        style={{flex: 1}}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('../assets/images/logo.png')}
          />
          <ActivityIndicator color={SPINNER_COLOR} size="large" />
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  logo: {
    width: 400,
    height: 700,
    resizeMode: 'contain',
  },
});
