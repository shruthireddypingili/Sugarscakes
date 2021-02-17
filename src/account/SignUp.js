import React from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  ImageBackground,
  Image,
  Text,
  View,
  TouchableHighlight, ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import {onGoogleButtonPress} from '../shared/GoogleLogin';
import {GOOGLE_SIGN_IN_CONFIG} from '../shared/Constants';

export default class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    cPassword: '',
  };

  componentDidMount() {
    GoogleSignin.configure(GOOGLE_SIGN_IN_CONFIG);
  }

  handleSignUp = () => {
    if (
      this.state.email &&
      this.state.email.trim() !== '' &&
      this.state.password &&
      this.state.password.trim() !== '' &&
      this.state.password === this.state.cPassword
    ) {
      auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Main'))
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
        <ScrollView>
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/logo.png')}
            />
            <Text style={styles.headerText}>Sign Up</Text>
            {this.state.errorMessage && (
              <Text style={{color: 'red', fontSize: 16}}>
                {this.state.errorMessage}
              </Text>
            )}
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={email => this.setState({email})}
              value={this.state.email}
              placeholderTextColor="white"
            />
            <TextInput
              secureTextEntry
              placeholder="Password"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={password => this.setState({password})}
              value={this.state.password}
              placeholderTextColor="white"
            />
            <TextInput
              secureTextEntry
              placeholder="Confirm Password"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={cPassword => this.setState({cPassword})}
              value={this.state.cPassword}
              placeholderTextColor="white"
            />
            <Text
              style={styles.login}
              onPress={() => this.props.navigation.navigate('Login')}>
              Already have an account? Login
            </Text>
            <TouchableHighlight style={styles.signUpBtn}>
              <Button color="grey" title="Sign Up" onPress={this.handleSignUp}/>
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
  login: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left',
    marginTop: 8,
    marginBottom: 20,
    width: '90%',
  },
  signUpBtn: {
    backgroundColor: 'grey',
    color: 'white',
    width: '80%',
    marginTop: 8,
    marginBottom: 16,
  },
  OrText: {color: 'white', fontSize: 16, marginTop: 8, marginBottom: 8},
});
