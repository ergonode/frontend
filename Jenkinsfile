pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                httpRequest consoleLogResponseBody: true, acceptType: 'APPLICATION_JSON', authentication: "${BITBUCKET_CREDENTIALS_ID}", contentType: 'APPLICATION_JSON', httpMode: 'POST', ignoreSslErrors: true, requestBody: """{
                  "state": "INPROGRESS",
                  "key": "${BUILD_ID}",
                  "name": "${GIT_LOCAL_BRANCH}",
                  "url": "${BUILD_URL}",
                  "description": ""
                }""", responseHandle: 'NONE', url: "https://bitbucket.abbc.pl/rest/build-status/1.0/commits/${GIT_COMMIT}"

                sh "docker build -t ergonode/frontend:$BUILD_NUMBER --pull=true ."
                sh "docker run -itd --name $BUILD_TAG ergonode/frontend:$BUILD_NUMBER"
            }
        }

        stage('Analyse') {
            parallel {
                stage ('lint') {
                    steps {
                        sh "docker exec $BUILD_TAG yarn run lint"
                    }
                }
                stage ('test') {
                    steps {
                        sh "docker exec $BUILD_TAG yarn run test"
                    }
                }
            }
        }
    }

    post {
        always {
            sh "docker cp $BUILD_TAG:/app/build $WORKSPACE"

            junit testResults: 'build/jest-junit.xml'

            recordIssues aggregatingResults: true, enabledForFailure: true, tools: [jsLint(pattern: 'build/jslint.xml')]
        }
        failure {
            httpRequest consoleLogResponseBody: true, acceptType: 'APPLICATION_JSON', authentication: "${BITBUCKET_CREDENTIALS_ID}", contentType: 'APPLICATION_JSON', httpMode: 'POST', ignoreSslErrors: true, requestBody: """{
              "state": "FAILED",
              "key": "${BUILD_ID}",
              "name": "${GIT_LOCAL_BRANCH}",
              "url": "${BUILD_URL}",
              "description": ""
            }""", responseHandle: 'NONE', url: "https://bitbucket.abbc.pl/rest/build-status/1.0/commits/${GIT_COMMIT}"

            sh "docker rm -f $BUILD_TAG"
            sh "docker rmi -f ergonode/frontend:$BUILD_NUMBER"
        }
        success {
            httpRequest consoleLogResponseBody: true, acceptType: 'APPLICATION_JSON', authentication: "${BITBUCKET_CREDENTIALS_ID}", contentType: 'APPLICATION_JSON', httpMode: 'POST', ignoreSslErrors: true, requestBody: """{
              "state": "SUCCESSFUL",
              "key": "${BUILD_ID}",
              "name": "${GIT_LOCAL_BRANCH}",
              "url": "${BUILD_URL}",
              "description": ""
            }""", responseHandle: 'NONE', url: "https://bitbucket.abbc.pl/rest/build-status/1.0/commits/${GIT_COMMIT}"

            sh "docker rm -f $BUILD_TAG"
            sh "docker tag ergonode/frontend:$BUILD_NUMBER ergonode/frontend:$GIT_LOCAL_BRANCH"
            sh "docker rmi -f ergonode/frontend:$BUILD_NUMBER"
        }
    }
}
