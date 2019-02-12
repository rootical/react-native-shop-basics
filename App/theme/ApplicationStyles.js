import Fonts from './Fonts';
import Colors from './Colors';
import { StyleSheet } from 'react-native';

const defaults = {
  borderRadius: 2,
  borderWidth: 1
};

export default StyleSheet.create({
  ...Fonts.style,
  container: {
    backgroundColor: Colors.background,
    paddingHorizontal: 5,
    paddingVertical: 50,
    flex: 1,
    alignItems: 'stretch'
  },
  textLabel: {
    fontSize: 20,
    marginTop: 10,
    padding: 10
  },
  textInput: {
    height: 40,
    // flex: 1,
    margin: 10,
    color: Colors.text,
    fontSize: 15,
    borderWidth: defaults.borderWidth,
    borderRadius: defaults.borderRadius,
    padding: 5
  },
  button: {
    backgroundColor: 'gray',
    width: 150,
    height: 40,
    borderRadius: defaults.borderRadius,
    borderWidth: defaults.borderWidth,
    alignSelf: 'center'
  },
  error: {
    fontSize: 15,
    color: 'blue',
    marginVertical: 0,
    paddingLeft: 10,
    fontWeight: 'bold'
  }
});
