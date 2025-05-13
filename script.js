// Enhanced ATM Data
const atms = [
    {
        id: 1,
        name: "City Center ATM",
        bank: "National Bank of Egypt",
        lat: 24.0889,
        lng: 32.8998,
        status: "Available",
        queue: 2,
        features: ["deposit", "foreign-exchange", "cardless"],
        rating: 4.5,
        waitTime: 5, // minutes per person
        capacity: "High", // ATM capacity: High, Medium, Low
        currencies: ["USD", "EUR", "GBP"], // Supported currencies
        limits: { withdrawal: 5000, deposit: 10000 }, // Withdrawal and deposit limits
        reviews: [
            { user: "John", rating: 5, comment: "Great service!" },
            { user: "Alice", rating: 4, comment: "Fast and reliable." }
        ],
        transactions: [
            { id: "tx1", amount: 500, currency: "USD", timestamp: "2023-10-01T12:00:00Z" },
            { id: "tx2", amount: 1000, currency: "EGP", timestamp: "2023-10-02T14:30:00Z" }
        ]
    },
    {
        id: 2,
        name: "Nile View ATM",
        bank: "Banque Misr",
        lat: 24.0900,
        lng: 32.8992,
        

        status: "Maintenance",
        queue: 0,
        features: ["deposit", "accessible"],
        rating: 3.8,
        waitTime: 0,
        capacity: "Medium",
        currencies: ["USD", "EGP"],
        limits: { withdrawal: 3000, deposit: 5000 },
        reviews: [
            { user: "Bob", rating: 3, comment: "Long queue but good service." }
        ],
        transactions: []
    },
    {
        id: 3,
        name: "Railway Station ATM",
        bank: "QNB Alahli",
        lat: 24.0930,
        lng: 32.8965,
        status: "Available",
        queue: 1,
        features: ["foreign-exchange", "cardless"],
        rating: 4.2,
        waitTime: 6,
        capacity: "High",
        currencies: ["USD", "EUR"],
        limits: { withdrawal: 4000, deposit: 8000 },
        reviews: [],
        transactions: []
    },
    {
        id: 4,
        name: "University ATM",
        bank: "Commercial International Bank",
        lat: 24.0950,
        lng: 32.8900,
        status: "Available",
        queue: 3,
        features: ["deposit", "foreign-exchange"],
        rating: 4.0,
        waitTime: 5,
        capacity: "Low",
        currencies: ["USD", "EGP"],
        limits: { withdrawal: 2000, deposit: 4000 },
        reviews: [],
        transactions: []
    },
    {
        id: 5,
        name: "Public Library ATM",
        bank: "Arab African International Bank",
        lat: 24.0850,
        lng: 32.8950,
        status: "In Use",
        queue: 4,
        features: ["deposit", "accessible"],
        rating: 3.5,
        waitTime: 7,
        capacity: "Medium",
        currencies: ["USD", "EGP"],
        limits: { withdrawal: 2500, deposit: 5000 },
        reviews: [],
        transactions: []
    }
];

const atmMap = new Map();
atms.forEach(atm => atmMap.set(atm.id, atm));

// Initialize Map
let map;
function initializeMap() {
    // Remove previous map instance if it exists
    if (map) {
        map.remove();
    }
    map = L.map('map').setView([24.0889, 32.8998], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    renderATMs();
}

// Bank theme data
const bankThemes = {
    'National Bank of Egypt': {
        color: '#007236',
        logo: 'images/nbe.png'
    },
    'Banque Misr': {
        color: '#b48a3c',
        logo: 'images/banque_misr.png'
    },
    'QNB Alahli': {
        color: '#3a206d',
        logo: 'images/qnb.png'
    },
    'Commercial International Bank': {
        color: '#005baa',
        logo: 'images/cib.png'
    },
    'Arab African International Bank': {
        color: '#bfa046',
        logo: 'images/aai.png'
    }
};

// Render ATMs
const renderATMs = () => {
    const atmList = document.getElementById('atm-list');
    atmList.innerHTML = "";

    atms.forEach(atm => {
        // Map Marker
        L.marker([atm.lat, atm.lng])
            .addTo(map)
            .bindPopup(`
            <b>${atm.bank}</b><br>
            ${atm.name}<br>
            Rating: ${atm.rating} ⭐<br>
            Wait Time: ${atm.status === "Maintenance" ? "Under Maintenance" : atm.waitTime} mins<br>
            Capacity: ${atm.capacity}<br>
            Currencies: ${atm.currencies.join(', ')}
          `);

        // Get bank theme
        const theme = bankThemes[atm.bank] || { color: '#4299e1', logo: '' };

        // Card Element
        const card = document.createElement('div');
        card.className = 'atm-card';
        card.style.borderTop = `6px solid ${theme.color}`;
        card.innerHTML = `
          <div class="bank-header" style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.5rem;">
            <div class="bank-logo-container"><img src="${theme.logo}" alt="${atm.bank} logo" onerror="this.style.display='none';"></div>
            <div class="bank-name" style="font-weight:600;color:${theme.color};font-size:1.1rem;">${atm.bank}</div>
          </div>
          <h3>${atm.name}</h3>
          <div class="queue-info">
            <span>👥 ${atm.status === "Maintenance" ? "Under Maintenance" : `${atm.queue} people in queue`}</span>
            <span>⏱ ${atm.status === "Maintenance" ? "0 mins wait" : `${atm.waitTime} mins wait`}</span>
          </div>
          <div class="features">
            ${atm.features.map(feature => `
              <div class="feature-tag">${feature === "deposit" ? "💳 Deposit" :
            feature === "foreign-exchange" ? "💱 Foreign Exchange" :
                feature === "cardless" ? "📱 Cardless" :
                    feature === "accessible" ? "♿ Accessible" : ""}</div>
            `).join('')}
          </div>
          <div class="status ${atm.status.toLowerCase()}">
            ${atm.status}
          </div>
          <div class="capacity">
            <strong>Capacity:</strong> ${atm.capacity}
          </div>
          <div class="currencies">
            <strong>Currencies:</strong> ${atm.currencies.join(', ')}
          </div>
          <div class="limits">
            <strong>Limits:</strong> Withdrawal: ${atm.limits.withdrawal} ${atm.currencies[0]}, Deposit: ${atm.limits.deposit} ${atm.currencies[0]}
          </div>
          <div class="button-group">
            <button
              class="reserve-btn"
              ${atm.status !== "Available" ? 'disabled' : ''}
              onclick="reserveATM(${atm.id})"
            >
              Reserve
            </button>
            <button
              class="navigate-btn"
              onclick="navigateTo(${atm.lat}, ${atm.lng})"
            >
              Directions
            </button>
            <button
              class="alert-btn"
              onclick="setATMAlert(${atm.id})"
            >
              Set Alert
            </button>
          </div>
        `;
        atmList.appendChild(card);
    });
};

// Reserve ATM
function reserveATM(atmId) {
    const atm = atmMap.get(atmId);
    if (atm && atm.status === 'Available') {
        atm.queue++;
        if (atm.queue >= 5) atm.status = 'In Use';
        renderATMs();
        alert(`Reserved spot in queue at ${atm.name}! Current position: #${atm.queue}`);

        // Generate QR code with reservation info
        const username = localStorage.getItem('username') || 'Guest';
        const reservationInfo = JSON.stringify({
            atmName: atm.name,
            bank: atm.bank,
            user: username,
            queue: atm.queue,
            timestamp: new Date().toISOString()
        });
        showQRCodeModal(reservationInfo);

        // Automatically open Google Maps directions
        navigateTo(atm.lat, atm.lng);
    }
}

function showQRCodeModal(data) {
    // Clear previous QR code
    const qrDiv = document.getElementById('qrcode');
    qrDiv.innerHTML = '';
    // Generate new QR code
    new QRCode(qrDiv, {
        text: data,
        width: 200,
        height: 200,
        colorDark: '#2b6cb0',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    openModal('qr-modal');
}

function downloadQRCode() {
    const qrDiv = document.getElementById('qrcode');
    const img = qrDiv.querySelector('img');
    if (img) {
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'atm_reservation_qr.png';
        link.click();
    } else {
        // fallback for canvas
        const canvas = qrDiv.querySelector('canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'atm_reservation_qr.png';
            link.click();
        }
    }
}

// Navigate to ATM
function navigateTo(lat, lng) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);
}

// ATM Alerts via Email
function setATMAlert(atmId) {
    const atm = atmMap.get(atmId);
    if (atm) {
        const email = prompt("Please enter your email address to receive alerts:");
        if (email) {
            alert(`Alert set for ${atm.name}. You will receive an email at ${email} when the queue is short or the ATM is available.`);
            // Simulate email notification
            setTimeout(() => {
                if (atm.queue <= 2) {
                    alert(`Email sent to ${email}: ${atm.name} has a short queue (${atm.queue} people).`);
                }
            }, 5000); // Simulate a delay
        }
    }
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Show Sign Up Form
function showSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

// Show Login Form
function showLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

// Authentication Functions
const users = [];

// Validation Functions
function validateUsername() {
    const username = document.getElementById('signup-username').value;
    const errorElement = document.getElementById('username-error');
    let valid = true;
    if (username.length < 3) {
        errorElement.textContent = 'Username must be at least 3 characters long';
        valid = false;
    } else if (username.length > 20) {
        errorElement.textContent = 'Username must be less than 20 characters';
        valid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errorElement.textContent = 'Username can only contain letters, numbers, and underscores';
        valid = false;
    } else {
        errorElement.textContent = '';
    }
    checkFormValidity();
    return valid;
}

function validateEmail() {
    const email = document.getElementById('signup-email').value;
    const errorElement = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;
    if (!email) {
        errorElement.textContent = 'Email is required';
        valid = false;
    } else if (!emailRegex.test(email)) {
        errorElement.textContent = 'Please enter a valid email address';
        valid = false;
    } else {
        errorElement.textContent = '';
    }
    checkFormValidity();
    return valid;
}

function validatePassword() {
    const password = document.getElementById('signup-password').value;
    const errorElement = document.getElementById('password-error');
    const strengthBar = document.getElementById('strength-meter-bar');
    const strengthText = document.getElementById('strength-text');
    const signupButton = document.getElementById('signup-button');

    strengthBar.classList.remove('weak', 'medium', 'strong');
    strengthText.className = '';

    let valid = true;
    if (!password) {
        errorElement.textContent = 'Password is required';
        strengthBar.style.width = '0%';
        strengthText.textContent = 'Password strength';
        valid = false;
    } else {
        // Calculate password strength
        let strength = 0;
        let feedback = [];
        if (password.length >= 8) strength += 1;
        else feedback.push('At least 8 characters');
        if (/[A-Z]/.test(password)) strength += 1;
        else feedback.push('One uppercase letter');
        if (/[a-z]/.test(password)) strength += 1;
        else feedback.push('One lowercase letter');
        if (/[0-9]/.test(password)) strength += 1;
        else feedback.push('One number');
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        else feedback.push('One special character');
        const strengthPercentage = (strength / 5) * 100;
        strengthBar.style.width = strengthPercentage + '%';
        if (strength <= 2) {
            strengthBar.classList.add('weak');
            strengthText.textContent = 'Weak';
            errorElement.textContent = feedback.join(', ');
            valid = false;
        } else if (strength <= 4) {
            strengthBar.classList.add('medium');
            strengthText.textContent = 'Good';
            errorElement.textContent = feedback.join(', ');
            valid = false;
        } else {
            strengthBar.classList.add('strong');
            strengthText.textContent = 'Strong';
            errorElement.textContent = '';
        }
    }
    checkFormValidity();
    return valid;
}

function checkFormValidity() {
    const signupButton = document.getElementById('signup-button');
    const isUsernameValid = document.getElementById('username-error').textContent === '';
    const isEmailValid = document.getElementById('email-error').textContent === '';
    const isPasswordValid = document.getElementById('password-error').textContent === '' && document.getElementById('strength-text').textContent === 'Strong';
    signupButton.disabled = !(isUsernameValid && isEmailValid && isPasswordValid);
}

let connectedBank = null;

async function authorizeBank() {
    const select = document.getElementById('bank-select');
    const bank = select.value;
    const accountNumber = document.getElementById('bank-account-number').value.trim();
    if (!bank) {
        alert('Please select a bank.');
        return;
    }
    if (!accountNumber || !/^[0-9]{8,20}$/.test(accountNumber)) {
        alert('Please enter a valid account number (8-20 digits).');
        return;
    }
    // Hash the account number
    const hashedAccount = await hashString(accountNumber);
    connectedBank = bank;
    localStorage.setItem('connectedBank', bank);
    localStorage.setItem('connectedBankAccount', hashedAccount);
    closeModal('bank-modal');
    alert(`Bank account connected: ${bank}`);
}

// Hashing function using SHA-256
async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Update signUp function to use unique IDs
async function signUp() {
    console.log('SignUp button clicked');
    if (!validateUsername()) {
        console.log('Username validation failed');
        return;
    }
    if (!validateEmail()) {
        console.log('Email validation failed');
        return;
    }
    if (!validatePassword()) {
        console.log('Password validation failed');
        return;
    }
    console.log('All validations passed');

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const bank = localStorage.getItem('connectedBank') || null;
    const bankAccount = localStorage.getItem('connectedBankAccount') || null;
    try {
        const res = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, bank, bankAccount })
        });
        console.log('Request sent');
        const data = await res.json();
        console.log('Response received', data);
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.removeItem('isGuest'); // Ensure guest flag is cleared
            document.getElementById('username').innerText = data.username;
            alert('Account created successfully!');
            showATMFinderPage();
        } else {
            alert(data.message || 'Error creating account');
        }
    } catch (error) {
        console.error('Error connecting to server:', error);
        alert('Error connecting to server. Please try again later.');
    }
}

// Update logIn function to use unique IDs
async function logIn() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const res = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.removeItem('isGuest'); // Ensure guest flag is cleared
            document.getElementById('username').innerText = data.username;
            alert('Logged in successfully!');
            showATMFinderPage();
        } else {
            alert(data.message || 'Invalid credentials');
        }
    } catch (error) {
        console.error('Error connecting to server:', error);
        alert('Error connecting to server. Please try again later.');
    }
}

// Show ATM Finder Page
function showATMFinderPage() {
    document.getElementById('auth-page').style.display = 'none';
    document.getElementById('atm-finder-page').style.display = 'block';
    initializeMap();
    updateDashboardMetrics();
    // Hide bank buttons for guests
    const isGuest = localStorage.getItem('isGuest') === 'true';
    const bankBtns = [
        ...document.querySelectorAll('.quick-actions button')
    ].filter(btn => [
        'Balance', 'Mini Statement', 'More'
    ].includes(btn.textContent.trim()));
    bankBtns.forEach(btn => {
        btn.style.display = isGuest ? 'none' : '';
    });
}

// Continue as Guest
function continueAsGuest() {
    alert('Continuing as guest. Redirecting...');
    localStorage.setItem('isGuest', 'true');
    showATMFinderPage();
}

// Dashboard Functions
function findNearestATM() {
    const nearestATM = atms.reduce((nearest, atm) => {
        return atm.queue < nearest.queue ? atm : nearest;
    }, atms[0]);
    alert(`Nearest ATM: ${nearestATM.name} (${nearestATM.queue} people in queue)`);
}

function viewTransactions() {
    const transactions = atms.flatMap(atm => atm.transactions);
    if (transactions.length > 0) {
        alert(`Recent Transactions:\n${transactions.map(tx => `- ${tx.amount} ${tx.currency} at ${new Date(tx.timestamp).toLocaleString()}`).join('\n')}`);
    } else {
        alert("No recent transactions found.");
    }
}

function setAlert() {
    const email = prompt("Enter your email to set an alert:");
    if (email) {
        alert(`Alert set! You will receive notifications at ${email}.`);
    }
}

function contactSupport() {
    window.location.href = "mailto:support@ultimateatmfinder.com";
}

function logout() {
    alert("Logging out...");
    // Clear user data
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isGuest');
    // Show login page, hide ATM finder
    document.getElementById('atm-finder-page').style.display = 'none';
    document.getElementById('auth-page').style.display = 'block';
    showLogin();
}

// Update Dashboard Metrics
function updateDashboardMetrics() {
    const totalATMs = atms.length;
    const avgWaitTime = atms.reduce((sum, atm) => sum + atm.waitTime, 0) / atms.length;
    const popularATM = atms.reduce((popular, atm) => atm.rating > popular.rating ? atm : atms[0]).name;

    document.getElementById("total-atms").textContent = totalATMs;
    document.getElementById("avg-wait-time").textContent = `${avgWaitTime.toFixed(1)} mins`;
    document.getElementById("popular-atm").textContent = popularATM;
}

// Initialize Dashboard
updateDashboardMetrics();

// Password Generation Functions
function generatePassword() {
    const length = 12; // Length of the generated password
    const charset = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    // Ensure at least one character from each category
    let password = [
        charset.lowercase[Math.floor(Math.random() * charset.lowercase.length)],
        charset.uppercase[Math.floor(Math.random() * charset.uppercase.length)],
        charset.numbers[Math.floor(Math.random() * charset.numbers.length)],
        charset.symbols[Math.floor(Math.random() * charset.symbols.length)]
    ];

    // Fill the rest of the password
    const allChars = charset.lowercase + charset.uppercase + charset.numbers + charset.symbols;
    for (let i = password.length; i < length; i++) {
        password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Shuffle the password
    password = password.sort(() => Math.random() - 0.5).join('');

    // Set the generated password
    const passwordInput = document.getElementById('signup-password');
    passwordInput.value = password;
    
    // Show the copy button
    document.querySelector('.copy-password-btn').style.display = 'flex';
    
    // Trigger validation
    validatePassword();
}

function copyPassword() {
    const passwordInput = document.getElementById('signup-password');
    const copyButton = document.querySelector('.copy-password-btn');
    
    // Copy to clipboard
    navigator.clipboard.writeText(passwordInput.value).then(() => {
        // Visual feedback
        const originalText = copyButton.innerHTML;
        copyButton.innerHTML = '<span>✓</span> Copied!';
        copyButton.classList.add('copied');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            copyButton.innerHTML = originalText;
            copyButton.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy password:', err);
        alert('Failed to copy password. Please try again.');
    });
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('signup-password');
    const icon = document.getElementById('show-password-icon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        icon.textContent = '👁️';
    }
}

function showBalance() {
    const isGuest = localStorage.getItem('isGuest') === 'true';
    if (isGuest) {
        alert('You need to log in first to view your balance.');
        return;
    }
    const bank = localStorage.getItem('connectedBank') || 'Demo Bank';
    // Demo: random balance
    const balance = (Math.random() * 100000).toFixed(2);
    document.getElementById('balance-info').innerHTML = `
      <p><strong>Bank:</strong> ${bank}</p>
      <p><strong>Balance:</strong> EGP ${balance}</p>
    `;
    openModal('balance-modal');
}

function showMiniStatement() {
    const isGuest = localStorage.getItem('isGuest') === 'true';
    if (isGuest) {
        alert('You need to log in first to view your mini statement.');
        return;
    }
    const bank = localStorage.getItem('connectedBank') || 'Demo Bank';
    // Demo: random transactions
    const transactions = [
        { date: '2024-06-01', desc: 'ATM Withdrawal', amount: '-500.00' },
        { date: '2024-05-29', desc: 'POS Purchase', amount: '-1200.00' },
        { date: '2024-05-28', desc: 'Salary', amount: '+15000.00' },
        { date: '2024-05-25', desc: 'Transfer', amount: '+2000.00' },
        { date: '2024-05-20', desc: 'Utility Bill', amount: '-350.00' }
    ];
    document.getElementById('mini-info').innerHTML = `
      <p><strong>Bank:</strong> ${bank}</p>
      <table style="width:100%;margin-top:1rem;text-align:left;">
        <tr><th>Date</th><th>Description</th><th>Amount</th></tr>
        ${transactions.map(t => `<tr><td>${t.date}</td><td>${t.desc}</td><td>${t.amount}</td></tr>`).join('')}
      </table>
    `;
    openModal('mini-modal');
}

function showMoreBankInfo() {
    const isGuest = localStorage.getItem('isGuest') === 'true';
    if (isGuest) {
        alert('You need to log in first to view your account details.');
        return;
    }
    const bank = localStorage.getItem('connectedBank') || 'Demo Bank';
    // Demo: fake account info
    const accountNumber = 'EG' + Math.floor(1000000000000000 + Math.random() * 9000000000000000);
    const branch = 'Main Branch';
    document.getElementById('more-info').innerHTML = `
      <p><strong>Bank:</strong> ${bank}</p>
      <p><strong>Account Number:</strong> ${accountNumber}</p>
      <p><strong>Branch:</strong> ${branch}</p>
      <p><strong>Account Type:</strong> Current</p>
    `;
    openModal('more-modal');
}
