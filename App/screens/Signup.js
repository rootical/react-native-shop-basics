import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';
import styles from '../theme/ApplicationStyles';
import { signup } from '../redux/auth';

class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password1: '',
      password2: '',
      error: ''
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword1 = this.handleChangePassword1.bind(this);
    this.handleChangePassword2 = this.handleChangePassword2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(value) {
    this.setState({email: value});
  }

  handleChangePassword1(value) {
    this.setState({password1: value});
  }

  handleChangePassword2(value) {
    this.setState({password2: value});
  }

  handleSubmit() {
    if (this.state.email && this.state.password1 && this.state.password1 === this.state.password2) {
      const email = this.state.email;
      const password = this.state.password1;
      this.props.signup({
        email,
        password
      }, this.props.navigation);
      // clear the state after signup for security
      this.setState({
        email: '',
        password1: '',
        password2: '',
        error: ''
      });
    } else {
      this.setState({
        password1: '',
        password2: '',
        error: 'Email and password cannot be empty.  Passwords must also match.'
      });
    }
  }

  render() {
   return (
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <ScrollView>
        <Text style={styles.error}>{this.state.error}</Text>
        <Text style={styles.textLabel}>Enter a Email</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={15}
          value={this.state.email}
          onChangeText={(email) => this.handleChangeEmail(email)}
        />
        <Text style={styles.textLabel}>Enter a Password</Text>
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={15}
          value={this.state.password1}
          onChangeText={(password1) => this.handleChangePassword1(password1)}
        />
        <Text style={styles.textLabel}>Confirm Password</Text>
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={15}
          value={this.state.password2}
          onChangeText={(password2) => this.handleChangePassword2(password2)}
        />
        <Button
          buttonStyle={styles.button}
          title="Sign Up"
          onPress={this.handleSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
 }
}

const mapDispatchToProps = (dispatch) => ({
  signup: (credentials, navigation) => dispatch(signup(credentials, navigation))
});

export default connect(null, mapDispatchToProps)(Signup);
