import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAmVvSGf191ZyoujuXAhdIuKaeLnUdGJoI",
    authDomain: "scic-job-task-fdca5.firebaseapp.com",
    projectId: "scic-job-task-fdca5",
    storageBucket: "scic-job-task-fdca5.appspot.com",
    messagingSenderId: "224971688986",
    appId: "1:224971688986:web:24b3d39be56089ca0815a3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
