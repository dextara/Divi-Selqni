import { auth, db } from "./firebase.js";
import { 
    doc,
    setDoc,
    collection 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) return;

    const orderRef = doc(collection(db, "orders"));

    await setDoc(orderRef, {
        userId: user.uid,
        amount: 20, // вземи от Stripe session
        status: "paid",
        createdAt: new Date()
    });

});
