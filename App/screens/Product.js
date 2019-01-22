import React from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import styles from '../theme/ApplicationStyles';

import { logout } from '../redux/auth';

class Product extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Product 1</Text>

        <Button
          buttonStyle={styles.button}
          title="Logout"
          onPress={() => this.props.logout(this.props.navigation)}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: (navigation) => dispatch(logout(navigation))
});

export default connect(null, mapDispatchToProps)(Product);
