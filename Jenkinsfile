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

        stage('Cleanup DockerHub Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds-id', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        # Get token
                        TOKEN=$(curl -s -H "Content-Type: application/json" -X POST \
                          -d "{\\"username\\": \\"$DOCKER_USER\\", \\"password\\": \\"$DOCKER_PASS\\"}" \
                          https://hub.docker.com/v2/users/login/ | jq -r .token)

                        # Get list of tags (sorted by last_updated desc)
                        TAGS=$(curl -s -H "Authorization: JWT $TOKEN" \
                          "https://hub.docker.com/v2/repositories/$REGISTRY/$IMAGE_NAME/tags/?page_size=100" \
                          | jq -r '.results|sort_by(.last_updated)|reverse|.[10:]|.[].name')

                        # Delete tags after keeping latest 10
                        for tag in $TAGS; do
                          echo "Deleting remote image: $REGISTRY/$IMAGE_NAME:$tag"
                          curl -s -X DELETE -H "Authorization: JWT $TOKEN" \
                            "https://hub.docker.com/v2/repositories/$REGISTRY/$IMAGE_NAME/tags/$tag/"
                        done
                    '''
                }
            }
        }
    }
}
