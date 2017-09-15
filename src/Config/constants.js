import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBJBahOKOcS096ZxUOLlYyRjnqHKv5Om4g",
  authDomain: "tristans-personal-website.firebaseapp.com",
  databaseURL: "https://tristans-personal-website.firebaseio.com",
  projectId: "tristans-personal-website",
  storageBucket: "",
  messagingSenderId: "465913354469"
};
firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
