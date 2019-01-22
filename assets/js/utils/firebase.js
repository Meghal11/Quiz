// Initialize Firebase
var config = {
  apiKey: "AIzaSyBt_ygwDCYa_1xNdqTzsq4w0NQHLTouQdo",
  authDomain: "quiz-o-mania-de3c7.firebaseapp.com",
  databaseURL: "https://quiz-o-mania-de3c7.firebaseio.com",
  projectId: "quiz-o-mania-de3c7",
  storageBucket: "quiz-o-mania-de3c7.appspot.com",
  messagingSenderId: "59048180999"
};
firebase.initializeApp(config);

function* autoGen() {
  var counter = 1;
  while (true) {
    yield counter;
    counter++;
  }
}