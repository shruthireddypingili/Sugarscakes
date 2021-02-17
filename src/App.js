import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import SplashPage from './SplashPage';
import SignUp from './account/SignUp';
import Login from './account/Login';
import MainLayout from './layout/MainLayout';
import ForgotPassword from './account/ForgotPassword';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {GlobalizeProvider, loadCldr} from 'react-native-globalize';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {LocalizationProvider} from './shared/Translations';

loadCldr(
  require('react-native-globalize/locale-data/en'),
  require('react-native-globalize/locale-data/es'),
);

const RootStack = createSwitchNavigator(
  {
    SplashPage: SplashPage,
    SignUp: SignUp,
    Login: Login,
    ForgotPassword: ForgotPassword,
    Main: MainLayout,
  },
  {
    initialRouteName: 'SplashPage',
  },
);

const App = createAppContainer(RootStack);

export default () => (
  <LocalizationProvider>
    <GlobalizeProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <App />
      </ApplicationProvider>
    </GlobalizeProvider>
  </LocalizationProvider>
);
