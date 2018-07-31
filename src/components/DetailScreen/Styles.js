import { StyleSheet } from 'react-native';

export const index = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
  },
});

export const bookImage = StyleSheet.create({
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    marginTop: 10,
  },
});

export const tagsList = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tag: {
    margin: 3,
  },
  tagText: {
    paddingRight: 5,
    color: '#808080',
  },
});

export const bookInfo = StyleSheet.create({
  container: {
    flex: 1.5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 20,
  },
  date: {
    flex: 1,
    fontSize: 14,
    color: '#6E6E6E',
  },
});

export const borrowReturnButton = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
  },
  button: {
    width: 100,
    height: 60,
  },
  returnColor: {
    backgroundColor: '#cd5c5c',
  },
  borrowColor: {
    backgroundColor: '#2e8b57',
  },
});
