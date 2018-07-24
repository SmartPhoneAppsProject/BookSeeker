import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export const index = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
  },
  bookColumns: {
    flex: 1,
  },
});

export const bookImage = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 300,
    width,
  },
});

export const tagsList = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  tag: {
    margin: 3,
    paddingVertical: 8,
  },
  tagText: {
    paddingRight: 5,
    color: '#808080',
  },
});

export const bookInfo = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  date: {
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
