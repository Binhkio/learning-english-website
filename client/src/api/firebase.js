import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import firebaseStorage from "../Firebase";

const metadata = {
  contentType: 'image/jpeg'
};

const uploadImage = async (file) => {
  const storageRef = ref(firebaseStorage, 'images/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed',
      (snapshot) => {
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        // switch (snapshot.state) {
        //   case 'paused':
        //     console.log('Upload is paused');
        //     break;
        //   case 'running':
        //     console.log('Upload is running');
        //     break;
        // }
      }, 
      (error) => {
        reject(error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  })
}

const firebaseApi = {
  uploadImage,
};

export default firebaseApi;
