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
  ScrollView,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import {GOOGLE_SIGN_IN_CONFIG, INVALID_INPUTS} from '../shared/Constants';
import {onGoogleButtonPress} from '../shared/GoogleLogin';

export default class Login extends React.Component {
  state = {email: '', password: ''};

  componentDidMount() {
    GoogleSignin.configure(GOOGLE_SIGN_IN_CONFIG);
  }

  handleLogin = () => {
    if (
      this.state.email &&
      this.state.email.trim() !== '' &&
      this.state.password &&
      this.state.password.trim() !== ''
    ) {
      auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error => Alert.alert(error.message));
    } else {
      Alert.alert(INVALID_INPUTS);
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('../../assets/images/bg-3-cupcakes.jpeg')}
        style={{flex: 1}}>
        <ScrollView>
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/logo.png')}
            />
            <Text style={styles.headerText}>Login</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Email"
              onChangeText={email => this.setState({email})}
              value={this.state.email}
              placeholderTextColor="white"
            />
            <TextInput
              secureTextEntry
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Password"
              onChangeText={password => this.setState({password})}
              value={this.state.password}
              placeholderTextColor="white"
            />
            <View style={styles.sectionLayer}>
              <Text
                style={styles.SignUp}
                onPress={() => this.props.navigation.navigate('SignUp')}>
                Need an account?
              </Text>
              <Text
                style={styles.SignUp}
                onPress={() =>
                  this.props.navigation.navigate('ForgotPassword')
                }>
                Forgot Password?
              </Text>
            </View>
            <TouchableHighlight style={styles.loginBtn}>
              <Button color="grey" onPress={this.handleLogin} title="Login" />
            </TouchableHighlight>
            <Text style={styles.OrText}>Or</Text>
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={onGoogleButtonPress}
            />
          </View>
        </ScrollView>
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
    width: 200,
    height: 250,
    resizeMode: 'contain',
  },
  headerText: {color: 'white', fontSize: 24, marginBottom: 16},
  SignUp: {
    color: 'white',
    fontSize: 16,
  },
  sectionLayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 8,
    marginBottom: 20,
  },
  loginBtn: {
    backgroundColor: 'grey',
    color: 'white',
    width: '80%',
    marginTop: 8,
    marginBottom: 16,
  },
  OrText: {color: 'white', fontSize: 16, marginTop: 8, marginBottom: 8},
});
