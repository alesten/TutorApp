import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Home extends Component {
    static navigationOptions = {
        title: "Home"
    };

    render() {
        return (
            <View>
                <Text>Kø</Text>
            </View>
        );
    }
}
