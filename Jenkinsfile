pipeline {
    agent any
    
    environment {
        // Docker image names
        CLIENT_IMAGE_NAME = 'edubridge-client'
        SERVER_IMAGE_NAME = 'edubridge-server'
        MONGO_IMAGE_NAME = 'mongo:6'
        
        // Docker container names
        CLIENT_CONTAINER = 'edubridge-client-container'
        SERVER_CONTAINER = 'edubridge-server-container'
        MONGO_CONTAINER = 'edubridge-mongodb-container'
        
        // Network name
        DOCKER_NETWORK = 'edubridge-network'
        
        // Ports
        CLIENT_PORT = '80'
        SERVER_PORT = '5000'
        MONGO_PORT = '27017'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                git branch: 'main', url: 'https://github.com/bhanuteja3264/Edu_Bridge.git'
            }
        }
        
        stage('Build Client') {
            steps {
                echo 'Building React Frontend Docker Image...'
                script {
                    bat """
                        docker build -f Dockerfile.client -t ${CLIENT_IMAGE_NAME}:latest .
                    """
                }
            }
        }
        
        stage('Build Server') {
            steps {
                echo 'Building Node.js Backend Docker Image...'
                script {
                    bat """
                        docker build -f Dockerfile.server -t ${SERVER_IMAGE_NAME}:latest .
                    """
                }
            }
        }
        
        stage('Stop Old Containers') {
            steps {
                echo 'Stopping and removing old containers if they exist...'
                script {
                    bat """
                        docker stop ${CLIENT_CONTAINER} || echo "Client container not running"
                        docker rm ${CLIENT_CONTAINER} || echo "Client container does not exist"
                        
                        docker stop ${SERVER_CONTAINER} || echo "Server container not running"
                        docker rm ${SERVER_CONTAINER} || echo "Server container does not exist"
                        
                        docker stop ${MONGO_CONTAINER} || echo "MongoDB container not running"
                        docker rm ${MONGO_CONTAINER} || echo "MongoDB container does not exist"
                    """
                }
            }
        }
        
        stage('Create Docker Network') {
            steps {
                echo 'Creating Docker network...'
                script {
                    bat """
                        docker network create ${DOCKER_NETWORK} || echo "Network already exists"
                    """
                }
            }
        }
        
        stage('Run MongoDB Container') {
            steps {
                echo 'Starting MongoDB container...'
                script {
                    bat """
                        docker run -d ^
                        --name ${MONGO_CONTAINER} ^
                        --network ${DOCKER_NETWORK} ^
                        -p ${MONGO_PORT}:27017 ^
                        -e MONGO_INITDB_ROOT_USERNAME=admin ^
                        -e MONGO_INITDB_ROOT_PASSWORD=admin123 ^
                        -e MONGO_INITDB_DATABASE=edubridge ^
                        ${MONGO_IMAGE_NAME}
                    """
                }
            }
        }
        
        stage('Run Server Container') {
            steps {
                echo 'Starting Backend Server container...'
                script {
                    bat """
                        docker run -d ^
                        --name ${SERVER_CONTAINER} ^
                        --network ${DOCKER_NETWORK} ^
                        -p ${SERVER_PORT}:5000 ^
                        -e NODE_ENV=production ^
                        -e PORT=5000 ^
                        -e MONGODB_URI=mongodb://admin:admin123@${MONGO_CONTAINER}:27017/edubridge?authSource=admin ^
                        -e JWT_SECRET=your-production-jwt-secret ^
                        ${SERVER_IMAGE_NAME}:latest
                    """
                }
            }
        }
        
        stage('Run Client Container') {
            steps {
                echo 'Starting Frontend Client container...'
                script {
                    bat """
                        docker run -d ^
                        --name ${CLIENT_CONTAINER} ^
                        --network ${DOCKER_NETWORK} ^
                        -p ${CLIENT_PORT}:80 ^
                        ${CLIENT_IMAGE_NAME}:latest
                    """
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                echo 'Verifying all containers are running...'
                script {
                    bat """
                        docker ps
                        echo.
                        echo ========================================
                        echo Application deployed successfully!
                        echo Frontend: http://localhost:${CLIENT_PORT}
                        echo Backend: http://localhost:${SERVER_PORT}
                        echo MongoDB: localhost:${MONGO_PORT}
                        echo ========================================
                    """
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution completed.'
        }
        success {
            echo 'Build and deployment successful!'
            echo 'Application is running and ready to use.'
        }
        failure {
            echo 'Build or deployment failed!'
            echo 'Check the logs for errors.'
            script {
                bat """
                    echo Checking container logs...
                    docker logs ${SERVER_CONTAINER} || echo "No server logs"
                    docker logs ${CLIENT_CONTAINER} || echo "No client logs"
                """
            }
        }
    }
}
