import React, { PureComponent } from 'react';
import { Text, NetInfo, Button } from 'react-native';
import styles from '../theme/ApplicationStyles';
import Modal from 'react-native-modal';

export default class OfflineModal extends PureComponent {
  state = {
    isVisible: false
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isVisible => {
    this.setState({ isVisible: !isVisible });
  };

  render() {
      return(
        <Modal
          style={styles.container}
          isVisible={this.state.isVisible}
          animationInTiming={2000}
          animationOutTiming={2000}
          backdropTransitionInTiming={2000}
          backdropTransitionOutTiming={2000}
        >
          <Text style={styles.text}>No Internet Connection</Text>

          <Button
            buttonStyle={styles.button}
            title="No problem"
            onPress={() => this.setState({isVisible: false})}
          />
        </Modal>);
  }
}
