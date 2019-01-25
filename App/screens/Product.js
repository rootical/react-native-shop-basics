import React from "react";
import { Text, View, Button } from "react-native";
import { connect } from "react-redux";
import styles from "../theme/ApplicationStyles";

import { fetchProduct } from '../redux/product';

class Product extends React.Component {

  componentDidMount() {
    //   TODO: better way to get an id?
    this.props.dispatch(fetchProduct(this.props.navigation.state.params.sku));
  }
  render() {
    const { error, loading, product } = this.props;
    return (

      <View style={styles.container}>

        {error ? <Text>Error! {error.message}</Text> : null}
        {
        loading ? <Text>Loading!</Text> :
        <Text style={styles.h1}>{product.name}</Text>
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  product: state.products.product,
  loading: state.products.loading,
  error: state.products.error
});

export default connect(
  mapStateToProps,
  null
)(Product);
