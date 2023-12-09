DOCKER_IMAGE:=client

build:
	docker build --tag ${DOCKER_IMAGE} .

local_install:
	npm install bulma


run:
	docker run --rm -it --publish 8001:8001 ${DOCKER_IMAGE}
