TAG := ascrazy/homepage

.PHONY: all deps lint clean dist package release

all:
	docker-compose up

deps:
	docker-compose run --rm webpack npm install

lint:
	docker-compose run --rm webpack node_modules/.bin/eslint ./src/

clean:
	rm -rf dist/*

dist: clean
	docker-compose run --rm webpack node_modules/.bin/webpack --config webpack.config.prod.js

package: dist
	docker build -t $(TAG) -f Dockerfile-prod .

release: package
	docker push $(TAG)
