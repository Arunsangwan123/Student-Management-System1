pipeline {
  agent any
  environment {
    BACKEND_DIR = 'server'
    FRONTEND_DIR = 'client'
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
          sh 'npm run build'
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
