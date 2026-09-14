# ThoughtShare

ThoughtShare is a Next.js social platform where users can sign up, post updates (including GIFs), follow other users, and interact with posts through comments, likes, and reposts.

> **Note:** This README was generated from the project's `setup.ps1` scaffolding script, which defines the folder/file structure of the app. Update the sections below (especially screenshots, live demo link, and environment variables) with any app-specific details not captured by the folder structure alone.

---

## Features

- **Authentication** — Sign up, log in, and log out (`/app/api/auth/signup`, `/app/api/auth/login`, `/app/api/auth/logout`)
- **Posts** — Create posts, comment on posts, like posts, and repost (`/app/api/posts/[id]/comment`, `/app/api/posts/[id]/like`, `/app/api/posts/[id]/repost`)
- **Social graph** — Follow other users (`/app/api/users/[username]/follow`)
- **GIF search** — Search and attach GIFs to posts via a dedicated GIF picker component and API route (`/app/api/gif/search`, `components/GifPicker.js`)
- **Feed** — A central feed page aggregating posts (`/app/feed`)
- **User profiles** — Public profile pages per username (`/app/profile/[username]`)
- **Login / Signup pages** — Dedicated auth pages (`/app/login`, `/app/signup`)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Database | MongoDB (`lib/mongodb.js`) |
| Auth | Custom auth helpers (`lib/auth.js`) |
| Models | Mongoose/Model definitions (`models/User.js`, `models/Post.js`) |
| Styling | Global CSS (`app/globals.css`) |
| Language | JavaScript |

---

## Project Structure

```
ThoughtShare/
├── app/
│   ├── login/
│   │   └── page.js
│   ├── signup/
│   │   └── page.js
│   ├── feed/
│   │   └── page.js
│   ├── profile/
│   │   └── [username]/
│   │       └── page.js
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup/
│   │   │   │   └── route.js
│   │   │   ├── login/
│   │   │   │   └── route.js
│   │   │   └── logout/
│   │   │       └── route.js
│   │   ├── posts/
│   │   │   └── [id]/
│   │   │       ├── comment/
│   │   │       ├── like/
│   │   │       └── repost/
│   │   ├── users/
│   │   │   └── [username]/
│   │   │       └── follow/
│   │   └── gif/
│   │       └── search/
│   ├── layout.js
│   ├── page.js
│   └── globals.css
├── lib/
│   ├── mongodb.js
│   └── auth.js
├── models/
│   ├── User.js
│   └── Post.js
├── components/
│   └── GifPicker.js
├── .env.local.example
├── .gitignore
└── setup.ps1
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- PowerShell (only needed if running `setup.ps1` on Windows to scaffold the folder structure)

### 1. Clone the repository

```bash
git clone <your-repo-url> ThoughtShare
cd ThoughtShare
```

### 2. (Optional) Run the setup script

If you're starting from a flat folder of downloaded files, `setup.ps1` will create the Next.js folder structure and move each file into place:

```powershell
# Run from inside the project directory
.\setup.ps1
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Copy the example environment file and fill in your own values:

```bash
cp .env.local.example .env.local
```

Typical variables you'll need:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GIF_API_KEY=your_giphy_or_tenor_api_key
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## API Routes

| Route | Method(s) | Description |
|---|---|---|
| `/api/auth/signup` | POST | Register a new user |
| `/api/auth/login` | POST | Authenticate a user |
| `/api/auth/logout` | POST | End a user session |
| `/api/posts/[id]/comment` | POST | Add a comment to a post |
| `/api/posts/[id]/like` | POST | Like/unlike a post |
| `/api/posts/[id]/repost` | POST | Repost a post |
| `/api/users/[username]/follow` | POST | Follow/unfollow a user |
| `/api/gif/search` | GET | Search for GIFs to attach to a post |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the app for production |
| `npm start` | Start the production server |
| `npm run lint` | Lint the codebase |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m "Add my feature"`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## License

Add your chosen license here (e.g., MIT).
