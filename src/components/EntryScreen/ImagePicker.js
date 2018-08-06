import {
  ImagePicker,
  Permissions,
} from 'expo';

export const pickPhoto = async () => {
  let photo = '';
  const results = await Promise.all([
    Permissions.askAsync(Permissions.CAMERA),
    Permissions.askAsync(Permissions.CAMERA_ROLL),
  ]);

  if (results.some(({ status }) => status === 'granted')) {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });

    if (!result.cancelled) {
      photo = result;
    }
  }
  return photo;
};

export const takePhoto = async () => {
  let photo = '';
  const results = await Promise.all([
    Permissions.askAsync(Permissions.CAMERA),
    Permissions.askAsync(Permissions.CAMERA_ROLL),
  ]);

  if (results.some(({ status }) => status === 'granted')) {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });

    if (!result.cancelled) {
      photo = result;
    }
  }

  return photo;
};
