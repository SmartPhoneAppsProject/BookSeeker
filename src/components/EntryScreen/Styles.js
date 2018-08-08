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
  photoContainer: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width / 6,
    height: (4 * (width / 3)) / 6,
  },
  photoButton: {
    padding: 5,
    margin: 5,
  },
  childContainer: {
    flex: 1,
    padding: 15,
  },
  tag: {
    alignSelf: 'stretch',
    paddingLeft: 20,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderColor: '#A4A4A4',
  },
  dateTitle: {
    color: '#A4A4A4',
    fontWeight: '700',
  },
  dateIcon: {
    marginRight: 10,
    marginLeft: 110,
  },
  dateButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    margin: 10,
    width: width - 60,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 2,
    borderColor: '#A4A4A4',
    borderRadius: 7,
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 20,
    paddingRight: 10,
    paddingLeft: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  buttonIcon: {
    marginRight: 10,
  },
});

