DOCKER_IMAGE:=server
## Container
build:
	docker build --tag ${DOCKER_IMAGE} .
run:
	docker run --rm -it --publish 8000:8000 ${DOCKER_IMAGE}

## Local
local_install:
	npm install express
	npm install cors

local_run:
	node server.js
