# 🚀 Getting Started - DevOps Setup for Edu_Bridge

## 📝 What You Have Now

✅ **Jenkinsfile** - Complete CI/CD pipeline  
✅ **Dockerfiles** - Multi-stage builds for client & server  
✅ **docker-compose.yml** - Container orchestration  
✅ **nginx.conf** - Web server configuration  
✅ **Complete Documentation** - 4 comprehensive guides  

---

## ⚡ Quick Start (3 Options)

### Option 1: Full Jenkins CI/CD Pipeline (Recommended for Production)

**Prerequisites:**
```powershell
# 1. Ensure Docker Desktop is running
docker --version

# 2. Download and install Jenkins from: https://www.jenkins.io/download/
# 3. Download ngrok from: https://ngrok.com/download
# 4. Install Postman from: https://www.postman.com/downloads/
```

**Steps:**
1. **Start Jenkins** (in Terminal 1):
   ```powershell
   java -jar jenkins.war --httpPort=8080
   ```
   Access: http://localhost:8080

2. **Start ngrok** (in Terminal 2):
   ```powershell
   ngrok http 8080
   ```
   Copy the https URL

3. **Configure GitHub Webhook**:
   - Go to: https://github.com/bhanuteja3264/Edu_Bridge/settings/hooks
   - Add webhook with ngrok URL: `https://your-ngrok-url.ngrok-free.app/github-webhook/`

4. **Configure Jenkins**:
   - Create new Pipeline job: `Edu_Bridge_Pipeline`
   - Configure Git repository and Jenkinsfile
   - Follow detailed steps in `DevOps_Complete_Guide.md`

5. **Deploy**:
   ```powershell
   git add .
   git commit -m "DevOps setup complete"
   git push origin main
   ```
   Jenkins will automatically build and deploy!

---

### Option 2: Docker Compose (Quick Development)

```powershell
# Start all services
docker-compose up --build

# Access application:
# Frontend: http://localhost
# Backend: http://localhost:5000
# MongoDB: localhost:27017

# Stop services
docker-compose down
```

---

### Option 3: Manual Docker Commands

```powershell
# 1. Build images
docker build -f Dockerfile.client -t edubridge-client .
docker build -f Dockerfile.server -t edubridge-server .

# 2. Create network
docker network create edubridge-network

# 3. Run MongoDB
docker run -d --name edubridge-mongodb-container --network edubridge-network -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin123 mongo:6

# 4. Run Server
docker run -d --name edubridge-server-container --network edubridge-network -p 5000:5000 -e NODE_ENV=production -e MONGODB_URI=mongodb://admin:admin123@edubridge-mongodb-container:27017/edubridge edubridge-server

# 5. Run Client
docker run -d --name edubridge-client-container --network edubridge-network -p 80:80 edubridge-client

# 6. Verify
docker ps
```

---

## 📚 Documentation Files

1. **DevOps_Complete_Guide.md** ⭐ START HERE ⭐
   - Complete step-by-step guide
   - Jenkins setup
   - GitHub webhook configuration
   - Jenkinsfile explanation
   - Dockerfile explanation
   - Testing procedures
   - Troubleshooting

2. **DevOps_Summary.md**
   - Quick overview
   - Architecture diagram
   - Verification checklist
   - Common issues

3. **Quick_Reference_Commands.md**
   - All commands in one place
   - Git, Docker, Jenkins, ngrok
   - Testing commands
   - Troubleshooting commands

4. **Docker_Setup_Guide.md**
   - Docker installation
   - Container management
   - Development workflow

---

## 🧪 Testing Your Application

### 1. Verify Containers
```powershell
docker ps
# Should show 3 containers running
```

### 2. Test Frontend
- Open browser: http://localhost
- React app should load

### 3. Test Backend with Postman

**Health Check:**
- GET `http://localhost:5000/api/health`

**Login:**
- POST `http://localhost:5000/api/auth/login`
- Body: `{"email": "student@example.com", "password": "password123"}`

**Get Students:**
- GET `http://localhost:5000/api/students`
- Header: `Authorization: Bearer <token>`

---

## 🎯 What Happens When You Push to GitHub

```
You push code to GitHub
         ↓
GitHub triggers webhook (via ngrok)
         ↓
Jenkins receives notification
         ↓
Jenkins starts pipeline:
  1. Checkout code ✓
  2. Build Client Docker image ✓
  3. Build Server Docker image ✓
  4. Stop old containers ✓
  5. Create Docker network ✓
  6. Run MongoDB container ✓
  7. Run Server container ✓
  8. Run Client container ✓
  9. Verify deployment ✓
         ↓
Application running!
  - Frontend: http://localhost
  - Backend: http://localhost:5000
  - MongoDB: localhost:27017
```

---

## 🔧 Before You Start

### ✅ Checklist

- [ ] Docker Desktop installed and running
- [ ] Java installed (for Jenkins)
- [ ] Git installed and configured
- [ ] GitHub repository created: https://github.com/bhanuteja3264/Edu_Bridge
- [ ] All DevOps files present in project root
- [ ] Git remote configured correctly

### Verify Setup
```powershell
# Check Docker
docker --version
docker ps

# Check Git
git --version
git remote -v

# Check Java (for Jenkins)
java -version

# Check all files exist
dir Jenkinsfile, Dockerfile*, docker-compose.yml, nginx.conf
```

---

## 🐛 Common Issues

### Docker Desktop Not Running
```powershell
# Start Docker Desktop (GUI application)
# Wait for it to fully start
# Verify: docker ps
```

### Port Already in Use
```powershell
# Check ports
netstat -ano | findstr :80
netstat -ano | findstr :5000
netstat -ano | findstr :8080

# Kill process if needed
taskkill /PID <process_id> /F
```

### Git Remote Issues
```powershell
# Check current remote
git remote -v

# Update if needed
git remote set-url origin https://github.com/bhanuteja3264/Edu_Bridge.git
```

---

## 📞 Need Help?

1. Check **DevOps_Complete_Guide.md** for detailed instructions
2. Check **Troubleshooting** section in the guide
3. View container logs: `docker logs <container-name>`
4. Check Jenkins console output: http://localhost:8080

---

## 🎉 Success Indicators

✅ Jenkins build shows "SUCCESS"  
✅ 3 Docker containers running (`docker ps`)  
✅ Frontend loads at http://localhost  
✅ Backend responds at http://localhost:5000  
✅ Postman tests pass  
✅ No errors in logs  

---

## 📖 Recommended Reading Order

1. **Start here**: `Getting_Started.md` (this file)
2. **Full guide**: `DevOps_Complete_Guide.md`
3. **Quick reference**: `Quick_Reference_Commands.md`
4. **Overview**: `DevOps_Summary.md`

---

## 🚀 Ready to Start?

Choose your option:
- **Production**: Follow Option 1 (Jenkins CI/CD)
- **Development**: Follow Option 2 (Docker Compose)
- **Manual**: Follow Option 3 (Docker Commands)

**For complete instructions, open `DevOps_Complete_Guide.md`**

Good luck! 🎯
