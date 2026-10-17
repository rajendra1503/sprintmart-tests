// QA pipeline: runs the Playwright suite against an ALREADY-DEPLOYED
// environment. It never builds or starts the application - that is the Dev
// team's pipeline (the sprintmart repo). The Dev pipeline triggers this job
// after each staging deploy and passes the environment's URL as BASE_URL.
// You can also run it by hand (Build with Parameters) or on a schedule.

pipeline {
    agent any

    parameters {
        string(
            name: 'BASE_URL',
            defaultValue: 'http://localhost:3001',
            description: 'URL of the deployed environment to test (staging by default)'
        )
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Install Playwright browsers') {
            steps {
                script {
                    // --with-deps installs OS-level packages Chromium needs
                    // on Linux; it's not applicable on Windows agents.
                    if (isUnix()) {
                        sh 'npx playwright install --with-deps chromium'
                    } else {
                        bat 'npx playwright install chromium'
                    }
                }
            }
        }

        stage('Check environment is reachable') {
            steps {
                script {
                    // Fail fast with a clear message if the environment under
                    // test is down, instead of 50 confusing test failures.
                    withEnv(["TARGET=${params.BASE_URL}"]) {
                        if (isUnix()) {
                            sh 'curl -sf "$TARGET/products" > /dev/null || { echo "Environment $TARGET is not reachable"; exit 1; }'
                        } else {
                            bat '''
                                curl -sf "%TARGET%/products" >nul 2>&1
                                if errorlevel 1 (
                                    echo Environment %TARGET% is not reachable
                                    exit /b 1
                                )
                            '''
                        }
                    }
                }
            }
        }

        stage('Run automated tests') {
            steps {
                script {
                    withEnv(["BASE_URL=${params.BASE_URL}"]) {
                        if (isUnix()) {
                            sh 'npx playwright test'
                        } else {
                            bat 'npx playwright test'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            junit testResults: 'test-results/junit.xml', allowEmptyResults: true
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
        failure {
            echo "QA suite failed against ${params.BASE_URL} - raise defects for real bugs, fix tests for intentional changes."
        }
    }
}
