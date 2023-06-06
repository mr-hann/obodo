let data;
//preventing form from submitting
let form=document.forms[0];
 form.addEventListener('submit',(e)=>{
    e.preventDefault();
 });

 //sellecting elements
 let addbtn=document.querySelector('button:last-child');
 let submit=document.querySelector('.btn-links>a:first-child');
 
  
let membersBtn=document.querySelectorAll('.members-btn button');
let membersBtnNotLastChild=document.querySelectorAll('.members-btn button:not(:last-child)');
 //creating the element
 let membersDiv=document.querySelector('.members-btn');
 let inputDiv=document.createElement('div');
 inputDiv.setAttribute('class','name-of-members');

 let span=document.createElement('span');
 span.innerHTML='<img src="img/icons/close.png" alt="x">';


 let input=document.createElement('input');
 input.setAttribute('placeholder','Custom name');

 inputDiv.appendChild(input);
 inputDiv.appendChild(span);

 
 /*adding the created element to 
 the page and removing btns */
 addbtn.addEventListener('click',(e)=>{
    
     
     //remove the btns
     for(let i=0;i<membersBtn.length;i++){

         if(membersBtn[i].style.display=="none"){
             membersBtn[i].style.display="inline-block";
             inputDiv.style.display="none";
             //when ever the cancel button is clicked clear the input
             input.value="";
         }else{
             membersBtn[i].style.display="none";
             inputDiv.style.display="grid";
         }
     }
     
     
     membersDiv.appendChild(inputDiv);
 });

 span.addEventListener('click',(e)=>{

     //unhidding btn
     for(let i=0;i<membersBtn.length;i++){

         if(membersBtn[i].style.display=="none"){
             membersBtn[i].style.display="inline-block";
               //hidding input
               inputDiv.style.display="none";
              
         }else{
             membersBtn[i].style.display="none";
              
              inputDiv.style.display="grid";
         }

     }
   
 });


 //sellection members name using btn
for(let i=0; i<membersBtnNotLastChild.length;i++){
    let p=i;
membersBtnNotLastChild[i].addEventListener('click',(e)=>{
    e.target.setAttribute("class","sellected");
     data=e.target.innerHTML;
     //clear tghe input when ever the user sellects a btn 
     input.value="";
  // Remove the attribute from all other elements
  for (let i = 0; i < membersBtnNotLastChild.length; i++) {
    if (i !==p ) {
      membersBtnNotLastChild[i].removeAttribute('class');
    }
  }
});
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


let addMemerName=()=>{
  //activating load screen
 document.querySelector('.btn-links span').style.display="none";
 document.querySelector('.btn-links svg').style.display="block";
 
try{
const communityRef = doc(db, 'community', document.cookie.split('=')[1]);
if(input.value=="" || input.value=="/^$/"){
    data=data;
}else{
    data=input.value;
}
setDoc(communityRef, { nameOfMembers: data}, { merge: true });

window.location.href = "intrested.html";
}catch(error){

  //deactivating load screen 
  document.querySelector('.btn-links span').style.display="block";
  document.querySelector('.btn-links svg').style.display="none";
  console.log(error);
}
}
 

submit.addEventListener('click',addMemerName);