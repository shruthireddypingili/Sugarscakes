import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  ERROR_MESSAGE,
  INVALID_INPUTS,
  SPINNER_COLOR,
  SUCCESSFUL_MESSAGE,
  SPINNER_SIZE_LG,
  DATA_SUBMITTED,
} from '../../../shared/Constants';
import {Overlay} from 'react-native-elements';
import {HeaderComponent} from '../../../layout/HeaderComponent';
import firestore from '@react-native-firebase/firestore';
import {Toggle} from '@ui-kitten/components';
import {removeNullUnDefine} from '../../../shared/Util';

export default class CategoryAddComponent extends React.Component {
  state = {
    id: null,
    item: {
      id: null,
      name: null,
      status: true,
      updatedAt: null,
      createdAt: null,
    },
    visible: false,
    category: {},
  };

  componentDidMount() {
    const data = this.props.route.params;
    if (data.item) {
      this.setState({id: data.item.id, item: data.item});
    }
    this.setState({category: data.category});
  }

  getCleanObj = () => {
    let item = removeNullUnDefine(this.state.item);
    item.createdAt = this.state.item.createdAt;
    return item;
  };

  handleSubmit = () => {
    if (this.state.item.name && this.state.item.name.trim() !== '') {
      if (this.state.item.id) {
        this.updateItem();
      } else {
        this.addItem();
      }
    } else {
      Alert.alert(ERROR_MESSAGE, INVALID_INPUTS);
    }
  };

  updateItem = () => {
    this.setState({visible: true});
    firestore()
      .collection(this.state.category.name)
      .doc(this.state.item.id)
      .update({
        ...this.getCleanObj(),
        updatedAt: firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        this.setState({visible: false});
        Alert.alert(SUCCESSFUL_MESSAGE, DATA_SUBMITTED);
        this.props.navigation.goBack();
      })
      .catch(error => {
        this.setState({visible: false});
        Alert.alert(ERROR_MESSAGE, error);
      });
  };

  addItem = () => {
    this.setState({visible: true});
    firestore()
      .collection(this.state.category.name)
      .add({
        ...this.getCleanObj(),
        createdAt: firestore.Timestamp.fromDate(new Date()),
        updatedAt: firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        this.setState({visible: false});
        Alert.alert(SUCCESSFUL_MESSAGE, DATA_SUBMITTED);
        this.props.navigation.goBack();
      })
      .catch(error => {
        this.setState({visible: false});
        Alert.alert(ERROR_MESSAGE, error);
      });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderComponent navigation={this.props.navigation} />
        <ScrollView style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter name"
              onChangeText={name => {
                const item = {...this.state.item, name: name};
                this.setState({item});
              }}
              value={this.state.item.name}
              placeholderTextColor="white"
            />
            <View style={styles.toggle}>
              <Toggle
                style={styles.toggle}
                checked={this.state.item.status}
                onChange={status => {
                  const item = {...this.state.item, status: status};
                  this.setState({item});
                }}>
                <Text style={styles.toggleText}>Active</Text>
              </Toggle>
            </View>
            <TouchableHighlight style={styles.loginBtn}>
              <Button
                color="orange"
                onPress={this.handleSubmit}
                title="Submit"
              />
            </TouchableHighlight>
          </View>
        </ScrollView>
        <Overlay
          overlayStyle={styles.overlayStyle}
          isVisible={this.state.visible}>
          <ActivityIndicator color={SPINNER_COLOR} size={SPINNER_SIZE_LG} />
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
    fontSize: 36,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Arial',
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 16,
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
  toggle: {
    flex: 1,
    margin: 10,
    width: '90%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  toggleText: {color: 'white', fontSize: 18},
});
