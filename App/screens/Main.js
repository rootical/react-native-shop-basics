import React from 'react';
import { Text, View, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import styles from '../theme/ApplicationStyles';
import OfflineModal from '../components/Offline';
import { List, ListItem } from "react-native-elements";

import { fetchProducts } from '../redux/products';
import { fetchProductSuccess, FETCH_PRODUCT_SUCCESS } from '../redux/product';
class Main extends React.Component {

  componentDidMount() {
    // TODO: best way to do that before or during the render by redux?
    this.props.dispatch(fetchProducts());
  }

  render() {
    const { error, loading, items } = this.props;
    return (
      <View style={styles.container}>

        <OfflineModal/>

        <Text style={styles.h1}>Products</Text>

        {error ? <Text>Error! {error.message}</Text> : null}

        {
          loading ? <Text>Loading!</Text> :
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={items}
              renderItem={({ item }) => (
                <ListItem
                  onPress={() => this.navigateToProduct(item)}
                  title={item.name}
                  subtitle={item.id}
                  key={item.id}
                  containerStyle={{ borderBottomWidth: 1 }}
                />
              )}
            />
          </List>
        }

        <Button
          buttonStyle={styles.button}
          title="Logout"
          onPress={() => this.props.logout(this.props.navigation)}
        />
      </View>
    );
  }

  navigateToProduct(product) {
    this.props.navigation.navigate({
        routeName: 'Product',
        key: product.sku
    });
    this.props.dispatch(fetchProductSuccess(product));
  }

}

const mapStateToProps = state => ({
  items: state.products.items,
  loading: state.products.loading,
  error: state.products.error
});

export default connect(mapStateToProps)(Main);
