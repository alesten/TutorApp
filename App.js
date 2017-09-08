import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/Navigation';
import Login from './src/components/Login';
import ls from 'react-native-local-storage';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showLogin: null };

    ls.get('tutorId')
      .then((data) => {
        this.setState({ showLogin: data == null });
      });

    this.didLogin = this.didLogin.bind(this);
  }

  didLogin() {
    this.setState({ showLogin: false });
  }

  render() {
    if (this.state.showLogin == null) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 30 }}>Loading...</Text>
        </View>
      );
    }

    if (this.state.showLogin) {
      return <Login didLogin={this.didLogin} />
    } else {
      return <Navigation />
    }
  }
}
