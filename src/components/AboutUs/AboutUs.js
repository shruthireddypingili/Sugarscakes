import React, {useContext} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {HeaderComponent} from '../../layout/HeaderComponent';
import {FooterComponent} from '../../layout/FooterComponent';
import {LocalizationContext} from '../../shared/Translations';

export const AboutUs = ({navigation}) => {
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  initializeAppLanguage();

  return (
    <View style={{flex: 1}}>
      <HeaderComponent navigation={navigation} />
      <ImageBackground
        source={require('../../../assets/images/bg-3-cupcakes.jpeg')}
        style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>{translations['Text.AboutUs']}</Text>
          <Text style={styles.textContent}>
            {translations['AboutUs.firstPara']}
          </Text>
          <Text style={styles.textContent}>
            {translations['AboutUs.secondPara']}
          </Text>
          <Text style={styles.textContent}>
            {translations['AboutUs.thirdPara']}
          </Text>
          <Text style={styles.textContent}>
            {translations['AboutUs.fourPara']}
          </Text>
          <FooterComponent />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

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
    textDecorationLine: 'underline',
  },
  textContent: {
    color: 'white',
    fontSize: 20,
    lineHeight: 24,
    marginTop: 20,
    marginBottom: 16,
    marginLeft: 30,
    marginRight: 24,
  },
});
