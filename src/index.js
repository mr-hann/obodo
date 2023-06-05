import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
//importing firebase auth buildin functions
import { 
   getAuth, 
   onAuthStateChanged,
   signInWithEmailAndPassword,
   createUserWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';

//importing firbase fire store
import {getFirestore} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';

//importing from the logoin
import {
   email,
   password,
   form,
   errorMsg
} from "./loginui.js";


//linkin with firebase 
export const firebaseConfig = {
   apiKey: "AIzaSyCY0tB5KgPcNnaFmqT6yLs_8awxJC8QZrc",
  authDomain: "obodo-a58b3.firebaseapp.com",
  projectId: "obodo-a58b3",
  storageBucket: "obodo-a58b3.appspot.com",
  messagingSenderId: "424889896911",
  appId: "1:424889896911:web:ed0e8f370261aefe32ccba",
  measurementId: "G-T07YKR8D64"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);


//login auth
const loginEmailPassword = async (e)=>{
   e.preventDefault();
   //activating load screen
   document.querySelector('.btn-form__submit span').style.display="none";
   document.querySelector('.btn-form__submit svg').style.display="block";
   
   let valueEmail=email.value;
   let valuePassword=password.value;
   try{
      
    let userData = await signInWithEmailAndPassword(auth,valueEmail,valuePassword);
   
      monitorChange();
   }catch(error){
      document.querySelector('.btn-form__submit span').style.display="block";
      document.querySelector('.btn-form__submit svg').style.display="none";
      errorMsg(error);

   }

   
   
}






//on submit fo the login form
form.addEventListener('submit',loginEmailPassword);

//collectin current user info
export const monitorChange= async ()=>{

onAuthStateChanged(auth, user => {
   if (user) {
     const uid = user.uid;
     window.location.href = "dashoard.html";
   } else {
      window.location.href = "login.html";
   }
 })
}