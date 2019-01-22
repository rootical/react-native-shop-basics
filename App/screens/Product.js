import React from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import styles from '../theme/ApplicationStyles';

import { logout } from '../redux/auth';

class Product extends React.Component {

  render() {
    return (

      <View style={styles.container}>
        <Text style={styles.h1}>Product 1</Text>
      </View>

    );
  }
}

const mapStateToProps = state => ({
    product: state.products.product,
    loading: state.products.loading,
    error: state.products.error
});

// const mapDispatchToProps = (dispatch) => ({
//   logout: (navigation) => dispatch(logout(navigation))
// });

export default connect(mapStateToProps, null)(Product);
