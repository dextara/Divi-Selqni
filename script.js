// ===== STAR BACKGROUND =====
const canvas = document.getElementById('canvas-stars');
const ctx = canvas.getContext('2d');
let particles = [];

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random();
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        ctx.fillStyle = `rgba(88,101,242,${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', initCanvas);
initCanvas();
createParticles();
animate();


// ===== MODALS =====
const modalData = {
    shop: `<h2>МАГАЗИН</h2><p>Soon...</p>`,
    rules: `<h2>ПРАВИЛА</h2><p>Soon...</p>`,
    links: `<h2>ВРЪЗКИ</h2><p>Soon...</p>`
};

function openModal(type) {
    document.getElementById('modal-body').innerHTML = modalData[type];
    document.getElementById('modal-overlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
}


// ===== AUTH SYSTEM =====
function openAuth() {
    document.getElementById('modal-body').innerHTML = `
        <h2>LOGIN / REGISTER</h2>
        <input id="email" placeholder="Email">
        <input id="password" type="password" placeholder="Password">
        <input id="username" placeholder="Username (register only)">
        <button onclick="register()">Register</button>
        <button onclick="login()">Login</button>
    `;
    document.getElementById('modal-overlay').style.display = 'flex';
}

async function register() {
    const email = emailInput();
    const password = passwordInput();
    const username = usernameInput();

    try {
        const userCredential = await window.createUserWithEmailAndPassword(window.auth, email, password);
        const user = userCredential.user;

        await window.setDoc(window.doc(window.db, "users", user.uid), {
            username,
            email,
            createdAt: new Date()
        });

        showProfile(user.uid);
    } catch (error) {
        alert(error.message);
    }
}

async function login() {
    const email = emailInput();
    const password = passwordInput();

    try {
        const userCredential = await window.signInWithEmailAndPassword(window.auth, email, password);
        showProfile(userCredential.user.uid);
    } catch (error) {
        alert(error.message);
    }
}

async function showProfile(uid) {
    const docRef = window.doc(window.db, "users", uid);
    const docSnap = await window.getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        document.getElementById('modal-body').innerHTML = `
            <h2>PROFILE</h2>
            <p><strong>Username:</strong> ${data.username}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <button onclick="logout()">Logout</button>
        `;
    }
}

function logout() {
    window.signOut(window.auth);
    closeModal();
}


// Helpers
function emailInput() { return document.getElementById('email').value; }
function passwordInput() { return document.getElementById('password').value; }
function usernameInput() { return document.getElementById('username').value; }
