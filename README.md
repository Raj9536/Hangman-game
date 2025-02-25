# 🎮 Hangman Game Deployment on AWS EC2 🚀  

This guide will help you deploy the **Hangman Game** on an **AWS EC2 Instance** and make it accessible to the world. 🎉  

---

## 📌 Prerequisites  
Before starting, ensure you have:  
- An **AWS account**.  
- **MobaXterm** (or any SSH client like PuTTY).  
- **GitHub repository** with your Hangman Game.  

---

## **🚀 Step 1: Create an EC2 Instance on AWS**  
1. Log in to your **AWS Management Console**.  
2. Go to **EC2 Dashboard** → Click **Launch Instance**.  
3. Choose **Ubuntu 22.04 LTS** (or any preferred OS).  
4. Select **Instance Type** → `t2.micro` (Free Tier eligible).  
5. Configure Security Group:  
   - Allow **SSH (Port 22)** for remote access.  
6. Click **Launch** and **Download the Key Pair** (`.pem` file).  

---

## **🔑 Step 2: Access EC2 Instance Using MobaXterm (SSH)**  
1. Open **MobaXterm**.  
2. Click on **Session** → Select **SSH**.  
3. In **Remote Host**, enter your **EC2 Public IP** (found in the AWS EC2 console).  
4. Under **Advanced SSH Settings**, browse and select your `.pem` key file.  
5. Click **OK** to connect.  

---

## **🔄 Step 3: Update the EC2 Instance Packages**  
Run the following commands to update the system packages:  
```bash
sudo apt update && sudo apt upgrade -y
🌱 Step 4: Install Git on EC2
sudo apt install git -y

📥 Step 5: Clone the Repository from GitHub
git clone https://github.com/Raj9536/Hangman-game.git
cd Hangman-game

🛠 Step 6: Install Node.js
sudo apt install nodejs npm -y

node -v
npm -v


📦 Step 7: Install Project Dependencies
cd Hangman-game
npm install

🚀 Step 8: Run the Hangman Game
npm start

🌍 Step 9: Make the App Accessible from the Browser
To allow external access:

Go to AWS EC2 Dashboard → Instances.
Click on your EC2 instance and navigate to Security → Security Groups.
Click on Inbound Rules → Edit Inbound Rules.
Click Add Rule and enter:
Protocol: TCP
Port Range: 3000 (or the port your app is running on)
Source: 0.0.0.0/0 (Allows access from anywhere)
Click Save Rules.

Now, open your browser and visit: EC2PublicIPAddress:3000
Your Hangman Game is now live and accessible to the world! 🌍🔥

