import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { FontAwesome } from 'react-native-vector-icons';
import Login from './screens/Login';
import Main from './screens/Main';
import Product from './screens/Product';
import NotificationScreen from './screens/Notifications';


export const SignedOut = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    }
  }
});

export const SignedIn = createDrawerNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'Products'
        //  use in case of createBottomTabNavigator
        // tabBarLabel: 'Products',
        // tabBarIcon: ({ tintColor }) =>
        //   <FontAwesome name="home" size={30} color={tintColor} />
      }
    },
    Product: {
      screen: Product,
      navigationOptions: {
        //  use in case of createBottomTabNavigator
        // tabBarIcon: ({ tintColor }) =>
        //   <FontAwesome name="home" size={30} color={tintColor} />
      }
    },
    Notifications: {
      screen: NotificationScreen
    },
  },
  {
    // use in case of createBottomTabNavigator
    // tabBarOptions: {
    //   activeTintColor: 'red',
    //   inactiveTintColor: 'gray',
    //   labelStyle: {
    //     fontSize: 13
    //   }
    // },
    // tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createStackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    }
  );
};
