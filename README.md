# 🍹 blendRUSH Frontend

This is the frontend of the **Juice Bar Ordering System**, built with **React and Tailwind CSS**.  
It provides a modern, responsive user interface for browsing the menu, managing the cart, authenticating users, and placing orders.

The frontend is deployed on **Netlify**, which provides automatic CI/CD when changes are merged into the `main` branch.

---

## 🚀 Tech Stack
- **React.js** – Component-based UI library  
- **JavaScript (ES6)** – Simpler setup for rapid development  
- **Tailwind CSS** – Utility-first styling for responsive design  
- **Netlify** – Continuous deployment and hosting  

---

## ⚙️ Installation & Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/BlendRush/frontend.git
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory with the backend API URL:
```
REACT_APP_API_URL=https://<your-ec2-ip>/api
```

⚠️ **Note**: Since the backend is deployed on an **AWS EC2 free tier instance**, the **public IP address changes** whenever the instance is stopped and started again.  
If the EC2 instance is restarted, make sure to update this `REACT_APP_API_URL` value with the new public IP address.

### 4. Run the development server
```bash
npm start
```

The app will run locally at `http://localhost:3000`.

---

## 📦 Build & Deploy
To create an optimized build:
```bash
npm run build
```

The `build/` folder can then be deployed manually or automatically with **Netlify**.

- On merge to `main`, Netlify automatically:
  1. Detects the new commit  
  2. Builds the app  
  3. Deploys to production  
  4. Makes it live instantly  

