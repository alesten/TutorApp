import React, { Component } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import ls from 'react-native-local-storage';

export default class Student extends Component {
    static navigationOptions = {
        title: "Student"
    }

    constructor(props) {
        super(props);

        this.skipStudent = this.skipStudent.bind(this);
    }

    render() {
        let { student } = this.props.navigation.state.params;
        console.log("Student:", student);

        return (
            <View style={styles.container}>
                <Text>Currently helping: {student.name}</Text>
                <Button title="Skip this student" onPress={this.skipStudent} />
            </View>
        );
    }

    skipStudent() {
        ls.save('student', null)
            .then(() => {
                this.props.navigation.state.params.goBackAction();
                this.props.navigation.dispatch(NavigationActions.back());
            })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    }
});
