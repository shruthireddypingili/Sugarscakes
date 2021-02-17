import storage from '@react-native-firebase/storage';

export function FileUpload(ref, image, imageName, onSuccess, onError) {
  const imageRef = storage()
    .ref(ref)
    .child(imageName + '.jpeg');

  imageRef
    .putFile(image.path, {contentType: 'image/jpeg'})
    .then(function() {
      return imageRef.getDownloadURL();
    })
    .then(function(url) {
      onSuccess(url);
    })
    .catch(function(error) {
      onError(error);
    });
}
