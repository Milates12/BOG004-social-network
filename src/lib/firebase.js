/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDOPnedni_lGkXKH8QvH6JV1iTbcAwmJm4',
  authDomain: 'social-network-ac42d.firebaseapp.com',
  projectId: 'social-network-ac42d',
  storageBucket: 'social-network-ac42d.appspot.com',
  messagingSenderId: '301187927033',
  appId: '1:301187927033:web:6bf303b353329946510b28',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const dataBase = getDatabase(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const SignUpUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)
  .then(
    (userCredential) => {
      const user = userCredential.user;
      sendEmailVerification(user).then(() => {
        // eslint-disable-next-line no-alert
        alert(`Se ha enviado un correo de verificación a ${user.email}`);
      });
    },
  );

export const SignInUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(
      (userCredential) => {
        const user = userCredential.user;
        console.log('ingreso exitoso');
      },
    );
  return signInWithEmailAndPassword(auth, email, password);
};

export const googleSignWithPopup = () => signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

export const userSignOut = () => signOut(auth).then(() => {
  console.log('SIGN OUT !');
}).catch((error) => {
  console.log('ERROR !');
});

export const saveComment = (comment) => addDoc(collection(db, 'comments'), { comment, likes: [] });
export const getComments = () => getDocs(collection(db, 'comments'));
export const onGetComments = (callback) => onSnapshot(collection(db, 'comments'), callback);
export const deleteComment = (id) => deleteDoc(doc(db, 'comments', id));
export const getComment = (id) => getDoc(doc(db, 'comments', id));
export const updateComment = (id, newFileds) => updateDoc(doc(db, 'comments', id), newFileds);
