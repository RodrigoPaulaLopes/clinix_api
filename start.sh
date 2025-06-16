#/bin/bash

docker compose up -d --build --remove-orphans
if [ $? -ne 0 ]; then
    echo "Failed to start the Docker containers."
    exit 1
fi

docker exec clinix_api typeorm migration:run