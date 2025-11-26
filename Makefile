.PHONY: install dev build test clean

install:
	npm install

dev:
	npm run dev

build:
	npm run build

test:
	npm test

clean:
	rm -rf node_modules dist build