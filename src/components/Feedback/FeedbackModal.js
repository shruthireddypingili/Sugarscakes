import {Button, Overlay} from 'react-native-elements';
import React, {useContext} from 'react';
import {Text, StyleSheet, View, ImageBackground} from 'react-native';
import {HeaderComponent} from '../../layout/HeaderComponent';
import {LocalizationContext} from '../../shared/Translations';

export function FeedbackModal({navigation}) {
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  initializeAppLanguage();

  return (
    <View style={{flex: 1}}>
      <HeaderComponent navigation={navigation} />
      <ImageBackground
        source={require('../../../assets/images/bg-3-cupcakes.jpeg')}
        style={{flex: 1}}>
        <View style={styles.container}>
          <Overlay overlayStyle={styles.overlayStyle} isVisible={true}>
            <Text style={styles.thankYouText}>
              {translations['Feedback.ThankYou']}
            </Text>
            <Button
              title={translations['Feedback.GoBack']}
              onPress={() => {
                navigation.goBack();
              }}
              buttonStyle={styles.homeBtn}
            />
          </Overlay>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
