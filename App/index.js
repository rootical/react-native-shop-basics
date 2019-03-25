import React from 'react';
import { Provider } from 'react-redux';
import { createRootNavigator } from './router';
import { isSignedIn } from './auth';
import store from './store';
import { Font, Asset, AppLoading, SplashScreen } from 'expo';
import { Image, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      isSplashReady: false,
      isAppReady: false,
    };
  }

  async componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res }))
      .catch(error => console.error(error));
  }

  render() {
    const { signedIn, isSplashReady, isAppReady } = this.state;

    if (!isSplashReady) {
      return (
        <AppLoading
          startAsync={this._cacheSplashResourcesAsync}
          onFinish={() => this.setState({ isSplashReady: true })}
          onError={console.warn}
          autoHideSplash={true}
        />
      );
    }

    if (!isAppReady) {
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={require('./assets/splash.png')}
            onLoad={this._cacheResourcesAsync}
          />
        </View>
      );
    }

    const Layout = createRootNavigator(signedIn);

    return (
      <Provider store={store}>

        <Layout />
      </Provider>
    );

  }


  _cacheSplashResourcesAsync = async () => {
    const image = require('./assets/splash.png');
    return Asset.fromModule(image).downloadAsync();
  };

  _cacheResourcesAsync = async () => {
    SplashScreen.hide();

    await Font.loadAsync({
      'vincHand': require('./assets/vinchand.ttf'),
    });

    this.setState({ isAppReady: true });
  };
}
