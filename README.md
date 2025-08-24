# 🎶 VibeVault MVP (Phase 1)

A minimal backend + frontend prototype for a music marketplace where buyers can pay securely using **Paystack**.

## 🚀 Features
- Express.js backend
- Paystack payment init + verification
- 10% commission model (coming in Phase 2)
- Simple frontend form (email + amount)

## 🛠 Setup
1. Clone the repo
2. Install deps: `npm install`
3. Add your Paystack key to `.env`:
   ```
   PAYSTACK_SECRET_KEY=sk_test_xxxxx
   ```
4. Run server: `npm start`
5. Visit `http://localhost:3000`

## 📂 Project Structure
```
vibevault-mvp/
 ├── index.js          # Backend (Express + Paystack)
 ├── package.json      # Dependencies
 ├── README.md         # Docs
 ├── .gitignore        # Ignore node_modules + .env
 └── public/
     ├── index.html    # Simple test UI
     └── script.js     # Frontend logic
```

## 💳 Testing Paystack
Use Paystack's test cards, e.g.:  
```
Card: 4084 0840 8408 4081
Expiry: 12/30
CVV: 123
PIN: 1234
OTP: 123456
```
