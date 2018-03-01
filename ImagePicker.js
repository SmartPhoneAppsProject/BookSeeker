import { ImagePicker } from 'expo';

export const pickPhoto = async () => {
  let photo = null;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'Images',
    allowsEditing: true,
    aspect: [4, 3],
    base64: true,
  });

  if (!result.cancelled) {
    photo = result;
  }

  return photo;
};

export const takePhoto = async () => {
  let photo = null;

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    base64: true,
  });

  if (!result.cancelled) {
    photo = result;
  }

  return photo;
};