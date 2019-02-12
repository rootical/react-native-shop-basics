import React from 'react';
import { Button } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';

export default class NotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <FontAwesome name="bell" size={16} color={tintColor}/>
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.openDrawer()}
        title="OpenDrawer"
      />
    );
  }
}
