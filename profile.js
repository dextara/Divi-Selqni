import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
    getAuth, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { 
    getFirestore, 
    doc, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDF1AhJjp8mkR14i912l2Yvw-9gatJ-vhE",
    authDomain: "divi-selqni.firebaseapp.com",
    projectId: "divi-selqni",
    storageBucket: "divi-selqni.firebasestorage.app",
    messagingSenderId: "222297927821",
    appId: "1:222297927821:web:59232ddc48c644642f72c4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const profileCard = document.getElementById("profile-card");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            profileCard.innerHTML = `
                <h2>PROFILE</h2>
                <p><strong>Username:</strong> ${data.username}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <button id="logoutBtn">Logout</button>
            `;

            document.getElementById("logoutBtn").addEventListener("click", async () => {
                await signOut(auth);
                window.location.href = "login.html";
            });

        } else {
            profileCard.innerHTML = `<p>No profile data found.</p>`;
        }

    } catch (error) {
        profileCard.innerHTML = `<p>Error loading profile.</p>`;
        console.error(error);
    }

});
