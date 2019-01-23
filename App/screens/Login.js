import React from 'react';
import { Text, TextInput, KeyboardAvoidingView, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';
import styles from '../theme/ApplicationStyles';

// this is to not remember password, skip it :)
import {email, password} from '../configs/sensitive';
import { login } from '../redux/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: email,
      password: password,
      error: '' || (this.props.navigation.state.params && this.props.navigation.state.params.error)
    };
  }

  handleChangeEmail = (value) => {
    this.setState({email: value});
  }

  handleChangePassword = (value) => {
    this.setState({password: value});
  }

  handleSubmit = () => {
    const email = this.state.email;
    const password = this.state.password;
    this.props.login({
      email,
      password
    }, this.props.navigation);
    // clear the state after login for security
    this.setState({
      email: '',
      password: '',
      error: ''
    });
  }

  render() {
   return (
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <ScrollView>
        <Text style={styles.h1}>Friday's Shop</Text>
        <Text style={styles.error}>{this.state.error}</Text>
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
}

const mapDispatchToProps = (dispatch) => ({
  login: (credentials, navigation) => dispatch(login(credentials, navigation))
});

export default connect(null, mapDispatchToProps)(Login);
