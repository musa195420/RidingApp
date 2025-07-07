# 🚗 RidingApp Backend

### A backend system for a ride-hailing app like Uber, built using Node.js + Express and powered by Supabase PostgreSQL.

---

## 🚀 Project Overview

• ◎ This is a ride-hailing app with a **Flutter frontend** and **Supabase + Node.js backend**  
• ◎ The backend is written in **Node.js (Express)** with **PostgreSQL via Supabase**  
• ◎ Authenticated via **JWT** tokens with refresh-token support  
• ◎ The project follows the **MVC architecture** (Model-View-Controller)  
• ◎ Images (e.g. CNIC, driving license) are uploaded using **Supabase Storage**

---

## 🧠 Backend Documentation

### 📦 Tech Stack

<table>
  <tr><th>Component</th><th>Tech Used</th></tr>
  <tr><td>Runtime</td><td>Node.js</td></tr>
  <tr><td>Framework</td><td>Express.js</td></tr>
  <tr><td>Database</td><td>Supabase PostgreSQL</td></tr>
  <tr><td>Authentication</td><td>JWT (with Refresh Tokens)</td></tr>
  <tr><td>Storage</td><td>Supabase Storage</td></tr>
  <tr><td>Architecture</td><td>MVC Pattern</td></tr>
</table>

---

### 📁 Folder Structure

<table>
  <tr><th>Folder/File</th><th>Description</th></tr>
  <tr><td>/api/</td><td>Route handlers and controllers</td></tr>
  <tr><td>/config/</td><td>Configuration files (e.g. DB setup)</td></tr>
  <tr><td>app.js</td><td>Main entry point for the backend app</td></tr>
</table>

---

### 🔐 Authentication

• ◎ JWT-based access tokens  
• ◎ Refresh token system (stored in `refresh_tokens` table)  
• ◎ Auth middleware restricts sensitive routes  
• ◎ Only logged-in users can perform booking, profile updates, etc.

---

## 🌐 API Endpoints

### 🔑 Auth

<table>
  <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
  <tr><td>⦿ POST</td><td>/register</td><td>Register new users</td></tr>
  <tr><td>⦿ POST</td><td>/login</td><td>Login and receive JWT token</td></tr>
  <tr><td>⦿ POST</td><td>/refresh</td><td>Refresh token logic</td></tr>
</table>

### 👤 Profile

<table>
  <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
  <tr><td>⦿ GET</td><td>/profile</td><td>Get user profile</td></tr>
  <tr><td>⦿ PUT</td><td>/profile</td><td>Update user profile</td></tr>
</table>

### 🚕 Driver

<table>
  <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
  <tr><td>⦿ POST</td><td>/driver/apply</td><td>Submit driver documents</td></tr>
  <tr><td>⦿ GET</td><td>/driver/status</td><td>Get driver approval and status</td></tr>
</table>

### 📍 Location

<table>
  <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
  <tr><td>⦿ POST</td><td>/driver/location</td><td>Update driver’s real-time location</td></tr>
  <tr><td>⦿ GET</td><td>/driver/location/:id</td><td>Fetch driver’s current location</td></tr>
</table>

### 🚙 Ride

<table>
  <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
  <tr><td>⦿ POST</td><td>/ride/request</td><td>Request a new ride</td></tr>
  <tr><td>⦿ PUT</td><td>/ride/:id/status</td><td>Update ride status (accepted, completed, etc.)</td></tr>
  <tr><td>⦿ GET</td><td>/ride/history</td><td>Get past ride history</td></tr>
</table>

---

## 🗃️ Database Schema (Supabase)

### ⊚ Tables Overview

<table>
  <tr><th>Table</th><th>Description</th></tr>
  <tr><td>auth.users</td><td>Supabase's default user management</td></tr>
  <tr><td>profiles</td><td>Full name, email, phone, image</td></tr>
  <tr><td>drivers</td><td>CNIC, license URL, approval and availability</td></tr>
  <tr><td>driver_locations</td><td>Real-time driver location (geometry type)</td></tr>
  <tr><td>rides</td><td>Pickup/drop info, status, passenger/driver link</td></tr>
  <tr><td>ride_status_history</td><td>Ride status change log</td></tr>
  <tr><td>vehicles</td><td>Make, model, plate number, driver_id</td></tr>
  <tr><td>roles</td><td>User roles: passenger, driver, admin</td></tr>
  <tr><td>refresh_tokens</td><td>Stores JWT refresh tokens</td></tr>
</table>

---

## ✨ Features

• ◎ Clean, modular backend with MVC pattern  
• ◎ Easy integration with Flutter via REST APIs  
• ◎ Built-in role-based logic for passengers and drivers  
• ◎ Real-time location handling for active rides  
• ◎ Secure JWT & refresh-token system  

---

## 🛠️ Setup Instructions

```bash
# Clone the repo
git clone https://github.com/musa195420/RidingApp

# Navigate to backend folder
cd RidingApp

# Install dependencies
npm install

# Run the server
node app.js
