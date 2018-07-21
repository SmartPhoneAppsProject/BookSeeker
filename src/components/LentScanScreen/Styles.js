import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const { width } = Dimensions.get('window');

export const index = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  noPermissions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  noPermissionsText: {
    color: 'white',
  },
  cameraScreen: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    margin: 5,
  },
  stringWarn: {
    color: '#cd5c5c',
  },
  text: {
    color: '#f3f3f3',
    textAlign: 'center',
  },
  imageSize: {
    width: 221 / 2,
    height: 93 / 2,
  },
  body: {
    alignItems: 'center',
    margin: 5,
  },
  cameraContainer: {
    width: width * (2 / 3),
    height: width * (2 / 3),
    borderColor: '#f3f3f3',
    borderWidth: 1,
  },
  camera: {
    flex: 1,
  },
  cameraInline: {
    flex: 0.5,
    borderColor: '#cd5c5c',
    borderBottomWidth: 1,
  },
  footer: {
    margin: 5,
  },
  statusOk: {
    textAlign: 'center',
    fontSize: 30,
    color: '#3eb370',
  },
  statusNo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#e95464',
  },
});
