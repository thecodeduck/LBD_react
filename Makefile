
NPM = pnpm

default: help

##	make help - display the help
##	@ - supresses command output
help:
	@grep "^##.*" ./Makefile

##	setup - install packages
##
setup:
	$(NPM) install

## run - attempt run webpack-dev-server
##
run:
	$(NPM) run dev


build-js:
	$(NPM) run build

build-favicon:
	cp ./src/favicon.ico ./dist

build-index:
	cp ./src/index.html ./dist

build: build-js build-favicon build-index


##	tests - run all tests
##	test NAME=name - run single test, searches thru 'describe' suite
##	To run just one test: mocha ./src/**/*.tests.js --grep FileName
##
tests:
	(export NODE_PATH=./; find ./src -name '*.tests.js' | xargs mocha --timeout 10000 $(ARGS))

test:
		(export NODE_PATH=./; find ./src -name '*.tests.js' | xargs mocha --timeout 10000 --grep=$(NAME))
