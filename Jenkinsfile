pipeline {
  agent {
    docker {
      image 'example image'
      args ''
    }
  }
  /* triggers { pollSCM('H/2 * * * *') } */
  options {
    disableConcurrentBuilds()
  }
  stages {
    stage('Setup') {
      steps {
        sshagent(['xxxxx-xxx-xxxxx-xxxx-xxxxxxx']) {
          checkout scm
          withNPM(npmrcConfig:'npm-artifactory') {
            sh 'npm install'
            sh 'npm run build:all'
          }
        }
      }
    }
    stage('Unit Test') {
      steps {
        sh 'npm run lint'
        sh 'npm run test'
      }
    }
    stage('Acceptance Test') {
      steps {
        sh 'npm run acceptance-test:jenkins'
      }
    }
    stage('Deploy') {
      when {
        expression { env.BRANCH_NAME == 'master' }
      }
      environment {
        CI_USERNAME = credentials('test_username')
        CI_PASSWORD = credentials('test_pass')
      }
      steps {
        
      }
    }
   
    stage('Cleanup') {
      steps {
        
      }
    }
  }
  post {
    success {
     
    }
    failure {
      
    }
  }
}
