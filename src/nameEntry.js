
let inputs=document.querySelectorAll('input');
let btn=document.querySelector('.btn-links>a');



  for(let i=0;i<inputs.length; i++){

    //when typing checking if the input is empty to activate the next face

    inputs[i].addEventListener('keyup',(h)=>{
     // if (inputs[0].value=="" || inputs[0].value=="/^$/" && inputs[1].value=="" || inputs[1].value=="/^/s$/"){

      if(inputs[0].value.length>3 && inputs[1].value.length>3){

        btn.setAttribute("class", "active");
       

      }else{

        btn.removeAttribute("class");
        btn.removeAttribute("href");

        btn.setAttribute("class", "def");

      }
  //  }
    })

    
  }

  //importing firbase to project
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore,doc,setDoc,addDoc,collection} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import { 
  getAuth, 
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';

  
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
 //activating load screen
 document.querySelector('.btn-links span').style.display="none";
 document.querySelector('.btn-links svg').style.display="block";
 

let createCommunity=async ()=>{
 
try {
  
  await onAuthStateChanged(auth,user => {
  
  if (user) {

    const newCommunity= addDoc(collection(db,"community"),{

    name: inputs[0].value,
    URL: inputs[1].value + ".obodo.com",
    members:[user.uid],
    owner:user.uid
  })
  
  newCommunity.then( (u)=>{
    
    setDoc(doc(db,'user_communities',user.uid),{
    //populate this information to the db
    activeCommunity:u.id,
    communities:[u.id]

     });

     document.cookie="id="+u.id;

     window.location.href ="member.html";
  } 
  
  )
  
  } else {
    window.location.href = "sign-up.html";
  }
  });

 
} catch (e) {
  //activating load screen
 document.querySelector('.btn-links span').style.display="block";
 document.querySelector('.btn-links svg').style.display="none";
  console.error("Error adding document: ", e);
}

 
}



 

  btn.addEventListener('click',createCommunity)