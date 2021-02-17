// Login.js
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ImageBackground,
  Image,
  TouchableHighlight,
} from 'react-native';
import auth from '@react-native-firebase/auth';

export default class ForgotPassword extends React.Component {
  state = {email: '', errorMessage: null};

  handleLogin = () => {
    if (this.state.email && this.state.email.trim() !== '') {
      auth()
        .sendPasswordResetEmail(this.state.email)
        .then(() => this.props.navigation.navigate('Login'))
        .catch(error => this.setState({errorMessage: error.message}));
    } else {
      this.setState({errorMessage: 'Invalid inputs!'});
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('../../assets/images/bg-3-cupcakes.jpeg')}
        style={{flex: 1}}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/logo.png')}
          />
          <Text style={styles.headerText}>Forgot Password</Text>
          {this.state.errorMessage && (
            <Text style={{color: 'red', fontSize: 16}}>
              {this.state.errorMessage}
            </Text>
          )}
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            placeholderTextColor="white"
          />
          <Text
            style={styles.login}
            onPress={() => this.props.navigation.navigate('Login')}>
            Back to login
          </Text>
          <TouchableHighlight style={styles.loginBtn}>
            <Button
              color="grey"
              onPress={this.handleLogin}
              title="Reset Password"
            />
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '90%',
    color: 'white',
    borderColor: 'white',
    borderWidth: 0,
    borderBottomWidth: 2,
    marginTop: 8,
    marginBottom: 16,
  },
  logo: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
    position: 'absolute',
    top: 1,
  },
  headerText: {color: 'white', fontSize: 24, marginBottom: 16},
  login: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left',
    marginTop: 8,
    marginBottom: 20,
    width: '90%',
  },
  loginBtn: {
    backgroundColor: 'grey',
    color: 'white',
    width: '80%',
    marginTop: 8,
    marginBottom: 16,
  },
});
