import React from 'react';
import { Text, View, Button, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import styles from '../theme/ApplicationStyles';

import { List, ListItem } from "react-native-elements";

import { logout } from '../redux/auth';
import { openProduct, fetchProducts } from '../redux/products';

class Main extends React.Component {

  componentDidMount() {
    // TODO: best way to do that before or during the render by redux?
    this.props.dispatch(fetchProducts());
  }

  render() {
    const { error, loading, products } = this.props;
    return (
      <View style={styles.container}>

        <Text style={styles.h1}>Products</Text>

        {error ? <Text>Error! {error.message}</Text> : null}

        {
          loading ? <Text>Loading!</Text> :
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={products}
              renderItem={({ item }) => (
                <ListItem onPress={() => this.props.openProduct(item.id, this.props.navigation)}
                  title={item.name}
                  subtitle={item.id}
                  key={item.key}
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

}

const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error
});

const mapDispatchToProps = (dispatch) => ({
  logout: (navigation) => dispatch(logout(navigation)),
  openProduct: (id, navigation) => dispatch(openProduct(id, navigation)),
  // TODO: why??
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
