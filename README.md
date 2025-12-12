# 🎟️ Ticket Booking System – Modex

A full-stack ticket booking application that allows users to view available seats, select them, and book a maximum of **8 seats per transaction**.  
Includes a clean frontend UI, a Node.js + Express backend, and PostgreSQL for data storage.

---

## 📦 Tech Stack

### **Frontend**
- HTML, CSS, JavaScript  
*(Update to React if your project uses it)*

### **Backend**
- Node.js  
- Express.js  
- PostgreSQL (via `pg` npm library)

### **Other Tools**
- Postman (API testing)
- GitHub (code hosting)

---

## 🚀 Setup Instructions
- cd Backend
- npm install
- npm run dev

(on a second terminal)
- cd Frontend
- npm install
- npm run dev

## Assumptions Made 
- Users cannot book more than 8 seats at once.
- Seat layout is static unless extended.
- PostgreSQL is running locally and correctly connected.
- No authentication system is implemented.
- Backend runs on localhost:5000.
- Frontend and backend communicate directly without tokens.
- Single screen/theatre implementation.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Sdkrsn/Ticket_Book_Modex.git
cd Ticket_Book_Modex

