import React, {useContext} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import {LocalizationContext} from '../../shared/Translations';
import {HeaderComponent} from '../../layout/HeaderComponent';

export const Settings = ({navigation}) => {
  const {
    translations,
    appLanguage,
    setAppLanguage,
    initializeAppLanguage,
  } = useContext(LocalizationContext);
  initializeAppLanguage();

  return (
    <View style={{flex: 1}}>
      <HeaderComponent navigation={navigation} />
      <ImageBackground
        source={require('../../../assets/images/bg-3-cupcakes.jpeg')}
        style={{flex: 1}}>
        <View style={styles.container}>
          <Text h4 h4Style={styles.title}>
            {translations['settings.title']}
          </Text>
          <Text style={styles.subTitle}>
            {translations['settings.change_language']}
          </Text>
          {translations.getAvailableLanguages().map((currentLang, i) => (
            <ListItem
              key={i}
              title={currentLang}
              bottomDivider
              checkmark={appLanguage === currentLang}
              onPress={() => {
                setAppLanguage(currentLang);
              }}
            />
          ))}
        </View>
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
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 20,
    color: 'white',
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 8,
  },
});
