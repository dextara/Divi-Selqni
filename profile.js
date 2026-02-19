import { auth, db } from "./firebase.js";
import { 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { 
    doc, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const container = document.getElementById("profile-container");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const snap = await getDoc(doc(db, "users", user.uid));

    if (!snap.exists()) {
        container.innerHTML = "<p>Няма намерени данни.</p>";
        return;
    }

    const data = snap.data();

    container.innerHTML = `
        <div class="profile-card">
            <h3>👤 Лична Информация</h3>
            <p><strong>Username:</strong> ${data.username}</p>
            <p><strong>Email:</strong> ${data.email}</p>
        </div>
        <div class="profile-card">
            <button id="logoutBtn">🚪 Logout</button>
        </div>
    `;

    document.getElementById("logoutBtn").onclick = async () => {
        await signOut(auth);
        window.location.href = "login.html";
    };

});
