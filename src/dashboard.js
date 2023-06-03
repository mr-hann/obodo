import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
//importing firebase auth buildin functions
import { 
   getAuth, 
   onAuthStateChanged,
   signOut
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';

//importing firbase fire store
import {getFirestore, doc, getDocFromCache,getDoc} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';


const firebaseConfig = {
    apiKey: "AIzaSyCY0tB5KgPcNnaFmqT6yLs_8awxJC8QZrc",
   authDomain: "obodo-a58b3.firebaseapp.com",
   projectId: "obodo-a58b3",
   storageBucket: "obodo-a58b3.appspot.com",
   messagingSenderId: "424889896911",
   appId: "1:424889896911:web:ed0e8f370261aefe32ccba",
   measurementId: "G-T07YKR8D64"
 };


let displayemail=document.querySelectorAll('.userEmail');

let signOutBtn=document.querySelector('.drop-down_footer a');

//drop down
let dropDownBtn=document.querySelector('.user-profile>img');
let dropDown=document.querySelector('.drop-down');
dropDownBtn.addEventListener('click',(e)=>{
  toggleDisplay(dropDown);
})

let toggleDisplay = (element)=>{
  if(element.hasAttribute('style')){
    element.removeAttribute('style');
  }
  else{
      element.setAttribute('style','display:block');
    }
}




 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);
 





const monitorChange= async ()=>{
try{
 onAuthStateChanged(auth, user => {
  //if any user is querying db(auth); #current user
   if (user) {

  let docRef= doc(db,"users", user.uid);
  const docSnap=getDoc(docRef);

  //grabing data from db to dispaly user name
  docSnap.then((d)=>{
    //chack if the user exist
  if(d.exists()){
// displayin name in db in dropdown and welcom massage
    document.querySelector('.name').innerHTML=d.data().name;
    document.querySelector('.header-text>h2').innerHTML=`Hello ${d.data().name}`;

   }
   else{
    // if user dont exist do back to login
    window.location.href = "sign-up.html";
  }
  });
    
// display email from auth in the dom
  for(let i=0;i<displayemail.length;i++){
       displayemail[i].innerHTML=user.email;   
      }  
   } 
   else{
    //if the no user is querrying db goto login form 
        window.location.href = "login.html";
   }

   // getting id from db for the user that owns the community
   let docCommunity= doc(db,"user_communities", user.uid);   
   const docComm=getDoc(docCommunity);
   //put the cumunity id to get the community name
   docComm.then((d)=>{
      if (d.exists()){
        let docComName= doc(db,"community", d.data().activeCommunity);
        const docComNameData=getDoc(docComName);
      // grabing the community name display it in the dom
        docComNameData.then((data)=>{
         
          let Name=data.data().name;
  
          document.querySelector('.logo>h3').innerHTML=Name;
         
  
        })
      }else{
        document.querySelector('.logo>h3').innerHTML="Obodo";
      }
     
   })

 }
 
 )
 

}
 catch(error){
  console.log(error);
 }
}




signOutBtn.addEventListener('click',(e)=>{
  dropDown.removeAttribute("style");

     //Sign out the current user
  signOut(auth).then(() => {
    window.location.href = "login.html";
  }).catch((error) => {
    console.log(error)
  });

  
})


monitorChange();
