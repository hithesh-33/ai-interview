import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Firebase config (your existing one)
const firebaseConfig = {
apiKey: "AIzaSyBnDGk8aM_TTN3jgGJv1GgYFVXSyX3Ei2I",
    authDomain: "new-app-faeb5.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elements
const btn = document.querySelector(".login_btn");
const message = document.querySelector(".messege_box");
const toggle = document.getElementById("toggleMode");
const title = document.querySelector(".login_title");

const googleBtn = document.getElementById("googleSignInBtn");
const provider = new GoogleAuthProvider();

// Mode
let isLogin = true;

// 🔁 Toggle Login / Signup
toggle.addEventListener("click", (e) => {
  e.preventDefault();

  isLogin = !isLogin;

  if (isLogin) {
    title.textContent = "Login";
    btn.textContent = "Login";
    toggle.textContent = "Register";
    message.textContent = "";
  } else {
    title.textContent = "Sign Up";
    btn.textContent = "Sign Up";
    toggle.textContent = "Login";
    message.textContent = "";
  }
});

// 🔐 Login / Signup Button
btn.addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (isLogin) {
    // LOGIN
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        message.textContent = "Login successful!";
        message.className = "messege_box created";
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        message.className = "messege_box error";

        if (error.code === "auth/user-not-found") {
          message.textContent = "User not found!";
        } else if (error.code === "auth/wrong-password") {
          message.textContent = "Wrong password!";
        } else {
          message.textContent = error.message;
        }
      });

  } else {
    // SIGNUP
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        message.textContent = "Account created!";
        message.className = "messege_box created";
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        message.className = "messege_box error";

        if (error.code === "auth/email-already-in-use") {
          message.textContent = "Email already registered!";
        } else if (error.code === "auth/weak-password") {
          message.textContent = "Password must be at least 6 characters!";
        } else {
          message.textContent = error.message;
        }
      });
  }
});

// 🌐 Google Sign-In
googleBtn.addEventListener("click", (e) => {
  e.preventDefault();

  signInWithPopup(auth, provider)
    .then(() => {
      message.textContent = "Google login successful!";
      message.className = "messege_box created";
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      message.className = "messege_box error";
      message.textContent = error.message;
    });
});