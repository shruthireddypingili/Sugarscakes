import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {HeaderComponent} from '../../layout/HeaderComponent';
import {
  ERROR_MESSAGE,
  SPINNER_COLOR,
  SPINNER_SIZE_SM,
} from '../../shared/Constants';
import {Button, Overlay} from 'react-native-elements';
import {ConfirmOrder} from './ConfirmOrder';
import {ROUTES} from '../../shared/Routes';

export default class Orders extends React.Component {
  state = {address: '', phoneNumber: '', orderBtn: false, visible: false};

  sendOrder = () => {
    if (
      this.state.address &&
      this.state.address.trim() !== '' &&
      this.state.phoneNumber &&
      this.state.phoneNumber.trim() !== ''
    ) {
      this.setState(() => ({orderBtn: true}));
      ConfirmOrder(
        this.props.route.params,
        this.state.address,
        this.state.phoneNumber,
      )
        .then(result => {
          this.setState(() => ({orderBtn: false}));
          if (result) {
            this.toggleOverlay();
          }
        })
        .catch(() => {
          this.setState(() => ({orderBtn: false}));
        });
    } else {
      Alert.alert(ERROR_MESSAGE, 'Invalid inputs!');
    }
  };

  toggleOverlay = () => {
    this.setState({visible: !this.state.visible});
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderComponent navigation={this.props.navigation} />
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Delivery and Payment</Text>
          <Text style={styles.labelText}>Address</Text>
          <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={4}
            placeholder="Address"
            onChangeText={address => this.setState({address})}
            value={this.state.address}
            placeholderTextColor="white"
          />
          <Text style={styles.labelText}>Mobile Number</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            autoCapitalize="none"
            placeholder="Mobile Number"
            onChangeText={phoneNumber => this.setState({phoneNumber})}
            value={this.state.phoneNumber}
            placeholderTextColor="white"
          />
          <Text style={styles.codText}>
            **Only Cash On Delivery (COD) Available
          </Text>
          <Button
            title="Confirm order"
            disabled={this.state.orderBtn}
            loading={this.state.orderBtn}
            loadingProps={
              <ActivityIndicator color={SPINNER_COLOR} size={SPINNER_SIZE_SM} />
            }
            onPress={this.sendOrder}
            buttonStyle={styles.lowerBtn}
          />
        </ScrollView>
        <Overlay
          overlayStyle={styles.overlayStyle}
          isVisible={this.state.visible}>
          <Text style={styles.thankYouText}>
            Thank you for Shopping with us!!!
          </Text>
          <Button
            title="Back to home"
            onPress={() => {
              this.toggleOverlay();
              this.props.navigation.navigate(ROUTES.HOME);
            }}
            buttonStyle={styles.homeBtn}
          />
        </Overlay>
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
    fontFamily: 'Arial',
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 0,
  },
  codText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Arial',
    marginTop: 32,
    marginBottom: 16,
  },
  labelText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'left',
    fontFamily: 'Arial',
    marginTop: 20,
    marginLeft: 16,
  },
  textInput: {
    width: '90%',
    color: 'white',
    borderColor: 'white',
    borderWidth: 0,
    borderBottomWidth: 2,
    marginTop: 8,
    marginBottom: 16,
    marginLeft: 16,
  },
  lowerBtn: {
    backgroundColor: '#47525E',
    margin: 20,
    marginTop: 24,
  },
  overlayStyle: {padding: 20, margin: 20},
  thankYouText: {
    fontSize: 32,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Arial',
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 0,
  },
  homeBtn: {
    backgroundColor: '#47525E',
    margin: 20,
    marginTop: 32,
  },
});
