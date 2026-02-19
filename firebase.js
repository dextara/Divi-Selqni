import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
    getAuth 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { 
    getFirestore 
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

export const auth = getAuth(app);
export const db = getFirestore(app);
