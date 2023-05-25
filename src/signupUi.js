//grabimg elements from the sign upm ui
let formSignUp=document.querySelector('.sign-up');
let userName=document.getElementById('Fullname-reg');
let emailReg=document.getElementById('e-mail-reg');
let passwordReg= document.getElementById('password-reg');

//importing firbase to project
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore,collection,addDoc} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
//importing firebase auth buildin functions
import { 
    getAuth, 
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
 } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';

import {Redwarning,cancelErorr,errorM,errordiv} from './loginui.js';

//linkin with firebase 
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
 
 const auth=getAuth(app);
 const db = getFirestore(app);

 


userName.addEventListener('keyup',(e)=>{
  if(e.target.value!=""){
      defulttext(e.target);
  }else if(e.target.value.length<4){
     Redwarning(e.target);
  }else{
     Redwarning(e.target);
  }
})

//checking password
///^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(e.target.value)
passwordReg.addEventListener('keyup',(e)=>{
   if(!e.target.value || /^\s*$/.test(e.target.value)){
      Redwarning(e.target);
   }
   if(e.target.length<6){
      Redwarning(e.target);
   }
 })


//checking email
emailReg.addEventListener('keyup',(e)=>{
   let element=e.target;

   if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(element.value)){
      defulttext(e.target);
   }else{
     Redwarning(e.target); 
    
   }
})

const colref=collection(db,'users');

 //sign up auth
const signUp = async (e)=>{
  e.preventDefault();


   let valueEmail=emailReg.value;
   let valuePassword=passwordReg.value;
   
  
   
   try{
   
      let userData = await createUserWithEmailAndPassword(auth,valueEmail,valuePassword).then((u) => {
         
        addDoc(colref,{
            avatarURL:"",
            email:u.user.email,
            id:u.user.uid,
            name:userName.value,
            phoneNumber:""
        }).then(()=>{
    
      monitorChange();
   });
      })
      
   }catch(error){

      errordiv.style.display="grid";
       errorMsg(error.message);
      
      if(error.message.search("Password")>0){
         Redwarning(passwordReg);
        errorMsg("Minimum 6 characters");
        // At least one uppercase character<br>At least one lowercase character<br> At least one digit<br> At least one special character";
      }else if(error.message.search("email")>0){
          Redwarning(emailReg); 
      }else{
         Redwarning(emailReg);
         Redwarning(passwordReg);
         Redwarning(userName);
      }
         
  
     
      let errorMessage = error.message;
   }

  
   
}

// siign up btn
formSignUp.addEventListener('submit',signUp);

//login user to dashborad
const monitorChange= async ()=>{

onAuthStateChanged(auth, user => {
   if (user) {
     window.location.href = "dashoard.html";
    
   } else {
      window.location.href = "login.html";
   }
 })
}


//cancel the error massage
cancelErorr.addEventListener('click',()=>{
   errordiv.style.display="none";
})


//error massage 
let errorMsg=(msg)=>{
   errorM.innerHTML=msg;
 }
 //defult text color
let defulttext=(e)=>{
   e.style.color=" #5B5B61";
   e.style.border="0px";
}