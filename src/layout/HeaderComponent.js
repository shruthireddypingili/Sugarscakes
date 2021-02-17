import React from 'react';
import {Header} from 'react-native-elements';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {MenuItem, OverflowMenu} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import {ROUTES} from '../shared/Routes';

export function HeaderComponent({navigation}) {
  const [visible, setVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const onItemSelect = index => {
    setSelectedIndex(index);
    setVisible(false);
  };

  const renderToggleButton = () => (
    <TouchableOpacity activeOpacity={0.7} onPress={() => setVisible(true)}>
      <Image
        style={styles.user}
        source={require('../../assets/images/user-icon.png')}
      />
    </TouchableOpacity>
  );

  return (
    <Header
      leftComponent={
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.toggleDrawer()}>
          <Image
            style={styles.menu}
            source={require('../../assets/images/menu-bar.png')}
          />
        </TouchableOpacity>
      }
      centerComponent={
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo.png')}
        />
      }
      rightComponent={
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate(ROUTES.CART)}>
            <Image
              style={styles.cart}
              source={require('../../assets/images/cart-icon.png')}
            />
          </TouchableOpacity>
          <OverflowMenu
            anchor={renderToggleButton}
            backdropStyle={styles.backdrop}
            visible={visible}
            selectedIndex={selectedIndex}
            onSelect={onItemSelect}
            onBackdropPress={() => setVisible(false)}>
            <MenuItem
              title="My Account"
              onPress={() => {
                setVisible(false);
                navigation.navigate(ROUTES.EDIT_PROFILE);
              }}
            />
            <MenuItem
              title="Profile"
              onPress={() => {
                setVisible(false);
                navigation.navigate(ROUTES.VIEW_PROFILE);
              }}
            />
            <MenuItem
              title="Pending Orders"
              onPress={() => {
                setVisible(false);
                navigation.navigate(ROUTES.PENDING_ORDER_LIST);
              }}
            />
            <MenuItem
              title="Logout"
              onPress={() => {
                setVisible(false);
                auth().signOut();
              }}
            />
          </OverflowMenu>
        </View>
      }
      containerStyle={styles.header}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'grey',
    justifyContent: 'space-between',
    height: 100,
  },
  menu: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    paddingLeft: 16,
    marginTop: 0,
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
    marginTop: 0,
    marginBottom: 30,
  },
  cart: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 8,
    marginTop: 0,
    marginBottom: 10,
  },
  user: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginTop: 0,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: 100,
  },
});
