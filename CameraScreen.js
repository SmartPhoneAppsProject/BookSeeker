import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Slider } from 'react-native';
import { Camera, Permissions, Constants } from 'expo';

export default class CameraScreen extends React.Component {
  static navigationOption = {
    title: 'カメラ',
  };

  constructor(props) {
    super(props);
    this.state = {
      zoom: 0,
      autoFocus: 'on',
      type: 'back',
      ratio: '4:3',
      permissionsGranted: false,
    };

    this.toggleFacing = this.toggleFacing.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.takePicture = this.takePicture.bind(this);
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
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
      this.camera.takePictureAsync({ base64: true })
        .then((photo) => {
          this.goBackScreen(photo);
        })
        .catch((error) => console.error(error));
    }
  }

  goBackScreen(data) {
    this.props.navigation.state.params.returnDataFromChild(data);
    this.props.navigation.goBack();
  }

  renderNoPermissions() {
    return (
      <View style={styles.noPermissions} >
        <Text style={styles.noPermissionsText}>
          カメラを使用できません
        </Text>
      </View>
    );
  }

  renderCamera() {
    return (
      <Camera style={styles.camera}
        ref={ref => { this.camera = ref; }}
        type={this.state.type}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        ratio={this.state.ratio}>
        <View style={styles.cameraHeader}>
          <TouchableOpacity style={styles.flipButton}
            onPress={this.toggleFacing}>
            <Text style={styles.flipText}>FLIP</Text>
          </ TouchableOpacity>
        </View>
        <View style={styles.cameraCenter}>
        </View>
        <View style={styles.cameraFooter}>
          <TouchableOpacity style={[styles.flipButton, styles.zoom]}
            onPress={this.zoomIn}>
            <Text style={styles.flipText}> + </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flipButton, styles.zoom]}
            onPress={this.zoomOut}>
            <Text style={styles.flipText}> - </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, styles.picButton, styles.snap]}
            onPress={this.takePicture}>
            <Text style={styles.flipText}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    );
  }

  render() {
    const cameraScreen = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions();
    return <View style={styles.container}>{cameraScreen}</View>;
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