let spanner = document.getElementById("spanner")
let displaymess = document.getElementById("displaymess")
let currentuser;
function authenicateuser() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user);
            currentuser = user
          var uid = user.uid;
          spanner.innerHTML = user.email
          // ...
        } else {
            alert("create an Account")
            window.location.href ="sigin.html"
          // User is signed out
          // ...
        }
      });
}
authenicateuser()

function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href ="sigin.html"
      }).catch((error) => {
        // An error happened.
        alert("Could't log out")
        console.log(error);
      });
}
let textmessage = document.getElementById("textmessage")
function sendmess() {
  // Add a new document in collection "cities"
db.collection("chats").doc().set({
  name: currentuser.displayName,
  image:currentuser.photoURL,
  time: new Date(),
  message: textmessage.value
})
.then(() => {
  console.log("Document successfully written!");
  alert("written")
  allmessages()
})
.catch((error) => {
  console.error("Error writing document: ", error);
});
}

function allmessages() {
  db.collection("chats").orderBy('time').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data()); 
        displaymess.innerHTML += `<li ondblclick="delMessage('${doc.id}')" class="mess ${doc.data().name == currentuser.displayName ? 'ms-auto' :'me-auto'}">
        <img class="imm"src ="${doc.data().image == null? 'nullava.jpeg': doc.data().image}"/>
        <small>${doc.data().name}</small>
        <p>${doc.data().message}</p>
        <small>${new Date(doc.data().time.seconds*1000).toLocaleTimeString()}</small>
        </li>`
    });
});
}
allmessages();

function delMessage(id,name) {
 if (currentuser.displayName == name) {
  db.collection("chats").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
alert("Document successfully deleted!");
    allmessages();
}).catch((error) => {
    console.error("Error removing document: ", error);
    console.log(error);
});
 } else {
  alert("Access denial")
  return
 }
  
}