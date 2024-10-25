import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA0rsfviuLvphbLbUkmfaXQbJBT5S8aqUk",
  authDomain: "movies-app-ad63d.firebaseapp.com",
  projectId: "movies-app-ad63d",
  storageBucket: "movies-app-ad63d.appspot.com",
  messagingSenderId: "682650609055",
  appId: "1:682650609055:web:d0307f26759abb3fca89aa"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = ()=>{

    signInWithPopup(auth, provider)
    .then((result)=>{
        console.log(result);
        // const name = result.user.displayName;
        // const email = result.user.email;

        // localStorage.setItem("name", name);
        // localStorage.setItem("email", email);
    }).catch((err)=>{
        console.log(err);
        
    })
}
