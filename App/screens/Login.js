import React from 'react';
import {Text, TextInput, KeyboardAvoidingView, ScrollView, Button, View} from 'react-native';
import { connect } from 'react-redux';
import styles from '../theme/ApplicationStyles';
import OfflineModal from '../components/Offline';
import {email, password} from '../configs/sensitive';
import { login } from '../redux/auth';
import * as Animatable from 'react-native-animatable';
import { DangerZone } from 'expo';
let { Lottie } = DangerZone;
import emptyBox from '../assets/empty-box.json';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: email || '',
      password: password || '',
      error: '',
      animation: emptyBox
    };
  }

  componentDidMount() {
    this._playAnimation();
  }

  handleChangeEmail = (value) => {
    this.setState({email: value});
  };

  handleChangePassword = (value) => {
    this.setState({password: value});
  };

  handleSubmit = () => {
    const {email, password} = this.state;
    this.props.dispatch(login({
      email,
      password
    }, this.props.navigation));
  };

  render() {
    const { error, loading } = this.props;
    return (
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        <ScrollView>
          <OfflineModal/>

          {this.state.animation &&
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 100,
              height: 100
            }}
            source={this.state.animation}
            loop={false}
          />}

          <Text style={styles.h1}>Friday's Shop</Text>
          { error ?
            <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.error}>❤ {error.message}️</Animatable.Text>
            : null }

          { loading ? <Text style={styles.h1}>Loading!</Text> : null }

          <Text style={styles.textLabel}>Email</Text>

          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={15}
            placeholder="EMAIL"
            placeholderTextColor="tomato"
            value={this.state.email}
            onChangeText={(email) => this.handleChangeEmail(email)}
          />

          <Text style={styles.textLabel}>Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={15}
            placeholder="PASSWORD"
            placeholderTextColor="tomato"
            value={this.state.password}
            onChangeText={(password) => this.handleChangePassword(password)}
          />
          <Button
            buttonStyle={styles.button}
            title="Login"
            onPress={this.handleSubmit}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  _playAnimation = () => {
      this.animation.reset();
      this.animation.play();
  }

}

const mapStateToProps = state => ({
  loading: state.user.loading,
  error: state.user.error
});

export default connect(mapStateToProps)(Login);
