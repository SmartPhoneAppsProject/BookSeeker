import React, { Componet } from 'react';
import { StyleSheet, TextInput, View, Text, Image } from 'react-native';

export default class entryScreen extends Componet {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            tags: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
                />
                <Text>Title</Text>
                <TextInput
                    style={styles.title}
                    onChangeText={(text) => this.setState({ title })}
                    value={this.state.text}
                />
                <Text>Tag</Text>
                <TextInput
                    style={styles.tags}
                    onChangeText={(text) => this.setState({ title })}
                    value={this.state.text}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
    },
    tags: {
    },
});