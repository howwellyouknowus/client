
import firebase from 'firebase'

import 'firebase/firestore'

let config = {
    apiKey: "AIzaSyBMHH8bPe7-A69cyI-QrBQFTuJBMOl_xhU",
    authDomain: "howwellyouknowus.firebaseapp.com",
    databaseURL: "https://howwellyouknowus.firebaseio.com",
    projectId: "howwellyouknowus",
    storageBucket: "howwellyouknowus.appspot.com",
    messagingSenderId: "493616838925"
};
  
let db = firebase.initializeApp(config);

export default db
