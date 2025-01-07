# Book Bazar 📚

**Book Bazar** is a MERN stack project that allows users to sell and purchase books. It includes a Rasa chatbot for providing support and assistance.

## Features

- User authentication (Login/Signup)
- List and purchase books
- Integrated Rasa chatbot for real-time user support
- Responsive design
- Secure backend with JWT authentication

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Chatbot:** Rasa

## Installation

### Prerequisites

- Node.js (v16+)
- MongoDB Atlas account
- Rasa setup locally

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/bookbazar.git
   cd bookbazar
   ```

2. **Backend setup:**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend setup:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables:**
   - Create a `.env` file in the `backend` directory and add:
     ```env
     PORT=2000
     MONGO_URI=your-mongodb-uri
     JWT_SECRET=your-jwt-secret
     ```

5. **Run the application:**
   - Start the backend:
     ```bash
     cd backend
     npm run dev
     ```
   - Start the frontend:
     ```bash
     cd ../frontend
     npm start
     ```

6. **Run the Rasa chatbot:**
   ```bash
   rasa run
   rasa run actions
   ```

7. Open `http://localhost:3000` in your browser.

## Folder Structure

```plaintext
bookbazar/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── public/
├── chatbot/
│   ├── actions/
│   ├── data/
│   ├── config.yml
│   └── domain.yml
├── README.md
└── package.json
```

## License

This project is licensed under the MIT License.
