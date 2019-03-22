import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


  var config = {
    apiKey: "AIzaSyBeGog7d_yyis0U5rPSUfjxee6-QNcvKE0",
    authDomain: "lucas-mario-plan.firebaseapp.com",
    databaseURL: "https://lucas-mario-plan.firebaseio.com",
    projectId: "lucas-mario-plan",
    storageBucket: "lucas-mario-plan.appspot.com",
    messagingSenderId: "345649281990"
  };
  firebase.initializeApp(config);
  firebase.firestore();

export default firebase