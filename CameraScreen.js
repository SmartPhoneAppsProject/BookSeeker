import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Slider } from 'react-native';
import { Camera, Permissions, FileSystem, Constants } from 'expo';
import GalleryScreen from './GalleryScreen';

export default class CameraScreen extends React.Component {
  state = {
    zoom: 0,
    autoFocus: 'on',
    type: 'back',
    ratio: '4:3',
    photoId: 1,
    showGallery: false,
    permissionsGranted: false,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos')
      .catch(e => {
        console.log(e, 'Directory exists');
      });
  }

  toggleView() {
    this.setState({
      showGallery: !this.state.showGallery,
    });
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 < 0 ? 0 : this.state.zoom + 0.1,
    });
  }

  async takePicture() {
    if (this.camera) {
      this.camera.takePictureAsync()
        .then((data) => {
          // FileSystem.moveAsync({
          //   from: data.uri,
          //   to: `${FileSystem.documentDirectory}photos/Phot_${this.state.photoId}.jpg`,
          // })
          return data;
        })
        .then((photo) => {
          this.setState({
            photoId: this.state.photoId + 1,
          });
          this.goBackScreen(photo);
        })
        .catch((e) => console.error(e));
    }
  }

  goBackScreen(data) {
    this.props.navigation.state.params.returnData(data);
    this.props.navigation.goBack();
  }

  renderGallery() {
    return <GalleryScreen onPress={this.toggleView.bind(this)} />;
  }

  renderNoPermissions() {
    return (
      <View style={styles.noPermissions} >
        <Text style={styles.noPermissionsText}>
          Camera permissions not granted - cannot open camera preview.
        </Text>
      </View>
    );
  }

  renderCamera() {
    return (
      <Camera
        ref={ref => { this.camera = ref; }}
        style={styles.camera}
        type={this.state.type}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        ratio={this.state.ratio}>
        <View style={styles.cameraHeader}>
          <TouchableOpacity style={styles.flipButton}
            onPress={this.toggleFacing.bind(this)}>
            <Text style={styles.flipText}>FLIP</Text>
          </ TouchableOpacity>
        </View>
        <View style={styles.cameraCenter}>
        </View>
        <View style={styles.cameraFooter}>
          <TouchableOpacity style={[styles.flipButton, styles.zoom]}
            onPress={this.zoomIn.bind(this)}>
            <Text style={styles.flipText}> + </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flipButton, styles.zoom]}
            onPress={this.zoomOut.bind(this)}>
            <Text style={styles.flipText}> - </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, styles.picButton, styles.snap]}
            onPress={this.takePicture.bind(this)}>
            <Text style={styles.flipText}> SNAP </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, styles.galleryButton, styles.gallery]}
            onPress={this.toggleView.bind(this)}>
            <Text style={styles.flipText}> Gallery </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    );
  }

  render() {
    const cameraScreenContent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions();
    const content = this.state.showGallery
      ? this.renderGallery()
      : cameraScreenContent;
    return <View style={styles.container}>{content}</View>;
  }
}

const styles = StyleSheet.create({
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
    color: 'white'
  },
  camera: {
    flex: 1,
  },
  CameraText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white'
  },
  cameraHeader: {
    flex: 0.5,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cameraCenter: {
    flex: 0.4,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: -5,
  },
  cameraFooter: {
    flex: 0.1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  zoom: {
    flex: 0.1,
  },
  snap: {
    flex: 0.3,
  },
  gallery: {
    flex: 0.25,
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
});