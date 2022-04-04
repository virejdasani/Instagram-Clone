import fb from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseApp = fb.initializeApp({
  apiKey: "AIzaSyDj4oBLNxgQJ1PgmqF4qf_gM6mQo0VY4mI",
  authDomain: "instagram-clone-b210b.firebaseapp.com",
  projectId: "instagram-clone-b210b",
  storageBucket: "instagram-clone-b210b.appspot.com",
  messagingSenderId: "355256084822",
  appId: "1:355256084822:web:6f8da76495caff98274ef7",
});

const db = firebaseApp.firestore();
const auth = fb.auth();
const storage = fb.storage();

export { db, auth, storage, fb };
