import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import styles from "../theme/ApplicationStyles";
import OfflineModal from '../components/Offline';

class Product extends React.Component {

  render() {
    const { error, loading, item } = this.props;
    return (

      <View style={styles.container}>
        <OfflineModal/>
        {error ? <Text>Error! {error.message}</Text> : null}
        {
        loading ? <Text>Loading!</Text> :
        <Text style={styles.h1}>{item.name}</Text>
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  item: state.product.item,
  loading: state.products.loading,
  error: state.products.error
});

export default connect(
  mapStateToProps,
  null
)(Product);
