import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const firebaseConfig = {
	apiKey: "AIzaSyDSqt6GyISCD3uhdlaZcU7QnRVVv7NUiNM",
	authDomain: "netflix-clone-bd3cc.firebaseapp.com",
	projectId: "netflix-clone-bd3cc",
	storageBucket: "netflix-clone-bd3cc.appspot.com",
	messagingSenderId: "876059975958",
	appId: "1:876059975958:web:f4cbbfede96646db74f037",
	measurementId: "G-H2K9S3FMB3",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export default auth;
