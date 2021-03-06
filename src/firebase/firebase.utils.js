import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config  = {
    apiKey: "AIzaSyCLAYnFMMQrZGAcIkbtQIbHQA83_p_X4Qs",
    authDomain: "crwn-db-1ba63.firebaseapp.com",
    projectId: "crwn-db-1ba63",
    storageBucket: "crwn-db-1ba63.appspot.com",
    messagingSenderId: "338976280142",
    appId: "1:338976280142:web:df0f3bf373144519243d1f",
    measurementId: "G-GGZRNVGQGZ"
  };

  export const createUserProfileDocument = async (userAuth, additionalData)=>{
    if(!userAuth) return;

    const userRef=firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} =userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error){
        console.log('error creating user',error.message);
      }
    }
    return userRef;
  };

firebase.initializeApp(config);

export const auth =firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle =() => auth.signInWithPopup(provider);

export default firebase;