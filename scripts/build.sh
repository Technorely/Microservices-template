#!/usr/bin/env bash

# Usage example: COMMIT_HASH=$(date +%s) GCP_PROJECT_ID=practical-gecko-218909 GCP_GCR_HOST=eu.gcr.io  ./build.sh

: "${COMMIT_HASH:?The var must be set}"
: "${GCP_PROJECT_ID:?The var must be set}"
: "${GCP_GCR_HOST:?The var must be set}"

commitHash=$COMMIT_HASH
gcpProjectId=$GCP_PROJECT_ID
gcpGcrHost=${GCP_GCR_HOST:-"gcr.io"}

echo 'Building microservices docker images. Tag (commitHash): '${commitHash}

cd $(dirname "$0";)
cd ..
ROOT_DIR=$(pwd)

docker build -t api-gateway-micro:${commitHash} ${ROOT_DIR}/microservices/api-gateway
docker tag api-gateway-micro:${commitHash} ${gcpGcrHost}/${gcpProjectId}/api-gateway-micro:${commitHash}

docker build -t auth-micro:${commitHash} ${ROOT_DIR}/microservices/auth
docker tag auth-micro:${commitHash} ${gcpGcrHost}/${gcpProjectId}/auth-micro:${commitHash}

docker build -t email-micro:${commitHash} ${ROOT_DIR}/microservices/email
docker tag email-micro:${commitHash} ${gcpGcrHost}/${gcpProjectId}/email-micro:${commitHash}

docker build -t storage-micro:${commitHash} ${ROOT_DIR}/microservices/storage
docker tag storage-micro:${commitHash} ${gcpGcrHost}/${gcpProjectId}/storage-micro:${commitHash}

echo 'Pushing microservices to "Google Container Registry". Tag (commitHash): '${commitHash}

docker push ${gcpGcrHost}/${gcpProjectId}/api-gateway-micro:${commitHash}
docker push ${gcpGcrHost}/${gcpProjectId}/auth-micro:${commitHash}
docker push ${gcpGcrHost}/${gcpProjectId}/email-micro:${commitHash}
docker push ${gcpGcrHost}/${gcpProjectId}/storage-micro:${commitHash}

echo 'Images are uploaded to "Google Container Registry". Tag (commitHash): '${commitHash}

