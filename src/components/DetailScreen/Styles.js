import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export const index = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 50,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  dateContainer: {
    flex: 0.4,
  },
  date: {
    fontSize: 14,
    color: '#6E6E6E',
  },
  statusContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
  },
  button: {
    width: 70,
  },
});

export const tagsList = StyleSheet.create({
  tagContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
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

export const bookImage = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 300,
    width,
  },
});

export const statusIcon = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    flex: 1,
  },
});

export const lendingButton = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
});
