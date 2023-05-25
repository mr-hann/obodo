let displayemail=document.querySelector('.userEmail');

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
//importing firebase auth buildin functions
import { 
   getAuth, 
   onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';

//importing firbase fire store
import {getFirestore} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';


const firebaseConfig = {
    apiKey: "AIzaSyCY0tB5KgPcNnaFmqT6yLs_8awxJC8QZrc",
   authDomain: "obodo-a58b3.firebaseapp.com",
   projectId: "obodo-a58b3",
   storageBucket: "obodo-a58b3.appspot.com",
   messagingSenderId: "424889896911",
   appId: "1:424889896911:web:ed0e8f370261aefe32ccba",
   measurementId: "G-T07YKR8D64"
 };


 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 


  const monitorChange= async ()=>{

onAuthStateChanged(auth, user => {
   if (user) {
     const uid = user.uid;
     displayemail.innerHTML=user.email;
     console.log(user);
   } else {
        window.location.href = "login.html";
   }
 })
}

monitorChange();
