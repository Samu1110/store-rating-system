
# 📌 Store Rating System

A full-stack web application where users can sign up, log in, and rate stores. Store Owners can manage their stores and view ratings, while Administrators can manage users, stores, and view overall statistics.

## 🚀 Features

### 👤 Normal User

* Can sign up and log in to the platform
* Can update password after logging in
* Can view a list of all registered stores
* Can search for stores by **Name** and **Address**
* Store listings display:

  * Store Name
  * Address
  * Overall Rating
  * User’s Submitted Rating
  * Option to **submit** or **modify** a rating (1–5 stars)
* Can log out from the system

### 🏪 Store Owner

* Can log in to the platform
* Can update their password after logging in
* Dashboard functionalities:

  * View list of users who submitted ratings for their store
  * View average rating of their store
* Can log out from the system

### 🛠️ System Administrator

* Can add **new stores**, **normal users**, and **admin users**
* Dashboard includes:

  * Total number of users
  * Total number of stores
  * Total number of ratings
* Can view lists of:

  * All users (Name, Email, Address, Role)
  * All stores (Name, Address, Owner, Average Rating)
* Can filter listings by **Name, Email, Address, Role**
* Can view details of all users

  * If the user is a Store Owner, their store ratings are also displayed
* Can log out from the system

---

## 🛠 Tech Stack

* **Frontend:** React.js
* **Backend:** Express.js
* **Database:** MySQL

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/samu1110/store-rating-system.git
cd store-rating-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Start backend:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend runs at `http://localhost:3000`.

---

## 🗄 Database Setup

1. Open MySQL Workbench or terminal
2. Create a database:

   ```sql
   CREATE DATABASE roxiler_task1;
   ```
3. Import the dump from the `db` folder:

   ```bash
   mysql -u root -p roxiler_task1 < db/roxiler_task1.sql
   ```



## 📖 Usage

* Visit `http://localhost:3000` in your browser
* **Signup** or **Login** as User, Store Owner, or Admin
* Try different roles:

  * Admin → manage users & stores
  * Store Owner → view ratings of their store
  * User → rate stores

---

## 📂 Folder Structure

root/
│── frontend/           # React frontend
│── config/           # Database config (db.js)
│── routes/           # Express routes (auth, admin, user, owner)
│── db/               # Database dump (roxiler_task1.sql)
│── utils/            # Validation helpers
│── server.js         # Express entry point
│── README.md         # Project documentation



## ✅ Best Practices Followed

* Passwords hashed with **bcrypt**
* Proper **form validations** (name, email, password, address)
* Role-based routing & dashboard access
* Sorting & filtering in admin dashboards

## Screenshot of Project:
1.Signup
<img width="1897" height="918" alt="image" src="https://github.com/user-attachments/assets/920d3de0-73d5-46c4-b133-c65123ef39da" />

2.Login Page
<img width="1914" height="924" alt="image" src="https://github.com/user-attachments/assets/f42ef505-b7de-4bd4-be7d-e67162a5bdce" />

3.Admin Dashboard
<img width="1910" height="927" alt="image" src="https://github.com/user-attachments/assets/459cc9ed-9611-409b-b5da-2935e7e9599b" />

4.Store Owner Dashboard
<img width="1919" height="933" alt="image" src="https://github.com/user-attachments/assets/903c80a1-275b-4887-bf17-696acacd2991" />

5.Normal User Dashboard
<img width="1912" height="932" alt="image" src="https://github.com/user-attachments/assets/0c121641-529f-45aa-970d-5118a927afc6" />

