import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {HeaderComponent} from '../../layout/HeaderComponent';
import {Button, Divider, Image} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {
  COMMENT_TYPE,
  FIRESTORE_COLLECTIONS,
  SPINNER_COLOR,
  SPINNER_SIZE_LG,
  SPINNER_SIZE_SM,
  SPINNER_STYLE_CENTERED,
} from '../../shared/Constants';
import {ROUTES} from '../../shared/Routes';
import {FormattedCurrency} from 'react-native-globalize';
import {SendFeedback} from '../Feedback/SendFeedback';

export default class TrainingDetails extends React.Component {
  state = {
    item: {},
    loading: true,
    ref: {},
    message: '',
    rating: 5,
    messageCharCount: 0,
    submitBtn: false,
  };

  componentDidMount() {
    this.state.ref = firestore()
      .collection(FIRESTORE_COLLECTIONS.TRAINING_WORKSHOPS)
      .doc(this.props.route.params.id);
    this.getItems();
  }

  getItems = () => {
    this.state.ref
      .get()
      .then(querySnapshot => {
        this.setState({
          item: {
            id: querySnapshot.id,
            ...querySnapshot.data(),
          },
        });
        this.setState({loading: false});
      })
      .catch(() => {
        this.setState({loading: false});
      });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderComponent navigation={this.props.navigation} />
        {!this.state.loading && this.state.item.id && (
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
              <Text style={styles.containerTitle}>
                {this.props.route.params.trainingType}
              </Text>
              <Text style={styles.title}>{this.state.item.name}:</Text>
              <Text style={styles.subDetails}>
                {this.state.item.subDetails}
              </Text>
              <View style={styles.middleContainer}>
                <Image
                  source={{
                    uri: this.state.item.image,
                  }}
                  style={styles.image}
                  PlaceholderContent={
                    <ActivityIndicator
                      color={SPINNER_COLOR}
                      size={SPINNER_SIZE_SM}
                    />
                  }
                />
                <View style={styles.descriptionContainer}>
                  <Text style={styles.labelTitle}>Description:</Text>
                  <Text style={styles.description}>
                    {this.state.item.description}
                  </Text>
                  <Text style={styles.priceText}>
                    <FormattedCurrency
                      currencyCode={'USD'}
                      maximumFractionDigits={2}
                      value={Number(this.state.item.price)}
                    />
                  </Text>
                  <Text style={styles.labelTitle}>Qualification:</Text>
                  <Text style={styles.description}>
                    {this.state.item.qualification}
                  </Text>
                </View>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.commentContainer}>
                <Text style={styles.commentTitle}>Comments:</Text>
                <TextInput
                  multiline
                  maxLength={120}
                  style={styles.commentTextArea}
                  placeholder="Type  your  Comments..."
                  placeholderTextColor="white"
                  onChangeText={message => {
                    this.setState({messageCharCount: message.length, message});
                  }}
                  value={this.state.message}
                />
                <Text style={styles.commentCharCount}>
                  {this.state.messageCharCount}/120
                </Text>
                <View style={styles.submitContainer}>
                  <Button
                    title="SUBMIT"
                    disabled={this.state.submitBtn}
                    loading={this.state.submitBtn}
                    loadingProps={
                      <ActivityIndicator
                        color={SPINNER_COLOR}
                        size={SPINNER_SIZE_SM}
                      />
                    }
                    onPress={() => {
                      this.setState({submitBtn: true});
                      SendFeedback(
                        this.state.message,
                        this.state.rating,
                        COMMENT_TYPE.TRAINING,
                        this.state.item,
                        this.props.navigation,
                      )
                        .then(() => this.setState({submitBtn: false}))
                        .catch(() => this.setState({submitBtn: false}));
                    }}
                    buttonStyle={styles.submitBtn}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        )}
        {this.state.loading && (
          <View style={styles.container}>
            <ActivityIndicator
              style={SPINNER_STYLE_CENTERED}
              size={SPINNER_SIZE_LG}
              color={SPINNER_COLOR}
            />
          </View>
        )}
        {!this.state.loading && !this.state.item.id && (
          <View style={styles.noItemContainer}>
            <Text style={styles.itemName}>No item found.</Text>
            <Button
              title="Continue shopping"
              onPress={() => {
                this.props.navigation.navigate(ROUTES.HOME);
              }}
              buttonStyle={styles.lowerBtn}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#96989C',
  },
  container: {
    flex: 1,
    backgroundColor: '#96989C',
  },
  containerTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '700',
    marginLeft: 16,
    marginTop: 16,
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginLeft: 16,
    marginTop: 16,
  },
  labelTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 4,
    marginTop: 4,
  },
  middleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  descriptionContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  subDetails: {
    color: 'white',
    fontSize: 16,
    marginLeft: 30,
    marginTop: 16,
  },
  noItemContainer: {
    flex: 1,
    backgroundColor: '#96989C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Arial',
    marginTop: 8,
  },
  lowerBtn: {
    marginTop: 16,
    backgroundColor: '#47525E',
  },
  image: {
    justifyContent: 'center',
    height: 180,
    width: 180,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  priceText: {textAlign: 'right', color: 'white', fontSize: 20, marginLeft: 16},
  divider: {backgroundColor: '#7E55F3', height: 1.5, marginTop: 16},
  commentContainer: {padding: 16},
  commentTitle: {
    color: 'white',
    fontSize: 24,
    textDecorationLine: 'underline',
  },
  commentTextArea: {
    color: 'white',
    borderWidth: 0,
    borderColor: 'white',
    borderBottomWidth: 2,
  },
  commentCharCount: {
    fontSize: 12,
    color: 'white',
    textAlign: 'right',
    marginTop: 4,
  },
  submitContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  submitBtn: {backgroundColor: '#47525E', marginTop: 8},
});
