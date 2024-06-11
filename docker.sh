#!/bin/bash

DOCKER_IMAGE_NAME=myapp

echo "Building the Docker image..."
docker build -t $DOCKER_IMAGE_NAME .

if [ $? -ne 0 ]; then
    echo "Docker image build failed. Exiting..."
    exit 1
fi

echo "Docker image built successfully."

echo "Running the Docker container..."
docker run -d -p 3000:3000 -p 1234:1234 --name buzzblog_container $DOCKER_IMAGE_NAME

if [ $? -ne 0 ]; then
    echo "Failed to run the Docker container. Exiting..."
    exit 1
fi

echo "Docker container is running successfully."

echo "Displaying logs for the running container..."
docker logs -f myapp_container
