import { auth, db } from "./firebase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.register = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;

    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCred.user.uid), {
        username,
        email,
        role: "user",
        createdAt: new Date()
    });


    window.location.href = "index.html";
};

window.login = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "index.html";
};

window.goHome = () => {
    window.location.href = "index.html";
};

window.logout = async () => {
    await signOut(auth);
    window.location.href = "index.html";
};

// Функция за проверка на аутентикация и обновяване на UI
window.checkAuth = () => {
    onAuthStateChanged(auth, (user) => {
        const authButton = document.getElementById("auth-button");
        if (authButton) {
            if (user) {
                authButton.textContent = "👤 Dashboard";
                authButton.onclick = () => window.location.href = "dashboard.html";
            } else {
                authButton.textContent = "👤 Login";
                authButton.onclick = () => window.location.href = "login.html";
            }
        }
    });
};

// Автоматично извикване при зареждане на страницата
window.addEventListener('DOMContentLoaded', checkAuth);
