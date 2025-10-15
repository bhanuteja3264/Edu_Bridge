# Complete DevOps Process for Edu_Bridge Project

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Step-by-Step DevOps Implementation](#step-by-step-devops-implementation)
4. [Jenkinsfile Explanation](#jenkinsfile-explanation)
5. [Dockerfile Explanation](#dockerfile-explanation)
6. [Testing the Application](#testing-the-application)
7. [Troubleshooting](#troubleshooting)

---

## Overview

This guide covers the complete DevOps process for the Edu_Bridge application:
- **Local Git Setup**: Store project in local Git repository
- **Jenkins**: Automated build server
- **ngrok**: Public URL for GitHub webhooks
- **GitHub**: Remote repository and webhook configuration
- **Docker**: Containerization and deployment
- **Testing**: Postman API testing

---

## Prerequisites

### 1. Install Required Software
- ✅ **Git**: [Download Git](https://git-scm.com/downloads)
- ✅ **Docker Desktop**: [Download Docker](https://www.docker.com/products/docker-desktop)
- ✅ **Jenkins**: [Download Jenkins](https://www.jenkins.io/download/)
- ✅ **ngrok**: [Download ngrok](https://ngrok.com/download)
- ✅ **Postman**: [Download Postman](https://www.postman.com/downloads/)

### 2. Verify Installations
```powershell
git --version
docker --version
java -version  # Required for Jenkins
```

---

## Step-by-Step DevOps Implementation

### **Step 1: Store Project in Local Git Repository**

```powershell
# Navigate to project directory
cd C:\Users\bhanu\OneDrive\Desktop\Edu_Bridge

# Check Git status
git status

# Add all files
git add .

# Commit changes
git commit -m "Initial commit with Docker and Jenkins configuration"

# Verify commit
git log --oneline
```

---

### **Step 2: Start Jenkins Build Server**

#### Option A: Using Jenkins WAR File
```powershell
# Download Jenkins WAR file from https://www.jenkins.io/download/
# Run Jenkins (assuming jenkins.war is in Downloads)
java -jar C:\Users\bhanu\Downloads\jenkins.war --httpPort=8080
```

#### Option B: Using Jenkins Windows Installer
1. Download Jenkins installer from https://www.jenkins.io/download/
2. Install Jenkins as a Windows service
3. Jenkins will start automatically on port 8080

#### Access Jenkins
- Open browser: http://localhost:8080
- First-time setup:
  1. Get initial admin password from: `C:\Users\bhanu\.jenkins\secrets\initialAdminPassword`
  2. Install suggested plugins
  3. Create admin user

---

### **Step 3: Run ngrok to Create Public URL**

```powershell
# Download ngrok from https://ngrok.com/download
# Extract ngrok.exe

# Run ngrok (creates public URL for Jenkins)
ngrok http 8080
```

**Output Example:**
```
Forwarding   https://abcd-1234-efgh-5678.ngrok-free.app -> http://localhost:8080
```

**Important**: Keep this terminal window open. Copy the `https://` URL for the next step.

---

### **Step 4: Create Placeholder for Project in GitHub**

1. Go to https://github.com and log in
2. Click "+" → "New repository"
3. Repository name: `Edu_Bridge`
4. Description: "Project Review Management System"
5. Choose Public or Private
6. **Do NOT** initialize with README (project already has files)
7. Click "Create repository"

Your repository URL: `https://github.com/bhanuteja3264/Edu_Bridge.git`

---

### **Step 5: Create Webhook in GitHub for Jenkins**

1. Go to your GitHub repository: https://github.com/bhanuteja3264/Edu_Bridge
2. Click "Settings" → "Webhooks" → "Add webhook"
3. Configure webhook:
   - **Payload URL**: `https://your-ngrok-url.ngrok-free.app/github-webhook/`
     - Example: `https://abcd-1234-efgh-5678.ngrok-free.app/github-webhook/`
     - **Important**: Include the trailing `/`
   - **Content type**: `application/json`
   - **Which events**: Select "Just the push event"
   - **Active**: ✅ Checked
4. Click "Add webhook"
5. Verify webhook shows green checkmark

---

### **Step 6: Open Jenkins and Configure**

#### 6.1 Install Required Jenkins Plugins
1. Go to http://localhost:8080
2. Navigate to **Manage Jenkins** → **Manage Plugins**
3. Click **Available** tab, search and install:
   - **Git plugin**
   - **GitHub plugin**
   - **Docker plugin**
   - **Docker Pipeline plugin**
4. Restart Jenkins after installation

#### 6.2 Configure Jenkins Credentials
1. Go to **Manage Jenkins** → **Manage Credentials**
2. Click **(global)** → **Add Credentials**
3. Add GitHub credentials:
   - **Kind**: Username with password
   - **Username**: Your GitHub username
   - **Password**: GitHub Personal Access Token
     - Generate token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token
     - Permissions: `repo`, `admin:repo_hook`
   - **ID**: `github-credentials`
   - **Description**: GitHub Access Token
4. Click **OK**

---

### **Step 7: Create Build Pipeline in Jenkins**

#### 7.1 Create New Pipeline Job
1. Go to Jenkins Dashboard: http://localhost:8080
2. Click **New Item**
3. Enter name: `Edu_Bridge_Pipeline`
4. Select **Pipeline**
5. Click **OK**

#### 7.2 Configure Pipeline
1. **General Section**:
   - ✅ Check "GitHub project"
   - Project url: `https://github.com/bhanuteja3264/Edu_Bridge/`

2. **Build Triggers**:
   - ✅ Check "GitHub hook trigger for GITScm polling"

3. **Pipeline Section**:
   - **Definition**: Pipeline script from SCM
   - **SCM**: Git
   - **Repository URL**: `https://github.com/bhanuteja3264/Edu_Bridge.git`
   - **Credentials**: Select `github-credentials`
   - **Branch**: `*/main`
   - **Script Path**: `Jenkinsfile`

4. Click **Save**

---

### **Step 8: Push Project to GitHub**

```powershell
# Navigate to project directory
cd C:\Users\bhanu\OneDrive\Desktop\Edu_Bridge

# Ensure remote is set correctly
git remote -v

# If not set, add remote
git remote add origin https://github.com/bhanuteja3264/Edu_Bridge.git

# If remote exists but wrong URL, update it
git remote set-url origin https://github.com/bhanuteja3264/Edu_Bridge.git

# Push to GitHub (this will trigger Jenkins webhook)
git push -u origin main
```

**What Happens Next:**
1. Code is pushed to GitHub
2. GitHub webhook notifies Jenkins
3. Jenkins automatically starts the build pipeline
4. Pipeline executes all stages:
   - ✅ Checkout code from GitHub
   - ✅ Build React frontend Docker image
   - ✅ Build Node.js backend Docker image
   - ✅ Stop old containers (if any)
   - ✅ Create Docker network
   - ✅ Run MongoDB container
   - ✅ Run backend server container
   - ✅ Run frontend client container
   - ✅ Verify deployment
5. Application is deployed and running in Docker containers

---

## Jenkinsfile Explanation

### Structure Overview
```
Jenkinsfile
├── pipeline: Main directive indicating this is a Jenkins Pipeline
├── agent any: Run on any available Jenkins agent
├── environment: Define environment variables
├── stages: Sequential tasks
│   ├── Checkout: Get code from GitHub
│   ├── Build Client: Build React Docker image
│   ├── Build Server: Build Node.js Docker image
│   ├── Stop Old Containers: Clean up old containers
│   ├── Create Docker Network: Set up container networking
│   ├── Run MongoDB Container: Start database
│   ├── Run Server Container: Start backend API
│   ├── Run Client Container: Start frontend
│   └── Verify Deployment: Check all containers running
└── post: Actions after pipeline completes
    ├── always: Always execute
    ├── success: On successful build
    └── failure: On failed build
```

### Key Sections Explained

#### 1. **Pipeline Directive** (Line 1)
```groovy
pipeline {
```
Indicates this is a Jenkins Pipeline script using declarative syntax.

#### 2. **Agent** (Line 2)
```groovy
agent any
```
The pipeline can run on any available Jenkins agent/node.

#### 3. **Environment Variables** (Lines 4-20)
```groovy
environment {
    CLIENT_IMAGE_NAME = 'edubridge-client'
    SERVER_IMAGE_NAME = 'edubridge-server'
    // ... more variables
}
```
Defines reusable variables throughout the pipeline.

#### 4. **Stages** (Lines 22-145)

##### Stage 1: Checkout (Lines 22-27)
```groovy
stage('Checkout') {
    steps {
        git branch: 'main', url: 'https://github.com/bhanuteja3264/Edu_Bridge.git'
    }
}
```
- Clones the repository from GitHub
- Checks out the `main` branch
- Downloads all project files to Jenkins workspace

##### Stage 2: Build Client (Lines 29-37)
```groovy
stage('Build Client') {
    steps {
        script {
            bat "docker build -f Dockerfile.client -t ${CLIENT_IMAGE_NAME}:latest ."
        }
    }
}
```
- Builds Docker image for React frontend
- Uses `Dockerfile.client` (multi-stage build)
- Tags image as `edubridge-client:latest`

##### Stage 3: Build Server (Lines 39-47)
```groovy
stage('Build Server') {
    steps {
        script {
            bat "docker build -f Dockerfile.server -t ${SERVER_IMAGE_NAME}:latest ."
        }
    }
}
```
- Builds Docker image for Node.js backend
- Uses `Dockerfile.server`
- Tags image as `edubridge-server:latest`

##### Stage 4: Stop Old Containers (Lines 49-63)
```groovy
stage('Stop Old Containers') {
    steps {
        bat """
            docker stop ${CLIENT_CONTAINER} || echo "Client container not running"
            docker rm ${CLIENT_CONTAINER} || echo "Client container does not exist"
            // ... more cleanup commands
        """
    }
}
```
- Stops and removes existing containers
- Prevents port conflicts
- Uses `|| echo` to continue if container doesn't exist

##### Stage 5: Create Docker Network (Lines 65-73)
```groovy
stage('Create Docker Network') {
    steps {
        bat "docker network create ${DOCKER_NETWORK} || echo 'Network already exists'"
    }
}
```
- Creates a bridge network for container communication
- Allows containers to communicate by name

##### Stage 6: Run MongoDB Container (Lines 75-90)
```groovy
stage('Run MongoDB Container') {
    steps {
        bat """
            docker run -d ^
            --name ${MONGO_CONTAINER} ^
            --network ${DOCKER_NETWORK} ^
            -p ${MONGO_PORT}:27017 ^
            -e MONGO_INITDB_ROOT_USERNAME=admin ^
            -e MONGO_INITDB_ROOT_PASSWORD=admin123 ^
            mongo:6
        """
    }
}
```
- Starts MongoDB container
- Connects to edubridge-network
- Exposes port 27017
- Sets admin credentials

##### Stage 7: Run Server Container (Lines 92-110)
```groovy
stage('Run Server Container') {
    steps {
        bat """
            docker run -d ^
            --name ${SERVER_CONTAINER} ^
            --network ${DOCKER_NETWORK} ^
            -p ${SERVER_PORT}:5000 ^
            -e MONGODB_URI=mongodb://admin:admin123@${MONGO_CONTAINER}:27017/edubridge
            ${SERVER_IMAGE_NAME}:latest
        """
    }
}
```
- Starts backend server container
- Connects to MongoDB using container name
- Exposes port 5000
- Passes environment variables

##### Stage 8: Run Client Container (Lines 112-124)
```groovy
stage('Run Client Container') {
    steps {
        bat """
            docker run -d ^
            --name ${CLIENT_CONTAINER} ^
            --network ${DOCKER_NETWORK} ^
            -p ${CLIENT_PORT}:80 ^
            ${CLIENT_IMAGE_NAME}:latest
        """
    }
}
```
- Starts frontend container
- Serves React app via Nginx
- Exposes port 80

##### Stage 9: Verify Deployment (Lines 126-142)
```groovy
stage('Verify Deployment') {
    steps {
        bat """
            docker ps
            echo Application deployed successfully!
        """
    }
}
```
- Lists running containers
- Displays access URLs
- Confirms successful deployment

#### 5. **Post Actions** (Lines 147-165)
```groovy
post {
    always {
        echo 'Pipeline execution completed.'
    }
    success {
        echo 'Build and deployment successful!'
    }
    failure {
        echo 'Build or deployment failed!'
        // Display container logs for debugging
    }
}
```
- **always**: Runs regardless of build result
- **success**: Runs only if build succeeds
- **failure**: Runs if build fails, shows logs for debugging

---

## Dockerfile Explanation

### Client Dockerfile (Dockerfile.client)

#### Two-Stage Build Process

**Stage 1: Build Stage**
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build
```
- **Base Image**: `node:18-alpine` - Lightweight Node.js 18 with Alpine Linux
- **Purpose**: Build React application
- **Process**:
  1. Set working directory to `/app`
  2. Copy `package.json` and `package-lock.json`
  3. Install dependencies with `npm ci` (clean install)
  4. Copy all client source code
  5. Build production bundle with `npm run build`
  6. Output: Optimized static files in `/app/dist`

**Stage 2: Production Stage**
```dockerfile
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
- **Base Image**: `nginx:alpine` - Lightweight Nginx web server
- **Purpose**: Serve static React files
- **Process**:
  1. Copy built files from Stage 1
  2. Copy custom Nginx configuration
  3. Expose port 80
  4. Start Nginx server

**Why Two Stages?**
- Stage 1 needs Node.js for building (large)
- Stage 2 only needs Nginx for serving (small)
- Final image is ~25MB instead of ~200MB

### Server Dockerfile (Dockerfile.server)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --only=production
COPY server/ ./
EXPOSE 5000
ENV NODE_ENV=production
CMD ["node", "server.js"]
```

**Single-Stage Build**
- **Base Image**: `node:18-alpine` - Node.js runtime
- **Purpose**: Run Express server
- **Process**:
  1. Set working directory to `/app`
  2. Copy `package.json` and `package-lock.json`
  3. Install production dependencies only
  4. Copy all server source code
  5. Expose port 5000
  6. Set environment to production
  7. Start server with `node server.js`

**Key Points**:
- Uses `--only=production` to skip dev dependencies
- Smaller image size (~150MB)
- No build step needed (JavaScript runs directly)

---

## Testing the Application

### 1. Verify Containers Are Running

```powershell
# Check all running containers
docker ps

# You should see 3 containers:
# - edubridge-client-container (port 80)
# - edubridge-server-container (port 5000)
# - edubridge-mongodb-container (port 27017)
```

### 2. Test Frontend (Browser)

Open browser and navigate to:
- **Frontend**: http://localhost
- **Expected**: React application loads

### 3. Test Backend API (Postman)

#### Install Postman
- Download from: https://www.postman.com/downloads/

#### Test API Endpoints

##### A. Health Check
- **Method**: GET
- **URL**: `http://localhost:5000/api/health`
- **Expected Response**:
```json
{
    "status": "OK",
    "message": "Server is running"
}
```

##### B. Get All Students
- **Method**: GET
- **URL**: `http://localhost:5000/api/students`
- **Headers**: 
  - `Authorization: Bearer <your-jwt-token>`
- **Expected Response**:
```json
{
    "success": true,
    "data": [...]
}
```

##### C. Login (Get JWT Token)
- **Method**: POST
- **URL**: `http://localhost:5000/api/auth/login`
- **Headers**: 
  - `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
    "email": "student@example.com",
    "password": "password123"
}
```
- **Expected Response**:
```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {...}
}
```

##### D. Create Project
- **Method**: POST
- **URL**: `http://localhost:5000/api/projects`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <your-jwt-token>`
- **Body** (raw JSON):
```json
{
    "title": "Test Project",
    "description": "This is a test project",
    "teamId": "team123"
}
```

### 4. Test MongoDB Connection

```powershell
# Access MongoDB shell
docker exec -it edubridge-mongodb-container mongosh -u admin -p admin123

# Once inside MongoDB shell:
use edubridge
show collections
db.students.find().limit(5)
exit
```

### 5. View Container Logs

```powershell
# View server logs
docker logs edubridge-server-container

# View client logs
docker logs edubridge-client-container

# Follow logs in real-time
docker logs -f edubridge-server-container
```

---

## Troubleshooting

### Issue 1: Jenkins Build Fails at Checkout Stage

**Problem**: Cannot access GitHub repository

**Solution**:
```powershell
# Verify GitHub credentials in Jenkins
# Go to: Manage Jenkins → Manage Credentials
# Ensure GitHub token has correct permissions: repo, admin:repo_hook
```

### Issue 2: Docker Build Fails

**Problem**: Cannot build Docker images

**Solution**:
```powershell
# Ensure Docker Desktop is running
docker ps

# Check Docker daemon is accessible
docker info

# Manually test Docker build
docker build -f Dockerfile.client -t test-client .
```

### Issue 3: Containers Won't Start

**Problem**: Port already in use

**Solution**:
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <process_id> /F

# Or change port in Jenkinsfile
```

### Issue 4: MongoDB Connection Failed

**Problem**: Server can't connect to MongoDB

**Solution**:
```powershell
# Verify MongoDB is running
docker ps | findstr mongodb

# Check MongoDB logs
docker logs edubridge-mongodb-container

# Test connection
docker exec -it edubridge-mongodb-container mongosh -u admin -p admin123
```

### Issue 5: GitHub Webhook Not Triggering

**Problem**: Push to GitHub doesn't trigger Jenkins build

**Solution**:
1. Check ngrok is still running
2. Verify webhook URL in GitHub has trailing `/`
3. Check webhook delivery in GitHub:
   - Go to: Repository → Settings → Webhooks
   - Click on webhook → Recent Deliveries
   - Look for green checkmark
4. Verify Jenkins plugin:
   - Go to: Manage Jenkins → Manage Plugins
   - Ensure "GitHub plugin" is installed

### Issue 6: Frontend Can't Connect to Backend

**Problem**: API calls fail from frontend

**Solution**:
```powershell
# Check nginx.conf proxy settings
# Verify backend is running
docker logs edubridge-server-container

# Test backend directly
curl http://localhost:5000/api/health
```

### Issue 7: Permission Denied in Jenkins

**Problem**: Jenkins can't execute Docker commands

**Solution**:
- Run Jenkins with administrator privileges
- Or add Jenkins user to Docker group (Linux/Mac)

---

## Summary of DevOps Workflow

```
Developer → Git Commit → Git Push to GitHub
                              ↓
                    GitHub Webhook (via ngrok)
                              ↓
                    Jenkins Pipeline Triggered
                              ↓
        ┌─────────────────────┴─────────────────────┐
        ↓                     ↓                     ↓
    Checkout            Build Client          Build Server
                              ↓
                    Create Docker Images
                              ↓
                    Stop Old Containers
                              ↓
                    Create Docker Network
                              ↓
        ┌─────────────────────┼─────────────────────┐
        ↓                     ↓                     ↓
   Run MongoDB          Run Server            Run Client
        └─────────────────────┼─────────────────────┘
                              ↓
                    Verify Deployment
                              ↓
                Application Running in Docker
                              ↓
                    Test with Postman
```

---

## Next Steps

1. ✅ Complete all 8 DevOps steps
2. ✅ Test application with Postman
3. ✅ Monitor Jenkins builds
4. ✅ Set up production environment variables
5. ✅ Configure backup and restore for MongoDB
6. ✅ Set up monitoring and logging
7. ✅ Create user documentation

---

## Additional Resources

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Docker Documentation](https://docs.docker.com/)
- [ngrok Documentation](https://ngrok.com/docs)
- [GitHub Webhooks Guide](https://docs.github.com/en/webhooks)
- [Postman Learning Center](https://learning.postman.com/)

---

**Congratulations! You've successfully implemented a complete DevOps pipeline for your Edu_Bridge project!** 🎉
