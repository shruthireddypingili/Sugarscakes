import React from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {HeaderComponent} from '../../layout/HeaderComponent';
import {Button} from 'react-native-elements';
import {AirbnbRating} from 'react-native-ratings';
import {SendFeedback} from './SendFeedback';
import {
  COMMENT_TYPE,
  SPINNER_COLOR,
  SPINNER_SIZE_SM,
} from '../../shared/Constants';

export default class Feedback extends React.Component {
  state = {message: '', rating: 0, messageCharCount: 0, submitBtn: false};

  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderComponent navigation={this.props.navigation} />
        <ImageBackground
          source={require('../../../assets/images/bg-3-cupcakes.jpeg')}
          style={{flex: 1}}>
          <ScrollView style={styles.container}>
            <Text style={styles.title}>We Value Your Feedback!!!</Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Comments:</Text>
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
              <Text style={styles.descriptionTitle}>Rating:</Text>
              <View style={styles.rating}>
                <AirbnbRating
                  defaultRating={0}
                  showRating={false}
                  selectedColor="white"
                  onFinishRating={rating => {
                    this.setState({rating});
                  }}
                />
              </View>
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
                    COMMENT_TYPE.FEEDBACK,
                    null,
                    this.props.navigation,
                  )
                    .then(() => this.setState({submitBtn: false}))
                    .catch(() => this.setState({submitBtn: false}));
                }}
                buttonStyle={styles.lowerBtn}
              />
            </View>
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
    textAlign: 'center',
    fontFamily: 'Arial',
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 16,
  },
  descriptionContainer: {padding: 16},
  descriptionTitle: {
    color: 'white',
    fontSize: 24,
    marginTop: 16,
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
  rating: {marginTop: 20, marginBottom: 20},
  lowerBtn: {
    marginTop: 24,
    backgroundColor: '#47525E',
  },
});
