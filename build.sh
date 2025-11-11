#! /bin/bash

# 1. Place this script in the root of your dept repo
# 2. Make sure this file is executable (chmod +x build.sh)
# 3. Set variables correctly according to your project structure
# 4. Run this script
# 5. The tarballs should be moved to the deployment repo's builds/ directory. Push those changes to GitLab.

# Change these:
DEPT_NAME="hr"
CLIENT_DIR="client/client-app"
SERVER_DIR="pha-hr-server"
DEPLOYMENT_REPO_DIR="../pharma-deployment" # relative path to deployment repo

ROOT_DIR=$(pwd) # don't need to change this

# Build the client
cd "${ROOT_DIR}/${CLIENT_DIR}"
npm run build
cd dist
tar -czf "${ROOT_DIR}/${DEPT_NAME}_client.tar.gz" .

# Build the server
cd "${ROOT_DIR}/${SERVER_DIR}"
tar -czf "${ROOT_DIR}/${DEPT_NAME}_server.tar.gz" --exclude='.env*' --exclude='*/.env*' ./ # don't include .env files in server build

# Move to deployment repo
cd "${ROOT_DIR}"
rm "${DEPLOYMENT_REPO_DIR}/builds/${DEPT_NAME}_client.tar.gz" || echo "No existing client build to remove"
rm "${DEPLOYMENT_REPO_DIR}/builds/${DEPT_NAME}_server.tar.gz" || echo "No existing server build to remove"
mv "${DEPT_NAME}_client.tar.gz" "${DEPLOYMENT_REPO_DIR}/builds"
mv "${DEPT_NAME}_server.tar.gz" "${DEPLOYMENT_REPO_DIR}/builds"