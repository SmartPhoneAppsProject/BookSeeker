import React from 'react';
import { Button, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AddListView from './AddListView';
import EditText from './EditText';
import PullRefresh from './pullRefresh'
import Bar from './Bar';
import reqBook from './reqBook'

export default class FindBookList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      isLoading: true,
    }
    
    this._refresh = this._refresh.bind(this);
    
  }

  updateState() {
    this.setState(this);
  }
  
  componentDidMount() {
    const bookSeeker = "https://go-api-staging.herokuapp.com/books";

    reqBook(bookSeeker)
      .then((books) => {
        this.setState({ books });
        this.setState({ isLoading: false });
      })
      .catch((error) => console.error(error));
  }
  
  _refresh() {
    const bookSeeker = "https://go-api-staging.herokuapp.com/books";

    reqBook(bookSeeker)
      .then((books) => {
        console.log(books);
        this.setState({ books });
        this.setState({ isLoading: false });
      })
      .catch((error) => console.error(error));
  }
  

  callbackst(text) {
    this.searchStart(text)
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

    console.log(this.state.books.length);
    if (this.state.books.length === 0) {
      return (
        <PullRefresh
          refresh={this._refresh}
        />
      )
    }

    return (
      <View>
        <Button
          title="新規"
          onPress={() => navigate('New')}
        />
        <Button
          title="貸出・返却"
          onPress={() => navigate('Details')}
        />
        
        <EditText
        />

        <AddListView books={this.state.books} navigation={this.props.navigation} />
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