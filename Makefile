# Builds the images required for the application
build:
	docker compose build --no-cache

# rebuild images
rebuild:
	docker compose up -d --build

# Creates containers, networks, volumes, etc. and start the containers
run:
	docker compose up -d

# Start the stopped containers
start:
	docker compose start

# Restart all containers
restart:
	docker compose restart

# Stop the running containers
stop:
	docker compose stop

# Stop and remove containers, networks, and non-persistent volumes
down:
	docker compose down
