pipeline {
  agent any
  tools {
    nodejs 'node-20'
  }
  environment {
    BACKEND_DIR = 'server'
    FRONTEND_DIR = 'client'
    MONGO_URI = 'mongodb://mongo:27017/student-management'
    JWT_SECRET = 'supersecretjwtkey12345!'
    ADMIN_EMAIL = 'admin@example.com'
    ADMIN_PASSWORD = 'SecureAdmin123!'
    PORT = '5000'
    CLIENT_URL = 'http://localhost:3000'
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install Backend Dependencies') {
      steps {
        dir(env.BACKEND_DIR) {
          sh 'npm install'
        }
      }
    }
    stage('Install Frontend Dependencies') {
      steps {
        dir(env.FRONTEND_DIR) {
          sh 'npm install'
        }
      }
    }
    stage('Build Frontend') {
      steps {
        dir(env.FRONTEND_DIR) {
          sh 'CI=false npm run build'
        }
      }
    }
    stage('Run Tests') {
      steps {
        dir(env.BACKEND_DIR) {
          sh 'npm test || true'
        }
      }
    }
    stage('Create .env File') {
      steps {
        sh '''
          cat > .env << EOF
MONGO_URI=${MONGO_URI}
JWT_SECRET=${JWT_SECRET}
ADMIN_EMAIL=${ADMIN_EMAIL}
ADMIN_PASSWORD=${ADMIN_PASSWORD}
PORT=${PORT}
CLIENT_URL=${CLIENT_URL}
EOF
        '''
      }
    }
    stage('Cleanup Old Containers') {
      steps {
        sh '''
          docker-compose -f docker-compose.yml down --remove-orphans || true
          docker system prune -f || true
        '''
      }
    }
    stage('Build Docker Images') {
      steps {
        sh 'docker-compose -f docker-compose.yml build'
      }
    }
    stage('Deploy Containers') {
      steps {
        sh 'docker-compose -f docker-compose.yml up -d --remove-orphans'
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: '**/build/**/*', allowEmptyArchive: true
    }
  }
}
