import React from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {HeaderComponent} from '../../layout/HeaderComponent';
import {FooterComponent} from '../../layout/FooterComponent';
import auth from '@react-native-firebase/auth';
import {SPINNER_COLOR, SPINNER_SIZE_SM} from '../../shared/Constants';
import {Avatar} from 'react-native-elements';

export default class ViewProfile extends React.Component {
  state = {name: '', email: '', photoURL: null};

  componentDidMount() {
    const currentUser = auth().currentUser;
    this.setState({
      name: currentUser.displayName,
      email: currentUser.email,
      photoURL: currentUser.photoURL,
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderComponent navigation={this.props.navigation} />
        <ImageBackground
          source={require('../../../assets/images/bg-3-cupcakes.jpeg')}
          style={{flex: 1}}>
          <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
              <Avatar
                source={{
                  uri: this.state.photoURL,
                }}
                renderPlaceholderContent={
                  <ActivityIndicator
                    color={SPINNER_COLOR}
                    size={SPINNER_SIZE_SM}
                  />
                }
                avatarStyle={styles.image}
                title={this.state.name ? this.state.name[0] : 'U'}
                size="xlarge"
                rounded
              />
              <Text style={styles.label}>Name</Text>
              <Text style={styles.title}>{this.state.name}</Text>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.title}>{this.state.email}</Text>
            </View>
            <FooterComponent />
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    color: 'white',
    marginTop: 8,
    marginBottom: 20,
    width: '90%',
  },
  image: {
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginTop: 16,
    marginBottom: 0,
    width: '90%',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
});
