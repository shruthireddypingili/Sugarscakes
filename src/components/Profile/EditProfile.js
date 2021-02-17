import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {HeaderComponent} from '../../layout/HeaderComponent';
import {FooterComponent} from '../../layout/FooterComponent';
import auth from '@react-native-firebase/auth';
import {
  ERROR_MESSAGE,
  FIREBASE_STORAGE_FOLDER,
  INVALID_INPUTS,
  SPINNER_COLOR,
  SPINNER_SIZE_SM,
  SUCCESSFUL_MESSAGE,
  PROFILE_IMAGE_UPDATED,
  SPINNER_SIZE_LG,
} from '../../shared/Constants';
import ImagePicker from 'react-native-image-crop-picker';
import {FileUpload} from '../../shared/FileUpload';
import {Avatar, Overlay} from 'react-native-elements';

export default class EditProfile extends React.Component {
  state = {id: null, name: '', email: '', photoURL: null, visible: false};

  componentDidMount() {
    const currentUser = auth().currentUser;
    this.setState({
      id: currentUser.uid,
      name: currentUser.displayName,
      email: currentUser.email,
      photoURL: currentUser.photoURL,
    });
  }

  handleUpdate = () => {
    if (this.state.name && this.state.name.trim() !== '') {
      this.setState({visible: true});
      this.updateProfile({
        displayName: this.state.name,
      });
    } else {
      Alert.alert(ERROR_MESSAGE, INVALID_INPUTS);
    }
  };

  updateProfile = data => {
    auth()
      .currentUser.updateProfile(data)
      .then(() => {
        const currentUser = auth().currentUser;
        this.setState({
          name: currentUser.displayName,
          photoURL: currentUser.photoURL,
        });
        this.setState({visible: false});
        Alert.alert(SUCCESSFUL_MESSAGE, PROFILE_IMAGE_UPDATED);
      })
      .catch(error => Alert.alert(ERROR_MESSAGE, error.message));
  };

  handleImage = () => {
    this.setState({visible: true});
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      FileUpload(
        FIREBASE_STORAGE_FOLDER.USER_PROFILES,
        image,
        this.state.id,
        url => {
          this.updateProfile({photoURL: url});
        },
        error => {
          Alert.alert(ERROR_MESSAGE, error);
        },
      );
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderComponent navigation={this.props.navigation} />
        <ImageBackground
          source={require('../../../assets/images/bg-3-cupcakes.jpeg')}
          style={{flex: 1}}>
          <ScrollView style={styles.container}>
            <Text style={styles.title}>Account Settings</Text>
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
                title={this.state.name[0]}
                size="xlarge"
                onAccessoryPress={this.handleImage}
                rounded
                showAccessory
              />
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your name"
                onChangeText={name => this.setState({name})}
                value={this.state.name}
                placeholderTextColor="white"
              />
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Enter your email"
                onChangeText={email => this.setState({email})}
                value={this.state.email}
                editable={false}
                placeholderTextColor="white"
              />
              <TouchableHighlight style={styles.loginBtn}>
                <Button
                  color="grey"
                  onPress={this.handleUpdate}
                  title="Update profile"
                />
              </TouchableHighlight>
            </View>
            <FooterComponent />
          </ScrollView>
          <Overlay
            overlayStyle={styles.overlayStyle}
            isVisible={this.state.visible}>
            <ActivityIndicator color={SPINNER_COLOR} size={SPINNER_SIZE_LG} />
          </Overlay>
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
    fontSize: 36,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Arial',
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 16,
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
  inputContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
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
  loginBtn: {
    backgroundColor: 'grey',
    color: 'white',
    width: '80%',
    marginTop: 16,
    marginBottom: 16,
  },
  overlayStyle: {padding: 20, margin: 20},
});
