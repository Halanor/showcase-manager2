# Showcase Manager

A Next.js + MongoDB app, ready to run with Docker.

---

## 🚀 Quick Start

### **Requirements**
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed (Windows, Mac, or Linux)

---

### **1. Clone the Repository**

Open your terminal and run:

```sh
git clone https://github.com/Halanor/showcase-manager2.git
cd showcase-manager2
```

---

### **2. Start the App with Docker**

In the project folder, run:

```sh
docker compose up --build
```

- The first run may take a few minutes as Docker downloads images and sets up the database.

---

### **3. Open the App**

Once Docker says the app is ready, open your browser and go to:

[http://localhost:3000](http://localhost:3000)

---

### **4. Log In**

Use these credentials to log in:

- **Username:** `admin`
- **Password:** `admin`

---

## 🛑 Stopping the App

To stop everything, press `Ctrl+C` in your terminal, then run:

```sh
docker compose down
```

---

## 📝 Notes

- The database is automatically seeded with an admin user on first run.
- No need to install Node.js, npm, or MongoDB—**Docker handles everything**.
- If you want to reset the database, run:
  ```sh
  docker compose down -v
  docker compose up --build
  ```

---

## 📦 Project Structure

- `docker-compose.yml` — Docker setup for app and database
- `mongo-init/init.js` — Seeds the database with the admin user
- `README.md` — This file

---

## ❓ Need Help?

- [Open an issue](https://github.com/Halanor/showcase-manager2/issues) on GitHub if you get stuck!

---

## 📄 License

MIT
