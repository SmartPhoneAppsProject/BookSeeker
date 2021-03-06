import React, { Component } from 'react';
// import { AppRegistry } from 'react-native';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import { StackNavigator } from 'react-navigation';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { getAllBooks } from './src/actions';
import reducer from './src/reducers';

import HomeScreenContainer from './src/containers/HomeScreenContainer';
import SearchView from './src/components/HomeScreen/SearchView';
import DetailScreenContainer from './src/containers/DetailScreenContainer';
import LentScanScreenContainer from './src/containers/LentScanScreenContainer';
import EntryScreenContainer from './src/containers/EntryScreenContainer';
import ScanScreenContainer from './src/containers/ScanScreenContainer';
import EntryTagsScreenContainer from './src/containers/EntryTagsScreenContainer';
import { setTopLevelNavigator } from './src/utils/NavigationService';

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreenContainer,
    },
    Entry: {
      screen: EntryScreenContainer,
    },
    Scan: {
      screen: ScanScreenContainer,
    },
    EntryTags: {
      screen: EntryTagsScreenContainer,
    },
    Detail: {
      screen: DetailScreenContainer,
    },
    Search: {
      screen: SearchView,
    },
    LentScan: {
      screen: LentScanScreenContainer,
    },
  },
  {
    initialRouteName: 'Home',
    // header config
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#c0c0c0',
        borderColor: 'transparent',
        borderWidth: 0,
        shadowColor: 'transparent',
        shadowRadius: 0,
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
        shadowOffset: {
          height: 0,
          width: 0,
        },
      },
      headerTintColor: '#ffffff',
    },
  },
);

const middleware = [thunk];
if (__DEV__ === true) {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);

store.dispatch(getAllBooks());

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack
          ref={navigatorRef => setTopLevelNavigator(navigatorRef)}
        />
      </Provider>
    );
  }
}

// AppRegistry.registerComponent('BookSeeker', () => App);
