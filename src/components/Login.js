import React from 'react';
import {
    StyleSheet, Text, View,
    TextInput, StatusBar, Button
} from 'react-native';
import ls from 'react-native-local-storage';

export default class Login extends React.Component {
    static navigationOptions = {
        title: "Log Ind"
    }

    constructor() {
        super();

        this.state = { name: "", password: "" };

        this.onLogin = this.onLogin.bind(this);
    }

    async onLogin() {
        let { name, password } = this.state;

        if (name === "Alexander" && password === "1234") {
            ls.save('tutorId', 1)
                .then(() => {
                    this.props.didLogin();
                });
        } else {
            this.setState({ error: "Invalid name or password" });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <Text style={styles.inputText}>Name</Text>
                    <TextInput
                        style={styles.nameInput}
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                    />
                    <Text style={styles.inputText}>Password</Text>
                    <TextInput
                        style={styles.nameInput}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                    <Button title="Log Ind" onPress={this.onLogin} />
                    <Text style={styles.error}>{this.state.error}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    nameInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10
    },
    inputView: {
        flexDirection: 'column',
        paddingLeft: 50,
        paddingRight: 50
    },
    inputText: {
        fontSize: 20
    },
    error: {
        textAlign: 'center',
        color: 'red',

    }
});
