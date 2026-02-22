import { auth, db } from "./firebase.js";
import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const container = document.getElementById("dashboard-container");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const snap = await getDoc(doc(db, "users", user.uid));

    if (!snap.exists()) return;

    const data = snap.data();

    container.innerHTML = `
        <div class="dashboard-welcome">
            <h1>Добре дошъл, ${data.username}!</h1>
            <p>Твоят персонален dashboard.</p>
        </div>
    `;

    const userInfo = document.getElementById("user-info");
    userInfo.innerHTML = `<span onclick="logout()">🚪 Logout</span>`;
    userInfo.classList.add("nav-link");

});
