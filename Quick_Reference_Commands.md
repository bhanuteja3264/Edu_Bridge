# Quick Reference Commands for DevOps Pipeline

## Git Commands

```powershell
# Add all files to Git
git add .

# Commit changes
git commit -m "Added Jenkins and Docker configuration for CI/CD"

# Push to GitHub (triggers Jenkins build)
git push origin main

# Check status
git status

# View commit history
git log --oneline
```

## Docker Commands

```powershell
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# View container logs
docker logs edubridge-server-container
docker logs edubridge-client-container
docker logs edubridge-mongodb-container

# Follow logs in real-time
docker logs -f edubridge-server-container

# Stop all containers
docker stop edubridge-client-container edubridge-server-container edubridge-mongodb-container

# Remove all containers
docker rm edubridge-client-container edubridge-server-container edubridge-mongodb-container

# List images
docker images

# Remove images
docker rmi edubridge-client edubridge-server

# View container details
docker inspect edubridge-server-container

# Execute command in container
docker exec -it edubridge-mongodb-container mongosh -u admin -p admin123

# View resource usage
docker stats
```

## Jenkins Commands

```powershell
# Start Jenkins (if using WAR file)
java -jar jenkins.war --httpPort=8080

# Access Jenkins
# Open browser: http://localhost:8080
```

## ngrok Commands

```powershell
# Start ngrok tunnel
ngrok http 8080

# Access ngrok dashboard
# Open browser: http://127.0.0.1:4040
```

## Testing with Postman

### API Endpoints to Test

1. **Health Check**
   - GET `http://localhost:5000/api/health`

2. **User Login**
   - POST `http://localhost:5000/api/auth/login`
   - Body: `{"email": "user@example.com", "password": "password123"}`

3. **Get Students**
   - GET `http://localhost:5000/api/students`
   - Header: `Authorization: Bearer <token>`

4. **Get Projects**
   - GET `http://localhost:5000/api/projects`
   - Header: `Authorization: Bearer <token>`

## Troubleshooting Commands

```powershell
# Check if ports are in use
netstat -ano | findstr :80
netstat -ano | findstr :5000
netstat -ano | findstr :8080
netstat -ano | findstr :27017

# Kill process by PID
taskkill /PID <process_id> /F

# Check Docker network
docker network ls
docker network inspect edubridge-network

# Remove all stopped containers
docker container prune

# Remove all unused images
docker image prune -a

# Remove all unused volumes
docker volume prune

# Complete cleanup (WARNING: Removes everything)
docker system prune -a --volumes
```

## MongoDB Commands

```powershell
# Access MongoDB shell
docker exec -it edubridge-mongodb-container mongosh -u admin -p admin123

# Inside MongoDB shell:
use edubridge
show collections
db.students.find().limit(5)
db.teams.find()
exit
```

## Complete Workflow Commands

```powershell
# 1. Start Docker Desktop (GUI application)

# 2. Start Jenkins
java -jar jenkins.war --httpPort=8080

# 3. Start ngrok (in new terminal)
ngrok http 8080

# 4. Add and commit files
git add .
git commit -m "DevOps setup complete"

# 5. Push to GitHub (triggers build)
git push origin main

# 6. Monitor Jenkins build
# Open: http://localhost:8080
# Click on "Edu_Bridge_Pipeline"
# View Console Output

# 7. Verify deployment
docker ps

# 8. Test application
# Frontend: http://localhost
# Backend: http://localhost:5000
# Use Postman for API testing
```

## Manual Docker Build and Run (without Jenkins)

```powershell
# Build images
docker build -f Dockerfile.client -t edubridge-client:latest .
docker build -f Dockerfile.server -t edubridge-server:latest .

# Create network
docker network create edubridge-network

# Run MongoDB
docker run -d --name edubridge-mongodb-container --network edubridge-network -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin123 mongo:6

# Run Server
docker run -d --name edubridge-server-container --network edubridge-network -p 5000:5000 -e NODE_ENV=production -e MONGODB_URI=mongodb://admin:admin123@edubridge-mongodb-container:27017/edubridge?authSource=admin edubridge-server:latest

# Run Client
docker run -d --name edubridge-client-container --network edubridge-network -p 80:80 edubridge-client:latest

# Verify
docker ps
```

## Using Docker Compose

```powershell
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and restart
docker-compose up --build --force-recreate
```

## GitHub Webhook Verification

```powershell
# After pushing to GitHub:
# 1. Go to: https://github.com/bhanuteja3264/Edu_Bridge/settings/hooks
# 2. Click on your webhook
# 3. Check "Recent Deliveries"
# 4. Look for green checkmark (✓)
# 5. If red X, check:
#    - ngrok is still running
#    - Jenkins is accessible
#    - Webhook URL is correct with trailing /
```
