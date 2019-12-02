pipeline {
	agent any

	tools {nodejs "node"}

	stages {
		stage('Build') {
			steps {
				echo 'Building...'
				echo "Running ${env.BUILD_ID} ${env.BUILD_DISPLAY_NAME} on ${env.NODE_NAME} and JOB ${env.JOB_NAME}"
				sh 'npm install'
			}
		 }
		stage('Test') {
			steps {
				echo 'Testing...'
				sh 'npm test'
			}
		}
		stage('Deploy') {
			steps {
				echo 'Deploying...'
			}
		}
	}
}

