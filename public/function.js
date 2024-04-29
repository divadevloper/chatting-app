let signin = document.getElementById("register")
let login = document.getElementById("login")
let messaged = document.getElementById("message")
login.style.display = "none"

function signinbtn() {
  login.style.display = "none"
  signin.style.display = "block"
}
function logininbtn() {
  login.style.display = "block"
  signin.style.display = "none"

}
function register(ev) {
  ev.preventDefault();

  firebase.auth().createUserWithEmailAndPassword(email.value, pass.value)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      console.log(user);
      alert("Registration successfull")
      messaged.innerHTML = `<h4 class="text-info"> Registration Successfull</h4>`
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      messaged.innerHTML = `<h3 class="text-danger"> ${errorMessage}</h3>`

    });
}

function google() {
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // IdP data available in result.additionalUserInfo.profile.
      // ...
      alert("Sign in")
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorMessage);
      // ...
    });

}
function loginWith(ev) {
  ev.preventDefault();

  firebase.auth().signInWithEmailAndPassword(useremail.value, userpassword.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      alert(`Welcome ${useremail.value}`);
      window.location.href = "index.html";
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}