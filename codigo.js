const firebaseConfig={
    apiKey: "AIzaSyDYzJZV7bdEl2orvZlhPjBHXciLR1mIpVQ",
    authDomain: "datos-formulario-acb9e.firebaseapp.com",
    projectId: "datos-formulario-acb9e",
    storageBucket: "datos-formulario-acb9e.appspot.com",
    messagingSenderId: "1040005164379",
    appId: "1:1040005164379:web:9acad329ec3c88766a3e7e"
}

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


const formulario=document.getElementById('formulario');

formulario.addEventListener('submit',(event)=>{
    event.preventDefault();

    let nombreEntrada=document.getElementById('name');
    let errorNombre=document.getElementById('nameError');

    if(nombreEntrada.value.trim()===''){
        errorNombre.textContent='Por favor, ingresa un nombre';
        errorNombre.classList.add('error-message');
    }else{
        errorNombre.textContent='';
        errorNombre.classList.remove('error-message');
    }

    let emailEntrada=document.getElementById('email');
    let errorEmail=document.getElementById('emailError');
    let emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if(!emailPattern.test(emailEntrada.value)){
        errorEmail.textContent='Por favor, Ingresa un email válido';
        errorEmail.classList.add('error-message');
    }else{
        errorEmail.textContent='';
        errorEmail.classList.remove('error-message');
    }

    let contrasenaEntrada=document.getElementById('password');
    let errorContrasena=document.getElementById('passwordError');
    let contresenaPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if(!contresenaPattern.test(contrasenaEntrada.value)){
        errorContrasena.textContent='La contraseña debe tener entre 8 y 15 caracteres, numeros, mayúsculas, minúsculas y carácteres especiales';
        errorContrasena.classList.add('error-message');
    }else{
        errorContrasena.textContent='';
        errorContrasena.classList.remove('error-message');
    }


    if(!errorNombre.textContent && !errorEmail.textContent && !errorContrasena.textContent){
        alert('El formulario se envio')

        db.collection("users").add({
            nombre: nombreEntrada.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value,
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });




        document.getElementById('formulario').reset();
    }

})