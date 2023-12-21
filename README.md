# Leaflet Realtime Demo

Put Weather realtime data on a Leaflet map

## Installation

1. Clone the repository:

```bash
https://github.com/quinnnova-dtgo/leaflet-realtime-demo.git
```

2. Change into the project directory:

```bash
cd leaflet-realtime-demo
```

## Docker Compose

This project can be easily run using Docker Compose. Follow the steps below:

1. Make sure Docker and Docker Compose are installed on your machine.

2. Create a copy of the example environment file:

```bash
cp .env.example .env
```

3. Run the following command to start the project using Docker Compose:

```bash
docker compose -f ./docker/docker-compose.yml -f ./docker/docker-compose.prod.yml up -d
```

4. Access the application at [http://localhost:your-port](http://localhost:your-port) in your web browser.
