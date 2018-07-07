import { StyleSheet } from 'react-native';

export const indexStyles = StyleSheet.create({
  isLoading: {
    flex: 1,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  indicator: {
    flex: 1,
    paddingTop: 20,
  },
});

export const BookListStyles = StyleSheet.create({
  list: {
    flex: 1,
    marginTop: 0,
    padding: 0,
  },
  tagsContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 10,
  },
  subtitleView: {
    flexDirection: 'row',
  },
  tagText: {
    paddingRight: 5,
    color: '#808080',
  },
});

