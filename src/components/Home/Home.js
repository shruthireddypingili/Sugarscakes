import React, {useContext} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {HeaderComponent} from '../../layout/HeaderComponent';
import {Cakes} from './Cakes';
import {FooterComponent} from '../../layout/FooterComponent';
import {LocalizationContext} from '../../shared/Translations';

export const Home = ({navigation}) => {
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  initializeAppLanguage();

  return (
    <View style={{flex: 1}}>
      <HeaderComponent navigation={navigation} />
      <ImageBackground
        source={require('../../../assets/images/bg-3-cupcakes.jpeg')}
        style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>
            {translations['Text.bestSellingCakeTitle']}
          </Text>
          <Cakes navigation={navigation} />
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
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Arial',
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 0,
  },
});
