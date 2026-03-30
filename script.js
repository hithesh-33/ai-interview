// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔑 YOUR FIREBASE CONFIG (replace this)
const firebaseConfig = {
  apiKey: "AIzaSyBnDGk8aM_TTN3jgGJv1GgYFVXSyX3Ei2I",
    authDomain: "new-app-faeb5.firebaseapp.com",
    projectId: "new-app-faeb5",
    storageBucket: "new-app-faeb5.firebasestorage.app",
    messagingSenderId: "228503835659",
    appId: "1:228503835659:web:c91d14cf3eaa73bb71e30e",
    measurementId: "G-BJXM7CSVWZ"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 📌 Select elements
const userName = document.querySelector(".profile span");
const logoutBtn = document.querySelector(".logout");

// ✅ Show logged-in user
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Show email or name
    userName.textContent = user.email;
  } else {
    // Not logged in → redirect
    window.location.href = "index.html";
  }
});

// 🚪 Logout functionality
logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("Logged out successfully");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error(error);
    });
});

// Sidebar active menu
const items = document.querySelectorAll(".sidebar ul li");
items.forEach(item => {
  item.addEventListener("click", () => {
    items.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});