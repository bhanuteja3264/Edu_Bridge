# Docker Setup Guide for Edu_Bridge

## Prerequisites

1. **Install Docker Desktop**
   - Download from: https://www.docker.com/products/docker-desktop
   - Install and start Docker Desktop
   - Verify installation:
     ```bash
     docker --version
     docker-compose --version
     ```

## Project Structure

```
Edu_Bridge/
├── Dockerfile.client          # Frontend Docker configuration
├── Dockerfile.server          # Backend Docker configuration
├── docker-compose.yml         # Orchestration file
├── nginx.conf                 # Nginx configuration for frontend
├── .dockerignore             # Files to exclude from Docker builds
├── client/                    # React frontend
└── server/                    # Node.js backend
```

## Quick Start

### 1. Build and Run All Services

```bash
# Navigate to project root
cd ~/OneDrive/Desktop/Edu_Bridge

# Build and start all containers
docker-compose up --build
```

### 2. Access the Application

- **Frontend**: http://localhost:80 or http://localhost
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

### 3. Stop the Application

```bash
# Stop all containers
docker-compose down

# Stop and remove volumes (WARNING: This deletes database data)
docker-compose down -v
```

## Common Docker Commands

### Development Workflow

```bash
# Start in detached mode (background)
docker-compose up -d

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f server
docker-compose logs -f client

# Restart a specific service
docker-compose restart server

# Rebuild and restart
docker-compose up --build --force-recreate
```

### Managing Containers

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Stop a specific container
docker stop edubridge-server

# Remove a container
docker rm edubridge-server

# Execute command in container
docker exec -it edubridge-server sh
```

### Managing Images

```bash
# List images
docker images

# Remove an image
docker rmi edubridge-server

# Remove all unused images
docker image prune -a
```

### Database Management

```bash
# Access MongoDB shell
docker exec -it edubridge-mongodb mongosh

# Backup database
docker exec edubridge-mongodb mongodump --out /backup

# Restore database
docker exec edubridge-mongodb mongorestore /backup
```

## Environment Configuration

### 1. Create Environment Files

**For Development:**
Create `server/.env.docker`:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://admin:admin123@mongodb:27017/edubridge?authSource=admin
JWT_SECRET=your-jwt-secret-change-me
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY=your-firebase-private-key
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
```

**For Client:**
Create `client/.env.docker`:
```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
```

### 2. Update docker-compose.yml

Replace hardcoded values with environment file:
```yaml
services:
  server:
    env_file:
      - ./server/.env.docker
```

## Production Deployment

### 1. Build Production Images

```bash
# Build images with tags
docker build -f Dockerfile.client -t edubridge-client:latest .
docker build -f Dockerfile.server -t edubridge-server:latest .
```

### 2. Push to Docker Hub (Optional)

```bash
# Login to Docker Hub
docker login

# Tag images
docker tag edubridge-client:latest yourusername/edubridge-client:latest
docker tag edubridge-server:latest yourusername/edubridge-server:latest

# Push images
docker push yourusername/edubridge-client:latest
docker push yourusername/edubridge-server:latest
```

### 3. Deploy to Production Server

```bash
# Pull images on production server
docker pull yourusername/edubridge-client:latest
docker pull yourusername/edubridge-server:latest

# Run with docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

## Troubleshooting

### Issue: Port Already in Use

```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (Windows PowerShell)
taskkill /PID <process_id> /F

# Or change port in docker-compose.yml
ports:
  - "5001:5000"
```

### Issue: Container Keeps Restarting

```bash
# Check logs
docker-compose logs server

# Check container status
docker inspect edubridge-server
```

### Issue: Database Connection Failed

```bash
# Verify MongoDB is running
docker ps | findstr mongodb

# Check MongoDB logs
docker-compose logs mongodb

# Test connection
docker exec -it edubridge-mongodb mongosh -u admin -p admin123
```

### Issue: Cannot Connect to Backend from Frontend

- Ensure backend is running: `docker ps`
- Check nginx.conf proxy settings
- Verify network configuration in docker-compose.yml

## Development vs Production

### Development Setup (Hot Reload)

Create `docker-compose.dev.yml`:
```yaml
version: '3.8'

services:
  server:
    build:
      context: .
      dockerfile: Dockerfile.server
    volumes:
      - ./server:/app
      - /app/node_modules
    environment:
      NODE_ENV: development
    command: npm run dev

  client:
    build:
      context: .
      dockerfile: Dockerfile.client.dev
    volumes:
      - ./client:/app
      - /app/node_modules
    environment:
      NODE_ENV: development
```

Run with:
```bash
docker-compose -f docker-compose.dev.yml up
```

## Health Checks

Add health checks to docker-compose.yml:
```yaml
services:
  server:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

## Monitoring

### View Resource Usage

```bash
# Real-time stats
docker stats

# Specific container
docker stats edubridge-server
```

## Backup and Restore

### Backup

```bash
# Backup database
docker exec edubridge-mongodb mongodump --out /backup

# Copy backup to host
docker cp edubridge-mongodb:/backup ./backup
```

### Restore

```bash
# Copy backup to container
docker cp ./backup edubridge-mongodb:/backup

# Restore database
docker exec edubridge-mongodb mongorestore /backup
```

## Clean Up

```bash
# Remove all stopped containers
docker container prune

# Remove all unused images
docker image prune -a

# Remove all unused volumes
docker volume prune

# Remove everything (careful!)
docker system prune -a --volumes
```

## Next Steps

1. ✅ Install Docker Desktop
2. ✅ Configure environment variables
3. ✅ Run `docker-compose up --build`
4. ✅ Test the application
5. ✅ Set up CI/CD with Jenkins to build Docker images
6. ✅ Deploy to production

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Hub](https://hub.docker.com/)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)
