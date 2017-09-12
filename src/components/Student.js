import React, { Component } from 'react';
import { Text } from 'react-native';

export default class Student extends Component {
    static navigationOptions = {
        title: "Student"
    }

    render() {
        console.log("Student:", this.props.navigation.state.params.student);

        return (
            <Text>Hallo</Text>
        );
    }
}
