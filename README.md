
# VTLabs Corporate Website 

A modern, production-ready corporate website for VTLabs featuring a training center, project showcase, student projects, VTL Craft portfolio, and a secure admin dashboard. Built with React, TypeScript, Tailwind CSS, Node.js, and MySQL.

## 🌟 Features

- **Training Programs** - Browse and apply to training courses
- **Projects Showcase** - View company R&D projects with threaded updates
- **Student Projects** - Display student work with media galleries and external links
- **VTL Craft Portfolio** - Interior design and creative work showcase
- **Admin Dashboard** - Secure management panel for content creation and updates
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Threading System** - Support for multi-part updates with media (images/videos)

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v5.7 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/vt-2.0.git
cd vt-2.0
```

### 2. Install Dependencies

**⚠️ Note:** The `node_modules` directory is not included in the repository. You need to install dependencies locally.

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Database Setup

#### Step 1: Create the Database

Open MySQL and run:

```sql
CREATE DATABASE vtlabs_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### Step 2: Load the Schema

Import the database schema:

```bash
# Using MySQL command line
mysql -u root -p vtlabs_db < backend/schema.sql

# Or manually:
# 1. Open MySQL Workbench or your MySQL client
# 2. Open backend/schema.sql
# 3. Execute the entire file
```

### 4. Configure Environment Variables

Create a file `backend/.env` with your database credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=vtlabs_db
PORT=3001
```

Replace:
- `your_mysql_password` - Your MySQL root password

### 5. Start the Application

Open **two separate terminal windows**:

#### Terminal 1 - Backend Server

```bash
cd backend
npm run dev
```

You should see: `Server running on http://localhost:3001`

#### Terminal 2 - Frontend Development Server

```bash
npm run dev
```

The app will open automatically at `http://localhost:5173`

## 🔐 Admin Dashboard Access

### Default Credentials

- **Email:** `admin@vtlabs.com`
- **Password:** `#Vchris@2010`

> ⚠️ **SECURITY WARNING:** Change these credentials immediately after first login!

### Admin Features

- **Posts Management** - Create/edit/delete announcements
- **Training Programs** - Manage courses with threaded updates
- **Projects** - Showcase company projects
- **Student Projects** - Upload and manage student work
- **VTL Craft** - Interior design portfolio
- **Applications** - View training applications

## 📁 Project Structure

```
vt-2.0/
├── backend/
│   ├── routes/
│   │   ├── api.js              # Main API routes
│   │   └── auth.js             # Authentication routes
│   ├── db.js                   # Database connection
│   ├── server.js               # Express server setup
│   ├── schema.sql              # Database schema (run this!)
│   ├── package.json
│   ├── .env                    # Create this file
│   └── .gitignore
├── components/
│   ├── StudentProjectAdminPanel.tsx
│   ├── Header.tsx
│   ├── Layout.tsx
│   └── ... (other components)
├── pages/
│   ├── StudentProjectDetailsPage.tsx
│   ├── HomePage.tsx
│   └── ... (other pages)
├── services/
│   └── api.ts                  # API service layer
├── contexts/
│   └── AuthContext.tsx         # Authentication context
├── public/
│   ├── logo.svg
│   ├── favicon.svg
│   └── logo-full.svg
├── App.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── .env.example                # Example environment variables
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI Framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router DOM** - Navigation
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MySQL 2** - Database driver
- **Bcrypt** - Password hashing
- **UUID** - Unique identifiers
- **CORS** - Cross-origin support

## 📦 Build for Production

### Frontend Build

```bash
npm run build
npm run preview
```

### Backend Deployment

```bash
cd backend
npm install --production
npm start
```

## 🐛 Troubleshooting

### Error: "Failed to connect to database"

**Solution:**
1. Ensure MySQL is running
2. Check credentials in `backend/.env`
3. Verify database `vtlabs_db` exists
4. Run: `mysql -u root -p vtlabs_db < backend/schema.sql`

### Error: "Backend not available"

**Solution:**
1. Make sure backend is running: `npm run dev` from `backend/` folder
2. Check that port 3001 is free
3. Verify MySQL connection

### Error: Port 3001 or 5173 already in use

**Solution:**
```bash
# Change backend port in backend/.env
PORT=3002

# Change frontend port in vite.config.ts
```

### Files Too Large on Upload

- Maximum file size: **10MB**
- Keep original files under 7.5MB (base64 encoding increases size)

## 📝 Important Notes

### About node_modules

- **NOT included** in the repository (saved in `.gitignore`)
- Run `npm install` after cloning
- Do this for both root and `backend/` directories

### Database

- Use the included `backend/schema.sql` file
- Database name must be: `vtlabs_db`


