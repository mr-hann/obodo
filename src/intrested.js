let data=[];
//prevent form from submiting
let form =document.forms;
form[0].addEventListener('submit',(e)=>{
    e.preventDefault();
})
//continue btn
let submit=document.querySelector('.btn-links>a:first-child');
//sellecting intrest with buttons
let buttons=document.querySelectorAll(".members-btn button");

//sellecting and add info to the data array (intrested)
for(let i=0;i<buttons.length;i++){
buttons[i].addEventListener('click',(e)=>{
    if(e.target.hasAttribute('class')){
        e.target.removeAttribute('class');
        
    }else{
        e.target.setAttribute('class','sellected');
        data.push(buttons[i].innerHTML);
    }

})

}



//importing firbase to project
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
  import { getFirestore,doc,setDoc,addDoc,collection} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
  
    
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
  
  
  const db = getFirestore(app);
  
  
  let communityIntrest=()=>{
   console.log(data);
  const communityRef = doc(db, 'community', document.cookie.split('=')[1]);
  
  setDoc(communityRef, {intrested:data}, { merge: true });
  
  window.location.href = "first-action.html";
  }
   
  
  submit.addEventListener('click',communityIntrest);