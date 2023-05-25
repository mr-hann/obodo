/*form element 
exporting the elements to index.js to handle
 firebase auth..
 collection the values from the input and uploading 
 them to firebase auth db and fire store db
 */
export let form=document.querySelector('.login-form');
export let email=document.getElementById('e-mail');
export let password=document.getElementById('password');

// error massage element
export let errordiv=document.querySelector('.msg');
export let errorM=document.querySelector('.msg>span');
export let cancelErorr=document.querySelector('.msg img');

//color: #5B5B61;
//error massage function
export function errorMsg(msg){

    errordiv.style.display="grid";

    if(msg.code =="auth/wrong-password"){
        errorM.innerHTML="Wrong password";
        Redwarning(password);
    }else{
        errorM.innerHTML= msg.code;
        Redwarning(password);
        Redwarning(email); 
    }
}


 cancelErorr.addEventListener('click',()=>{
    errordiv.style.display="none";
})



//defult text 
export let activewrite= (e)=>{
    e.style.border="1px solid blue";
    e.style.color="#5B5B61";
}
//warinng ui on input
export let Redwarning=(e)=>{
    e.style.border="1px solid red";
    e.style.color="red"
}
