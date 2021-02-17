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
  SPINNER_SIZE_SM,
  SUCCESSFUL_MESSAGE,
  SPINNER_SIZE_LG,
  FIRESTORE_COLLECTIONS,
  STATUS,
  OPERATOR,
  DATA_SUBMITTED,
} from '../../../shared/Constants';
import ImagePicker from 'react-native-image-crop-picker';
import {FileUpload} from '../../../shared/FileUpload';
import {Avatar, Overlay} from 'react-native-elements';
import {HeaderComponent} from '../../../layout/HeaderComponent';
import firestore from '@react-native-firebase/firestore';
import MultiSelect from 'react-native-multiple-select';
import {Toggle} from '@ui-kitten/components';
import {removeNullUnDefine, uuidV4} from '../../../shared/Util';

export default class ItemAddComponent extends React.Component {
  state = {
    id: null,
    category: {},
    item: {
      id: null,
      name: null,
      price: null,
      currency: null,
      description: null,
      categories: null,
      image: null,
      is_best: false,
      status: true,
      updatedAt: null,
      createdAt: null,
      qualification: null,
      subDetails: null,
    },
    image: null,
    categories: [],
    visible: false,
  };

  componentDidMount() {
    const data = this.props.route.params;
    if (data.item) {
      this.setState({id: data.item.id, item: data.item});
    }
    this.setState({category: data.category});
    this.getCategories();
  }

  getCategories = () => {
    firestore()
      .collection(this.props.route.params.category.category)
      .where(STATUS, OPERATOR.EQ, true)
      .onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          list.push({
            docId: doc.id,
            ...doc.data(),
          });
        });
        this.setState({categories: list});
      });
  };

  handleSubmit = () => {
    if (
      this.state.item.name &&
      this.state.item.name.trim() !== '' &&
      this.state.item.price &&
      this.state.item.currency &&
      this.state.item.currency.trim() !== '' &&
      this.state.item.description &&
      this.state.item.description.trim() !== '' &&
      this.state.item.image &&
      this.state.item.image.trim() !== '' &&
      this.state.item.categories &&
      this.state.item.categories.length > 0
    ) {
      if (this.state.item.id) {
        this.updateItem();
      } else {
        this.addItem();
      }
    } else {
      Alert.alert(ERROR_MESSAGE, INVALID_INPUTS);
    }
  };

  getCleanObj = () => {
    let item = removeNullUnDefine(this.state.item);
    item.price = Number(item.price);
    item.createdAt = this.state.item.createdAt;
    return item;
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

  handleImage = () => {
    this.setState({visible: true});
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      FileUpload(
        this.state.category.photoFolder,
        image,
        uuidV4(),
        url => {
          this.setState(prevState => {
            let item = {...prevState.item};
            item.image = url;
            return {item};
          });
          if (this.state.item.id) {
            this.updateItem();
          } else {
            this.setState({visible: false});
          }
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
        <ScrollView style={styles.container}>
          <View style={styles.inputContainer}>
            <Avatar
              source={this.state.item.image && {uri: this.state.item.image}}
              renderPlaceholderContent={
                this.state.item.image && (
                  <ActivityIndicator
                    color={SPINNER_COLOR}
                    size={SPINNER_SIZE_SM}
                  />
                )
              }
              containerStyle={styles.imageContainer}
              titleStyle={styles.imageTitle}
              title={
                this.state.category.name ? this.state.category.name[0] : ''
              }
              size="xlarge"
              onAccessoryPress={this.handleImage}
              accessory={{name: 'camera-alt'}}
              rounded={!this.state.item.image}
              showAccessory
            />
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
            {this.state.category.name ===
              FIRESTORE_COLLECTIONS.TRAINING_WORKSHOPS && (
              <>
                <Text style={styles.label}>Sub Details</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter sub details"
                  onChangeText={subDetails => {
                    const item = {...this.state.item, subDetails: subDetails};
                    this.setState({item});
                  }}
                  value={this.state.item.subDetails}
                  placeholderTextColor="white"
                />
              </>
            )}
            <Text style={styles.label}>Currency</Text>
            <MultiSelect
              hideTags
              single={true}
              items={[{name: 'USD'}]}
              uniqueKey="name"
              selectedItems={
                this.state.item.currency ? this.state.item.currency : []
              }
              onSelectedItemsChange={data => {
                this.setState(prevState => {
                  let item = {...prevState.item};
                  item.currency = data[0];
                  return {item};
                });
              }}
              selectText={
                this.state.item.currency
                  ? this.state.item.currency
                  : 'Pick Currency'
              }
              displayKey="name"
              selectedItemTextColor="orange"
              selectedItemIconColor="orange"
              textInputProps={{editable: false, autoFocus: false}}
              searchInputPlaceholderText=""
              searchIcon={false}
              styleMainWrapper={styles.multiPickListContainer}
              styleRowList={styles.multiPickListRow}
              styleInputGroup={styles.styleInputGroup}
            />
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter price"
              keyboardType="numeric"
              onChangeText={price => {
                const item = {...this.state.item, price: price};
                this.setState({item});
              }}
              value={this.state.item.price ? String(this.state.item.price) : ''}
              placeholderTextColor="white"
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter description"
              onChangeText={description => {
                const item = {...this.state.item, description: description};
                this.setState({item});
              }}
              value={this.state.item.description}
              placeholderTextColor="white"
            />
            <Text style={styles.label}>Categories</Text>
            <MultiSelect
              hideTags
              single={false}
              items={this.state.categories}
              uniqueKey="name"
              selectedItems={
                this.state.item.categories ? this.state.item.categories : []
              }
              onSelectedItemsChange={data => {
                this.setState(prevState => {
                  let item = {...prevState.item};
                  item.categories = data;
                  return {item};
                });
              }}
              selectText="Pick Category"
              searchInputPlaceholderText="Search Items..."
              textInputProps={{autoFocus: false}}
              displayKey="name"
              submitButtonText="SELECT"
              submitButtonColor="#ccc"
              selectedItemTextColor="orange"
              selectedItemIconColor="orange"
              styleMainWrapper={styles.multiPickListContainer}
              styleRowList={styles.multiPickListRow}
              styleInputGroup={styles.styleInputGroup}
            />
            {this.state.category.name ===
              FIRESTORE_COLLECTIONS.TRAINING_WORKSHOPS && (
              <>
                <Text style={styles.label}>Qualification</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter qualification"
                  onChangeText={qualification => {
                    const item = {
                      ...this.state.item,
                      qualification: qualification,
                    };
                    this.setState({item});
                  }}
                  value={this.state.item.qualification}
                  placeholderTextColor="white"
                />
              </>
            )}
            <View style={styles.toggle}>
              {this.state.category.name === FIRESTORE_COLLECTIONS.CAKES && (
                <>
                  <Toggle
                    style={styles.toggle}
                    checked={this.state.item.is_best}
                    onChange={is_best => {
                      const item = {...this.state.item, is_best: is_best};
                      this.setState({item});
                    }}>
                    <Text style={styles.toggleText}>Best Cake</Text>
                  </Toggle>
                </>
              )}
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
  image: {
    justifyContent: 'center',
  },
  imageContainer: {
    backgroundColor: 'grey',
    marginTop: 20,
  },
  imageTitle: {
    color: 'white',
    textTransform: 'capitalize',
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
  multiPickListContainer: {width: '90%', marginTop: 8, marginBottom: 16},
  multiPickListRow: {width: '100%', paddingLeft: 4, paddingRight: 4},
  styleInputGroup: {paddingLeft: 16, paddingRight: 16},
  toggle: {
    flex: 1,
    margin: 10,
    width: '90%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  toggleText: {color: 'white', fontSize: 18},
});
