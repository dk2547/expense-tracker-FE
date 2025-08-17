pipeline {
    agent any

    triggers {
        pollSCM('* * * * *')  // check every min
    }

    environment {
        IMAGE_NAME = "expense-tracker-frontend"
        REGISTRY   = "dk2547"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'master',
                    credentialsId: 'github-creds',
                    url: 'https://github.com/dk2547/expense-tracker-FE.git'
            }
        }

        stage('Build & Tag Docker Image') {
            steps {
                script {
                    def COMMIT_HASH = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    env.IMAGE_TAG = COMMIT_HASH

                    sh """
                        docker build -t $REGISTRY/$IMAGE_NAME:${IMAGE_TAG} .
                    """
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds-id', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $REGISTRY/$IMAGE_NAME:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Cleanup Local Images') {
            steps {
                sh """
                    docker images "$REGISTRY/$IMAGE_NAME" --format "{{.ID}}" | tail -n +11 | xargs -r docker rmi -f
                """
            }
        }
    }
}
