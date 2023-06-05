//grabimg elements from the sign upm ui
let formSignUp=document.querySelector('.sign-up');
let userName=document.getElementById('Fullname-reg');
let emailReg=document.getElementById('e-mail-reg');
let passwordReg= document.getElementById('password-reg');




//importing firbase to project
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore,doc,setDoc} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
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

 
//checking if username is empty

userName.addEventListener('keyup',(e)=>{
   defulttext(e.target);
})

//checking password
///^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(e.target.value)
passwordReg.addEventListener('keyup',(e)=>{
   if(/^\s*$/.test(e.target.value)){
      Redwarning(e.target);
   }
   if(e.target.length<6){
      Redwarning(e.target);
   }
 })


//checking email
emailReg.addEventListener('keyup',(e)=>{
   
   if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)){
      defulttext(e.target);
   }else{
     Redwarning(e.target); 
    
   }
})



 //sign up auth
const signUp = async (e)=>{
  e.preventDefault();
  

     //activating load screen
   document.querySelector('.btn-form__submit span').style.display="none";
   document.querySelector('.btn-form__submit svg').style.display="block";
   
  if(userName.value==null|| userName.value==undefined||(/^s$/.test(userName.value))){
      errorMsg("please! enter your name.");
  }else{

   let valueEmail=emailReg.value;
   let valuePassword=passwordReg.value;
   
  
   
   try{
   
      let userData = await createUserWithEmailAndPassword(auth,valueEmail,valuePassword).then((u) => {
         
      setDoc(doc(db,'users',u.user.uid),{
         //populate this information to the db
            avatarURL:"",
            email:u.user.email,
            id:u.user.uid,
            name:userName.value,
            phoneNumber:""

        }).then(()=>{

         //go to the next page
            monitorChange();

          });

      })
      
   }catch(error){
//deactivating load screen
      document.querySelector('.btn-form__submit span').style.display="block";
      document.querySelector('.btn-form__submit svg').style.display="none";

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
}

// siign up btn
formSignUp.addEventListener('submit',signUp);

//login user to dashborad
const monitorChange= async ()=>{

onAuthStateChanged(auth, user => {
   if (user) {
     window.location.href = "name-entery.html";
    
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