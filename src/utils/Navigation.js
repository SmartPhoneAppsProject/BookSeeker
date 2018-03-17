import { NavigationActions } from "react-navigation";

export const goToHomeScreen = () => {
  // https://github.com/react-navigation/react-navigation/issues/1448
  const actions = [NavigationActions.navigate({ routeName: 'Home' })];

  const resetAction = NavigationActions.reset({
    index: actions.length - 1,
    actions
  });

  this.props.navigation.dispatch(resetAction)
};