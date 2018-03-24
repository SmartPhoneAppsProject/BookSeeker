// https://reactnavigation.org/docs/navigating-without-navigation-prop.html
import { NavigationActions } from 'react-navigation';

let navigator;

export const setTopLevelNavigator = (navigatorRef) => {
  navigator = navigatorRef;
};

export const navigate = (routeName, params) => {
  navigator.dispatch(NavigationActions.navigate({
    type: NavigationActions.NAVIGATE,
    routeName,
    params,
  }));
};
