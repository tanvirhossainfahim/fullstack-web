import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './Firebase.config';
export const initializeApp = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
}; // firebase initialize app firebase code
export const handleGoogleSignIn = () => {
  const GProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(GProvider)
    .then((res) => res.user)
    .catch((error) => error);
}; // Sign in with google account firebase code

export const createUserEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const userCreated = res.user;
      userCreated.successMsg = "User Successfully Created";
      userCreated.isCreated = true;
      userName(name);
      return userCreated;
    })
    .catch((error) => {
      const userCreated = {};
      userCreated.errorMsg = error.message;
      return userCreated;
    });
}; // create user email and password firebase code

const userName = (name) => {
  const user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      console.log("update successfully");
    })
    .catch((error) => {
      console.log(error.message);
    });
}; // userName update firebase code