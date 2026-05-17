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

/* INITIALIZE */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

/* ELEMENTS */

const loginBox = document.getElementById("loginBox");

const dashboard = document.getElementById("dashboard");

const userEmail = document.getElementById("userEmail");

/* REGISTER */

window.register = async function () {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  try {

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Registration successful!");

  }

  catch (error) {

    if (error.code === "auth/invalid-email") {

      alert("Please enter a valid email.");

    }

    else if (error.code === "auth/weak-password") {

      alert("Password must be at least 6 characters.");

    }

    else if (
      error.code === "auth/email-already-in-use"
    ) {

      alert("Email already registered.");

    }

    else {

      alert(error.message);

    }

  }

};

/* LOGIN */

window.login = async function () {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  }

  catch (error) {

    if (error.code === "auth/invalid-email") {

      alert("Please enter a valid email.");

    }

    else if (
      error.code === "auth/invalid-credential"
    ) {

      alert("Incorrect email or password.");

    }

    else {

      alert(error.message);

    }

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

    /* ADMIN CHECK */

    const adminEmails = [
      "support@eits.it.com",
      "v3nb0i@gmail.com"
    ];

    if (adminEmails.includes(user.email)) {

      const existingAdmin =
        document.getElementById("adminPanel");

      if (!existingAdmin) {

        const adminBox =
          document.createElement("div");

        adminBox.id = "adminPanel";

        adminBox.innerHTML = `

          <div class="dashboard-card">

            <h3>ADMIN PANEL</h3>

            <p>
              You are logged in as administrator.
            </p>

          </div>

        `;

        dashboard.prepend(adminBox);

      }

    }

  }

  else {

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

    alert("Please enter your concern.");

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

    document.getElementById(
      "ticketMessage"
    ).value = "";

  }

  catch (error) {

    alert(error.message);

  }

};
