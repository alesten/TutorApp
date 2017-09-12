import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import ls from 'react-native-local-storage';

export default class Home extends Component {
    static navigationOptions = {
        title: "Home"
    };

    constructor(props) {
        super(props);

        this.state = { queLen: 4, help: 3, demo: 1, isHelping: false };

        this.queueLengths = this.queueLengths.bind(this);
        this.buttons = this.buttons.bind(this);
        this.getNextInQueue = this.getNextInQueue.bind(this);
        this.getCurrentInQueue = this.getCurrentInQueue.bind(this);
        this.loadFromLs = this.loadFromLs.bind(this);
    }

    componentDidMount() {
        this.loadFromLs();
    }

    loadFromLs()  {
        ls.get('student')
            .then((data) => {
                console.log("Helping:", data);
                this.setState({ isHelping: data != null });
            });
    }

    render() {
        return (
            <View style={styles.container} >
                {this.queueLengths()}
                {this.buttons()}
            </View>
        );
    }

    queueLengths() {
        const { queLen, help, demo } = this.state;

        if (queLen <= 0) {
            return (
                <Text style={styles.header}>Queue is empty</Text>
            );
        }
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.header} >Queue: {queLen}</Text>
                <Text style={styles.subHeader}>Help: {help}</Text>
                <Text style={styles.subHeader}>Demo: {demo}</Text>
            </View>
        );
    }

    buttons() {
        const { isHelping } = this.state;

        if (isHelping) {
            return (
                <View style={{ marginTop: 10 }}>
                    <Text>You are already helping a student</Text>
                    <Button title="Go to student" onPress={this.getCurrentInQueue} />
                </View>
            );
        }

        return (
            <Button title="Help next student" onPress={this.getNextInQueue} />
        );
    }

    getNextInQueue() {
        let student = { id: 1, name: 'Peter' }
        ls.save('student', student)
            .then(() => {
                this.setState({ isHelping: true });
                this.props.navigation.navigate('Student', { student, goBackAction: this.loadFromLs });
            });
    }

    getCurrentInQueue() {
        ls.get('student')
            .then((data) => {
                if (data == null) {
                    this.setState({ isHelping: false });
                    return;
                }
                this.props.navigation.navigate('Student', { student: data, goBackAction: this.loadFromLs });
            });
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 24,
        fontStyle: 'italic',
    }
});
