import { auth, db } from "./firebase.js";
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
    doc,
    getDoc,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const container = document.getElementById("admin-container");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const userSnap = await getDoc(doc(db, "users", user.uid));

    if (!userSnap.exists() || userSnap.data().role !== "admin") {
        container.innerHTML = "<h2>⛔ Нямаш достъп.</h2>";
        return;
    }

    // Зареждаме всички потребители
    const usersSnap = await getDocs(collection(db, "users"));

    let usersHTML = "";

    usersSnap.forEach(doc => {
        const data = doc.data();
        usersHTML += `
            <div class="profile-card">
                <p><strong>${data.username}</strong></p>
                <p>${data.email}</p>
                <p>Role: ${data.role}</p>
            </div>
        `;
    });

    container.innerHTML = `
        <h1>👑 ADMIN PANEL</h1>
        ${usersHTML}
    `;

});

const ordersSnap = await getDocs(collection(db, "orders"));

let ordersHTML = "<h2>🛒 Orders</h2>";

ordersSnap.forEach(doc => {
    const data = doc.data();
    ordersHTML += `
        <div class="profile-card">
            <p>User: ${data.userId}</p>
            <p>Amount: $${data.amount}</p>
            <p>Status: ${data.status}</p>
        </div>
    `;
});
