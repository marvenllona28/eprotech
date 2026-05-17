import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* FIREBASE CONFIG */

const firebaseConfig = {
  apiKey: "AIzaSyBA0edxlvyfpJnIafk2t4fGFCZ2X1pZXW8",
  authDomain: "eprotech-15193.firebaseapp.com",
  projectId: "eprotech-15193",
  storageBucket: "eprotech-15193.firebasestorage.app",
  messagingSenderId: "435420541343",
  appId: "1:435420541343:web:2a1a462edcd5d1a47d4daa",
  measurementId: "G-L85488H8H5"
};

/* INIT */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

/* ELEMENTS */

const loginBox = document.getElementById("loginBox");

const dashboard = document.getElementById("dashboard");

const userEmail = document.getElementById("userEmail");

/* REGISTER */

window.register = async function () {

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  try {

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Registration successful!");

  } catch (error) {

    alert(error.message);

  }

};

/* LOGIN */

window.login = async function () {

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  } catch (error) {

    alert(error.message);

  }

};

/* LOGOUT */

window.logout = async function () {

  await signOut(auth);

};

/* AUTH STATE */

onAuthStateChanged(auth, (user) => {

  if (user) {

    loginBox.classList.add("hidden");

    dashboard.classList.remove("hidden");

    userEmail.innerText = user.email;

  } else {

    loginBox.classList.remove("hidden");

    dashboard.classList.add("hidden");

  }

});

/* SUPPORT TICKET */

window.submitTicket = async function () {

  const message =
    document.getElementById("ticketMessage").value;

  const user = auth.currentUser;

  if (!message) {

    alert("Please enter a message.");

    return;

  }

  try {

    await addDoc(
      collection(db, "supportTickets"),
      {
        email: user.email,
        message: message,
        created: new Date()
      }
    );

    alert("Support ticket submitted!");

    document.getElementById("ticketMessage").value = "";

  } catch (error) {

    alert(error.message);

  }

};
