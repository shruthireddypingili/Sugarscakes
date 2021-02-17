import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from '../components/Home/Home';
import {ROUTES} from '../shared/Routes';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ItemDetails from '../components/ItemDetails/ItemDetails';
import Cart from '../components/Cart/Cart';
import Orders from '../components/Order/Orders';
import Products from '../components/Products/Products';
import ItemsComponent from '../components/Items/ItemsComponent';
import {DecorGallery} from '../components/DecorGallery/DecorGallery';
import Training from '../components/Training/Training';
import TrainingDetails from '../components/Training/TrainingDetails';
import {AboutUs} from '../components/AboutUs/AboutUs';
import Feedback from '../components/Feedback/Feedback';
import {FeedbackModal} from '../components/Feedback/FeedbackModal';
import EditProfile from '../components/Profile/EditProfile';
import ViewProfile from '../components/Profile/ViewProfile';
import Admin from '../components/Admin/Admin';
import ItemListComponent from '../components/Admin/Item/ItemListComponent';
import ItemAddComponent from '../components/Admin/Item/ItemAddComponent';
import CategoryAddComponent from '../components/Admin/Item/CategoryAddComponent';
import OrderListComponent from '../components/Admin/Order/OrderListComponent';
import OrderDetails from '../components/Admin/Order/OrderDetails';
import firestore from '@react-native-firebase/firestore';
import {FIRESTORE_COLLECTIONS} from '../shared/Constants';
import auth from '@react-native-firebase/auth';
import PendingOrderListComponent from '../components/Order/PendingOrders/PendingOrderListComponent';
import PendingOrderDetails from '../components/Order/PendingOrders/PendingOrderDetails';
import {Settings} from '../components/Profile/Settings';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ROUTES.HOME} component={Home} />
      {ItemRoutes()}
      {ProfileRoutes()}
    </Stack.Navigator>
  );
}

function AdminStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ROUTES.ADMIN} component={Admin} />
      <Stack.Screen
        name={ROUTES.ITEM_LIST_COMPONENT}
        component={ItemListComponent}
      />
      <Stack.Screen
        name={ROUTES.ITEM_ADD_COMPONENT}
        component={ItemAddComponent}
      />
      <Stack.Screen
        name={ROUTES.CATEGORY_ADD_COMPONENT}
        component={CategoryAddComponent}
      />
      <Stack.Screen
        name={ROUTES.ORDER_LIST_COMPONENT}
        component={OrderListComponent}
      />
      <Stack.Screen name={ROUTES.ORDER_DETAILS} component={OrderDetails} />
      {ProfileRoutes()}
    </Stack.Navigator>
  );
}

function ProductStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ROUTES.PRODUCT} component={Products} />
      {ItemRoutes()}
      {ProfileRoutes()}
    </Stack.Navigator>
  );
}

function DecorGalleryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ROUTES.DECOR_GALLERY} component={DecorGallery} />
      {ItemRoutes()}
      {ProfileRoutes()}
    </Stack.Navigator>
  );
}

function TrainingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ROUTES.TRAINING_WORKSHOPS} component={Training} />
      <Stack.Screen
        name={ROUTES.TRAINING_WORKSHOPS_DETAILS}
        component={TrainingDetails}
      />
      {ItemRoutes()}
      {ProfileRoutes()}
    </Stack.Navigator>
  );
}

function FeedbackStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ROUTES.FEEDBACK} component={Feedback} />
      {FeedbackModalRoute()}
      {ProfileRoutes()}
    </Stack.Navigator>
  );
}

function ItemRoutes() {
  return (
    <>
      <Stack.Screen name={ROUTES.ITEMS_COMPONENT} component={ItemsComponent} />
      <Stack.Screen name={ROUTES.ITEM_DETAILS} component={ItemDetails} />
      <Stack.Screen name={ROUTES.CART} component={Cart} />
      <Stack.Screen name={ROUTES.ORDER} component={Orders} />
      {FeedbackModalRoute()}
    </>
  );
}

function ProfileRoutes() {
  return (
    <>
      <Stack.Screen name={ROUTES.EDIT_PROFILE} component={EditProfile} />
      <Stack.Screen name={ROUTES.VIEW_PROFILE} component={ViewProfile} />
      <Stack.Screen
        name={ROUTES.PENDING_ORDER_LIST}
        component={PendingOrderListComponent}
      />
      <Stack.Screen
        name={ROUTES.PENDING_ORDER_DETAILS}
        component={PendingOrderDetails}
      />
    </>
  );
}

function FeedbackModalRoute() {
  return (
    <Stack.Screen name={ROUTES.FEEDBACK_MODAL} component={FeedbackModal} />
  );
}

export default class MainLayout extends React.Component {
  state = {isAdmin: false};

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    firestore()
      .collection(FIRESTORE_COLLECTIONS.USERS)
      .doc(auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.data()) {
          this.setState({
            isAdmin: querySnapshot.data().isAdmin,
          });
        }
      })
      .catch();
  };

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={ROUTES.HOME}
          drawerType="slide"
          drawerContentOptions={{
            activeTintColor: 'white',
            inactiveTintColor: 'white',
          }}
          drawerStyle={styles.container}>
          <Drawer.Screen name={ROUTES.HOME} component={HomeStack} />
          {this.state.isAdmin && (
            <Drawer.Screen name={ROUTES.ADMIN} component={AdminStack} />
          )}
          <Drawer.Screen name={ROUTES.PRODUCT} component={ProductStack} />
          <Drawer.Screen
            name={ROUTES.TRAINING_WORKSHOPS}
            component={TrainingStack}
          />
          <Drawer.Screen
            name={ROUTES.DECOR_GALLERY}
            component={DecorGalleryStack}
          />
          <Drawer.Screen name={ROUTES.FEEDBACK} component={FeedbackStack} />
          <Drawer.Screen name={ROUTES.SETTING} component={Settings} />
          <Drawer.Screen name={ROUTES.ABOUT_US} component={AboutUs} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#1E2D3E', color: 'white'},
});
