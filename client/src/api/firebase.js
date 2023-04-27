import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "@firebase/storage";
import firebaseStorage from "../Firebase";

const metadata = {
  contentType: 'image/jpeg'
};

async function uploadImage(file) {
  const storageRef = ref(firebaseStorage, 'images/' + file.name);
  const uploadTask = await uploadBytes(storageRef, file, metadata)
  return await getDownloadURL(uploadTask.ref)
}

const firebaseApi = {
  uploadImage,
};

export default firebaseApi;
