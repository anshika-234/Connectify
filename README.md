# 🔗 Connectify

> A full-stack social networking app — connect with people, share posts, chat in real-time, and grow your network.

---

## 📌 Table of Contents

- [Description](#-description)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Configuration](#-configuration)
- [API Endpoints](#-api-endpoints)
- [License](#-license)
- [Contact](#-contact)

---

## 📖 Description

**Connectify** is a full-stack social networking platform where users can create profiles, share posts, connect with others, and chat in real-time using WebSockets.

### What problem does it solve?

Connectify brings professionals and communities together — giving users a single platform to share updates, build connections, and communicate instantly.

### Who is this for?

- Developers learning full-stack development with real-world social features
- Anyone who wants to understand how social networking apps are built
- Built as a comprehensive **full-stack portfolio showcase**

### Key Features

- 🔐 Secure authentication with JWT & Bcrypt
- 💬 Real-time chat powered by Socket.io
- 🤝 Connection request system (send, accept, reject)
- 📝 Post feed with likes, comments & media upload

---

## ✨ Features

| Feature            | Description                                          |
| ------------------ | ---------------------------------------------------- |
| 🔐 Authentication  | Secure Login/Signup with JWT & Bcrypt                |
| 👤 Profile         | Create & update profile with photo, education & work |
| 📝 Posts           | Create, view, delete posts with image/video upload   |
| ❤️ Likes           | Like/Unlike posts                                    |
| 💬 Comments        | Add & delete comments on posts                       |
| 🤝 Connections     | Send, accept, reject connection requests             |
| 💌 Real-time Chat  | Instant messaging with Socket.io                     |
| 🔍 Search          | Search users by name or username                     |
| 📄 Resume Download | Download profile as PDF                              |
| 📱 Responsive      | Mobile-friendly UI                                   |

---

## 🛠️ Tech Stack

### Frontend

| Tech             | Use                   |
| ---------------- | --------------------- |
| React.js (Vite)  | UI Framework          |
| React Router v6  | Client-side routing   |
| Context API      | Auth state management |
| Socket.io-client | Real-time chat        |
| Axios            | API calls             |

### Backend

| Tech                 | Use                   |
| -------------------- | --------------------- |
| Node.js + Express.js | Server & REST APIs    |
| MongoDB              | Database              |
| Mongoose             | ODM                   |
| JWT + Bcrypt         | Authentication        |
| Socket.io            | Real-time WebSockets  |
| Multer               | Image/file uploads    |
| PDFKit               | Resume PDF generation |

---

## 📁 Project Structure

```
📦 Connectify/
│
├── 📂 frontend/                        # React frontend (Vite)
│   └── src/
│       ├── authentication/
│       │   ├── Login.jsx               # Login page
│       │   └── Signup.jsx              # Signup page
│       ├── home/
│       │   ├── navbar/
│       │   │   ├── Sidebar.jsx         # Left sidebar
│       │   │   └── Discover.jsx        # Discover users
│       │   ├── posts/
│       │   │   ├── CreatePost.jsx      # Create new post
│       │   │   └── Scroll.jsx          # Posts feed
│       │   └── topConnection/
│       │       └── TopConnection.jsx   # Top connections widget
│       ├── chat/
│       │   ├── Chat.jsx                # Chat page + Socket.io
│       │   ├── ChatList.jsx            # Chat list sidebar
│       │   └── ChatWindow.jsx          # Chat window (real-time)
│       ├── comment/
│       │   ├── CreateComment.jsx       # Add comment
│       │   └── ShowComment.jsx         # Show comments
│       ├── profile/
│       │   ├── Profile.jsx             # My profile page
│       │   ├── ProfileHeader.jsx       # Profile header
│       │   ├── ProfilePost.jsx         # User posts on profile
│       │   ├── EducationSection.jsx    # Education info
│       │   └── WorkSection.jsx         # Work experience
│       ├── pages/
│       │   ├── Dashboard.jsx           # Main dashboard
│       │   └── MyConnection.jsx        # My connections page
│       ├── request/
│       │   └── ShowRequest.jsx         # Connection requests
│       ├── showProfile/
│       │   └── ShowProfile.jsx         # View other user profiles
│       ├── singlePost/
│       │   └── SinglePost.jsx          # Single post view
│       ├── shareModel/
│       │   └── ShareModel.jsx          # Share post modal
│       ├── context/
│       │   └── AuthContext.jsx         # Global auth state
│       ├── hook/
│       │   └── useProfile.jsx          # Custom profile hook
│       └── utils/
│           └── helper.js               # Helper functions
│
└── 📂 backend/                         # REST API + Socket.io server
    ├── controller/
    │   ├── user.controller.js          # Auth, profile, connections
    │   ├── post.controller.js          # Posts, likes, comments
    │   ├── comment.controller.js       # Comment CRUD
    │   └── chat.controller.js          # Real-time chat
    ├── model/
    │   ├── user.model.js
    │   ├── post.model.js
    │   ├── comment.model.js
    │   ├── chat.model.js
    │   ├── connections.model.js
    │   └── profile.model.js
    ├── routes/
    │   ├── user.routes.js
    │   ├── post.routes.js
    │   ├── comment.routes.js
    │   └── chat.router.js
    ├── middleware/
    │   └── middleware.js               # JWT auth middleware
    ├── uploads/                        # Uploaded media files
    └── index.js                        # Entry point + Socket.io
```

---

## ⚙️ Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/anshika-234/connectify.git
cd Connectify
```

### 2. Backend Setup

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev
# API + Socket.io running at http://localhost:8080
```

### 3. Frontend Setup

```bash
# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
# App running at http://localhost:5173
```

### 4. Verify Everything Works

| Service     | URL                   |
| ----------- | --------------------- |
| Frontend    | http://localhost:5173 |
| Backend API | http://localhost:8080 |

---

## 🔧 Configuration

```env
PORT=8080
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/connectify
TOKEN_SECRET=your_jwt_secret_here
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:8080
```

---

## 📡 API Endpoints

### Auth / User Routes (`/auth`)

| Method | Endpoint                                            | Description             |
| ------ | --------------------------------------------------- | ----------------------- |
| POST   | `/auth/signup`                                      | Register new user       |
| POST   | `/auth/login`                                       | Login user              |
| POST   | `/auth/logout`                                      | Logout user             |
| GET    | `/auth/me`                                          | Get current user        |
| POST   | `/auth/update-profile`                              | Upload profile photo    |
| POST   | `/auth/user_update`                                 | Update email/username   |
| GET    | `/auth/get_user_and_profile`                        | Get user with profile   |
| POST   | `/auth/update_profile_data`                         | Update profile data     |
| PATCH  | `/auth/edit_profile_data`                           | Edit education/work     |
| GET    | `/auth/get_all_users`                               | Get all users           |
| GET    | `/auth/user/find-user`                              | Search users            |
| GET    | `/auth/user/download_resume`                        | Download profile as PDF |
| POST   | `/auth/user/send_connection_request/:receiverId`    | Send connection request |
| POST   | `/auth/user/response_to_pending_request/:requestId` | Accept/Reject request   |
| GET    | `/auth/user/see_all_request`                        | See pending requests    |
| GET    | `/auth/user/see_all_connections`                    | See all connections     |
| GET    | `/auth/:userId/profile`                             | Get other user profile  |

### Post Routes (`/post`)

| Method | Endpoint                    | Description                  |
| ------ | --------------------------- | ---------------------------- |
| POST   | `/post/post`                | Create new post (with media) |
| GET    | `/post/get_all_post`        | Get all posts                |
| GET    | `/post/get_single_post/:id` | Get single post              |
| GET    | `/post/get_my_posts`        | Get my posts                 |
| POST   | `/post/delete_post/:postId` | Delete a post                |
| POST   | `/post/like_post/:postId`   | Like/Unlike a post           |

### Comment Routes (`/comments`)

| Method | Endpoint                           | Description      |
| ------ | ---------------------------------- | ---------------- |
| POST   | `/comments/create-comment/:postId` | Add comment      |
| GET    | `/comments/all-comments/:postId`   | Get all comments |
| GET    | `/comments/delete-comment/:postId` | Delete a comment |

### Chat Routes (`/chats`)

| Method | Endpoint                          | Description           |
| ------ | --------------------------------- | --------------------- |
| POST   | `/chats/message/send/:receiverId` | Send a message        |
| GET    | `/chats/message/:roomId`          | Get messages by room  |
| GET    | `/chats/conversations`            | Get all conversations |

### 🔌 Socket.io Events

| Event             | Direction       | Description       |
| ----------------- | --------------- | ----------------- |
| `join_room`       | Client → Server | Join a chat room  |
| `send_message`    | Client → Server | Send a message    |
| `receive_message` | Server → Client | Receive a message |

---

## 🔮 Future Improvements

- [ ] Responsive design
- [ ] Notifications system
- [ ] Post sharing feature
- [ ] Online/Offline status
- [ ] Deploy on Vercel + Render

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📬 Contact

**Anshika Gupta**

- 🐙 GitHub: [@anshika-234](https://github.com/anshika-234)
- 💼 LinkedIn: [Anshika Gupta](https://www.linkedin.com/in/anshika-gupta-1495192a5)
- 📧 Email: rimigupta123456@gmail.com
