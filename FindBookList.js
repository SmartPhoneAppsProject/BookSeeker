import React from 'react';
import { Button, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AddListView from './AddListView';
import EditText from './EditText';
import Bar from './Bar';

export default class FindBookList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            resultbooks:[],
            isLoading: true,
        }
    }

    updateState() {
        this.setState(this);
    }

    componentDidMount() {
        fetch("https://go-api-staging.herokuapp.com/books")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                let books = [];
                for (i in data) {
                    books.push({
                        key: data[i].id,
                        image: 'https://facebook.github.io/react/logo-og.png',
                        jan_code: data[i].jan_code,
                        published_at: data[i].published_at,
                        status: data[i].status,
                        tags: data[i].tags,
                        title: data[i].title,
                        updated_at: data[i].updated_at,
                        created_at: data[i].created_at,
                    });
                }
                this.setState({ books });
                this.setState({resultbooks:books})
                this.setState({ isLoading: false });
            })
            .catch((error) => console.error(error));
    }

    searchBack(books){
        let newbook=[];
        newbook=books.slice()
        this.setState({resultbooks:newbook});
        console.log(newbook)
    }


    static navigationOptions = {
        title: 'FindBookList',
    };
    render() {
        const { navigate } = this.props.navigation;
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Button
                    title="新規"
                    onPress={() => navigate('New')}
                />
                <Button
                    title="貸出・返却"
                    onPress={() => navigate('Details')}
                />

                <EditText
                    books={this.state.books}
                    searchBack={this.searchBack.bind(this)}
                />

                <AddListView books={this.state.resultbooks} navigation={this.props.navigation} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#FFF',
    },
});